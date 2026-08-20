<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Format;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('search')) {
            $query->where(
                'product_name',
                'like',
                '%' . $request->search . '%'
            );
        }

        $query->orderBy('product_name');

        $products = $query
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('admin/product/index', [
            'product' => $products,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/product/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_name' => 'required|string|max:255',
            'product_description' => 'required',
            'product_specification' => 'required',

            'product_image' => [
                'required',
                'image',
                'mimes:jpeg,png,jpg,gif,webp',
                'max:10240',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Upload Product Image
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('product_image')) {

            $validated['product_image'] = $this->processImage(
                $request->file('product_image'),
                'product',
                1600
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Create Product
        |--------------------------------------------------------------------------
        */

        Product::create($validated);

        return redirect()
            ->route('product.index')
            ->with(
                'success',
                'Produk berhasil ditambahkan'
            );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $page = request('page');

        return Inertia::render('admin/product/edit', [
            'product' => $product,
            'page' => $page,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'product_name' => 'required|string|max:225',
            'product_description' => 'required|max:1000',
            'product_specification' => 'required',

            'product_image' => [
                'nullable',
                'image',
                'mimes:jpeg,png,jpg,gif,webp',
                'max:10240',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Product Image
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('product_image')) {
            Storage::disk('public')->delete($product->product_image);

            $validated['product_image'] = $this->processImage(
                $request->file('product_image'),
                'product',
                1600
            );
        } else {
            unset($validated['product_image']);
        }

        /*
        |--------------------------------------------------------------------------
        | Update Database
        |--------------------------------------------------------------------------
        */

        $product->update($validated);

        $currentPage = $request->get('page', 1);

        return redirect()
            ->route('product.index', [
                'page' => $currentPage
            ])
            ->with(
                'success',
                'Product berhasil diupdate.'
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);

        /*
        |--------------------------------------------------------------------------
        | Delete Product Image
        |--------------------------------------------------------------------------
        */

        if ($product->product_image) {
            Storage::disk('public')->delete(
                $product->product_image
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Soft Delete Product
        |--------------------------------------------------------------------------
        */

        $product->delete();

        $currentPage = request()->get('page', 1);

        return redirect()
            ->route('product.index', [
                'page' => $currentPage
            ])
            ->with(
                'success',
                'Product berhasil dihapus.'
            );
    }

    /**
     * Process uploaded image.
     */
    private function processImage(
        $file,
        string $prefix,
        int $maxWidth = 1600
    ): string {

        $manager = new ImageManager(
            new Driver()
        );

        /*
        |--------------------------------------------------------------------------
        | Decode Image
        |--------------------------------------------------------------------------
        */

        $image = $manager->decode($file);

        /*
        |--------------------------------------------------------------------------
        | Resize
        |--------------------------------------------------------------------------
        */

        if ($image->width() > $maxWidth) {
            $image = $image->scale(
                width: $maxWidth
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Convert to WebP
        |--------------------------------------------------------------------------
        */

        $encoded = $image->encodeUsingFormat(
            Format::WEBP,
            quality: 30
        );

        /*
        |--------------------------------------------------------------------------
        | Generate Filename
        |--------------------------------------------------------------------------
        */

        $filename = 'product/'
            . $prefix
            . '_'
            . uniqid()
            . '.webp';

        /*
        |--------------------------------------------------------------------------
        | Save Image
        |--------------------------------------------------------------------------
        */

        Storage::disk('public')->put(
            $filename,
            (string) $encoded
        );

        return $filename;
    }
}