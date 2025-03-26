<?php

namespace App\Http\Controllers;

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
        return Inertia::render('admin/perusahaan/index', [
            "perusahaan" => Perusahaan::firstorfail()
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        $perusahaan = Perusahaan::firstorfail();

        return Inertia::render('admin/perusahaan/edit', [
            'perusahaan' => $perusahaan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $perusahaan = Perusahaan::findOrFail($id);
    
    $validated = $request->validate([
        'nama_perusahaan' => 'required|string|max:255',
        'alamat_perusahaan' => 'required|string',
        'email_perusahaan' => 'required|email|max:255',
        'no_telp_perusahaan' => 'required|string',
        'whatsapp_perusahaan' => 'required|string',
        'deskripsi_perusahaan' => 'required|string',
        'instagram_perusahaan' => 'required|string',
        'facebook_perusahaan' => 'required|string',
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
