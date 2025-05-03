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
        $company = Company::firstOrFail();
        return Inertia::render('admin/company/index', [
            "company" => $company
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
        $company = Company::findOrFail($id);

        return Inertia::render('admin/company/edit', [
            'company' => $company
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {

        $company = Company::firstOrFail();

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
                'office_image' => $request->file('office_image')?->store('company', 'public') ?? $company->office_image,
                'logo' => $request->file('logo')?->store('company', 'public') ?? $company->logo,
            ]);

        $company->update($validated);

        return redirect()->route('company.index')->with('success', 'Data perusahaan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}