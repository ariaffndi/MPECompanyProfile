<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Gallery::query();

        if ($request->has('search')) {
            $query->where('activity_name', 'like', '%' . $request->search . '%');
        }

        $sort = $request->get('sort', 'asc');
        $query->orderBy('activity_name', $sort);

        $galleries = $query->paginate(5)->withQueryString();

        return Inertia::render('admin/gallery/index',[
            'gallery' => $galleries,
            'filter' => [
                'search' => $request->search,
                'sort' => $sort
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        return Inertia::render('admin/gallery/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'activity_name' => 'required|string|max:225',
            'activity_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $path = null;
        if ($request->hasFile('activity_image')) {
            $path = $request->file('activity_image')->store('activity_image', 'public');
            $validated['activity_image'] = $path;
        }

        Gallery::create($validated);

        return redirect()->route('gallery.index')->with('success', 'Foto berhasil ditambahkan');
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
    public function update(Request $request,Gallery $gallery)
    {
        $validated = $request->validate([
            'activity_name' => 'string|max:225',
        ]);

        if ($request->hasFile('activity_image')) {
            $image = $request->file('activity_image')->store('gallery', 'public');
            $validated['activity_image'] = $image;
        }

        $gallery->update($validated);

        $currentPage = $request->get('page', 1);

        return redirect()->route('gallery.index', ['page' => $currentPage])->with('success', 'Foto berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Gallery::findOrFail($id);
        $data->delete();
        $currentPage = request()->get('page', 1);

        return redirect()->route('gallery.index', ['page' => $currentPage])->with('success', 'Foto berhasil dihapus');
    }
}