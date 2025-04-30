<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;


use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

use function Termwind\render;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('search')) {
            $query->where('product_name', 'like', '%' . $request->search . '%');
        }

        $query->orderBy('product_name');

        $products = $query->paginate(4)->withQueryString();

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
            'product_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $path = null;
        if ($request->hasFile('product_image')) {
            $path = $request->file('product_image')->store('product_images', 'public');
            $validated['product_image'] = $path;
        }

        Product::create($validated);

        return redirect()->route('product.index')->with('success', 'Produk berhasil ditambahkan');
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
            'product_name' => 'string|max:225',
            'product_description' => 'max:1000',
        ]);

        if ($request->hasFile('product_image')) {
            $foto = $request->file('product_image')->store('product', 'public');
            $validated['product_image'] = $foto;
        }

        $product->update($validated);

        $currentPage = $request->get('page', 1);

        return redirect()->route('product.index', ['page' => $currentPage])
            ->with('success', 'Product berhasil diupdate.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //soft delete
        $data = Product::findOrFail($id);
        $data->delete();
        $currentPage = request()->get('page', 1);

        return redirect()->route('product.index', ['page' => $currentPage])
            ->with('success', 'Product berhasil dihapus.');
    }
}