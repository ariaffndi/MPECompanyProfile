<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;


use App\Models\Service;
use Inertia\Inertia;
use Illuminate\Http\Request;

use function Termwind\render;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Service::query();

        if ($request->has('search')) {
            $query->where('service_name', 'like', '%' . $request->search . '%');
        }

        $query->orderBy('service_name');

        $services = $query->paginate(5)->withQueryString();

        return Inertia::render('admin/service/index', [
            'service' => $services,
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
    public function edit(Service $service)
    {
        $page = request('page');
        return Inertia::render('admin/service/edit', [
            'service' => $service,
            'page' => $page,
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

        $currentPage = $request->get('page', 1);

        return redirect()->route('service.index', ['page' => $currentPage])
            ->with('success', 'Layanan berhasil diupdate.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //soft delete
        $data = Service::findOrFail($id);
        $data->delete();
        $currentPage = request()->get('page', 1);

        return redirect()->route('service.index', ['page' => $currentPage])
            ->with('success', 'Layanan berhasil dihapus.');
    }
}