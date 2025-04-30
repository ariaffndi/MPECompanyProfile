<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;


use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Company;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perusahaan = Company::firstOrFail();
        return Inertia::render('admin/perusahaan/index', [
            "perusahaan" => $perusahaan
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $perusahaan = Company::findOrFail($id);

        return Inertia::render('admin/perusahaan/edit', [
            'perusahaan' => $perusahaan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $perusahaan)
    {

        $perusahaan = Company::firstOrFail();

        $validated = $request->validate([
            'name' => 'string|max:255',
            'address' => 'string',
            'email' => 'email|max:255',
            'phone' => 'string|max:255',
            'whatsapp' => 'string|max:255',
            'description' => 'string|',
            'instagram' => 'string|max:255',
            'facebook' => 'string|max:255',
        ]);
    
        $validated = array_merge($validated, [
                'office_image' => $request->file('office_image')?->store('perusahaan', 'public') ?? $perusahaan->office_image,
                'logo' => $request->file('logo')?->store('perusahaan', 'public') ?? $perusahaan->logo,
            ]);

        $perusahaan->update($validated);

        return redirect()->route('perusahaan.index')->with('success', 'Data perusahaan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}