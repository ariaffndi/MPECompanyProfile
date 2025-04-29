<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;


use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Perusahaan;

class PerusahaanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perusahaan = Perusahaan::firstOrFail();
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
        $perusahaan = Perusahaan::findOrFail($id);

        return Inertia::render('admin/perusahaan/edit', [
            'perusahaan' => $perusahaan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Perusahaan $perusahaan)
    {

        $perusahaan = Perusahaan::firstOrFail();

        $validated = $request->validate([
            'nama_perusahaan' => 'string|max:255',
            'alamat_perusahaan' => 'string',
            'email_perusahaan' => 'email|max:255',
            'no_telp_perusahaan' => 'string|max:255',
            'whatsapp_perusahaan' => 'string|max:255',
            'deskripsi_perusahaan' => 'string|',
            'instagram_perusahaan' => 'string|max:255',
            'facebook_perusahaan' => 'string|max:255',
        ]);
    
        $validated = array_merge($validated, [
                'foto_kantor_perusahaan' => $request->file('foto_kantor_perusahaan')?->store('perusahaan', 'public') ?? $perusahaan->foto_kantor_perusahaan,
                'logo_perusahaan' => $request->file('logo_perusahaan')?->store('perusahaan', 'public') ?? $perusahaan->logo_perusahaan,
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