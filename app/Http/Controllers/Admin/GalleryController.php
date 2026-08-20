<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Format;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Gallery::query();

        if ($request->has('search')) {
            $query->where(
                'activity_name',
                'like',
                '%' . $request->search . '%'
            );
        }

        $query->orderBy('created_at', 'desc');

        $galleries = $query
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('admin/gallery/index', [
            'gallery' => $galleries,
            'filter' => [
                'search' => $request->search,
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('admin/gallery/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'activity_name' => 'required|string|max:225',
            'activity_image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
        ]);

        if ($request->hasFile('activity_image')) {

            $validated['activity_image'] = $this->processImage(
                $request->file('activity_image'),
                'gallery',
                1600
            );
        }

        Gallery::create($validated);

        return redirect()
            ->route('gallery.index')
            ->with('success', 'Foto berhasil ditambahkan');
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
    public function edit(Gallery $gallery)
    {
        $page = request('page');

        return Inertia::render('admin/gallery/edit', [
            'gallery' => $gallery,
            'page' => $page,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gallery $gallery)
    {
        $validated = $request->validate([
            'activity_name' => 'required|string|max:225',

            'activity_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Update Image
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('activity_image')) {
            Storage::disk('public')->delete($gallery->activity_image);

            $validated['activity_image'] = $this->processImage(
                $request->file('activity_image'),
                'gallery',
                1600
            );
        } else {
            unset($validated['activity_image']);
        }

        /*
        |--------------------------------------------------------------------------
        | Update Database
        |--------------------------------------------------------------------------
        */

        $gallery->update($validated);

        $currentPage = $request->get('page', 1);

        return redirect()
            ->route('gallery.index', [
                'page' => $currentPage
            ])
            ->with(
                'success',
                'Foto berhasil diupdate'
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $gallery = Gallery::findOrFail($id);

        /*
        |--------------------------------------------------------------------------
        | Delete Image
        |--------------------------------------------------------------------------
        */

        if ($gallery->activity_image) {
            Storage::disk('public')->delete(
                $gallery->activity_image
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Delete Database
        |--------------------------------------------------------------------------
        */

        $gallery->delete();

        $currentPage = request()->get('page', 1);

        return redirect()
            ->route('gallery.index', [
                'page' => $currentPage
            ])
            ->with(
                'success',
                'Foto berhasil dihapus'
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
        | Convert WebP
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

        $filename = 'gallery/'
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