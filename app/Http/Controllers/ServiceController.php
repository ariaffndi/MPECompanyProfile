<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Service;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/service/index', [
            'service' => Service::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/service/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_name' => 'required|string|max:255',
            'service_description' => 'required',
            'service_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $path = null;
        if ($request->hasFile('service_image')) {
            $path = $request->file('service_image')->store('service_image', 'public');
            $validated['service_image'] = $path;
        }

        Service::create($validated);

        return redirect()->route('service.index')->with('success', 'Layanan berhasil ditambahkan');
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
    public function edit(string $id)
    {
        $service = Service::findOrFail($id);
        return inertia('admin/service/edit', [
            'service' => $service
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'service_name' => 'string|max:225',
            'service_description' => 'max:1000',
        ]);

        if ($request->hasFile('service_image')) {
            $foto = $request->file('service_image')->store('service', 'public');
            $validated['service_image'] = $foto;
        }

        $service->update($validated);

        return redirect()->route('service.index',['page' => request()->get('page',1)])->with('success', 'Layanan berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //soft delete
        $data = Service::findOrFail($id);
        $data->delete();

        return redirect()->route('service.index',['page' => request()->get('page',1)])->with('success', 'Layanan berhasil dihapus.');
    }
}
