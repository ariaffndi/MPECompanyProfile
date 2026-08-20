<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Company;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Format;

class CompanyController extends Controller
{
    public function index()
    {
        $company = Company::firstOrFail();

        return Inertia::render('admin/company/index', [
            'company' => $company
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        $company = Company::findOrFail($id);

        return Inertia::render('admin/company/edit', [
            'company' => $company
        ]);
    }

    public function update(Request $request, Company $company)
    {
        $company = Company::firstOrFail();

        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'whatsapp' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'instagram' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',

            'office_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Office Image
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('office_image')) {
            Storage::disk('public')->delete($company->office_image);

            $validated['office_image'] = $this->processImage(
                $request->file('office_image'),
                'office',
                1600
            );
        } else {
            unset($validated['office_image']);
        }

        /*
        |--------------------------------------------------------------------------
        | Logo
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('logo')) {
            Storage::disk('public')->delete($company->logo);

            $validated['logo'] = $this->processImage(
                $request->file('logo'),
                'logo',
                1000
            );
        } else {
            unset($validated['logo']);
        }

        /*
        |--------------------------------------------------------------------------
        | Update Database
        |--------------------------------------------------------------------------
        */

        $company->update($validated);

        return redirect()
            ->route('company.index')
            ->with(
                'success',
                'Data perusahaan berhasil diperbarui.'
            );
    }

    public function destroy(string $id)
    {
        //
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

        // Decode uploaded image
        $image = $manager->decode($file);

        // Resize jika lebih besar dari batas
        if ($image->width() > $maxWidth) {
            $image = $image->scale(
                width: $maxWidth
            );
        }

        // Convert ke WebP dengan quality 30
        $encoded = $image->encodeUsingFormat(
            Format::WEBP,
            quality: 30
        );

        // Nama file
        $filename = 'company/'
            . $prefix
            . '_'
            . uniqid()
            . '.webp';

        // Simpan hasil encoded image
        Storage::disk('public')->put(
            $filename,
            (string) $encoded
        );

        return $filename;
    }
}