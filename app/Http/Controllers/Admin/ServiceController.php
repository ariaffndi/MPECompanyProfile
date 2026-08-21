<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\Service;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Format;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Service::query();

        if ($request->has('search')) {
            $query->where(
                'service_name',
                'like',
                '%' . $request->search . '%'
            );
        }

        $query->orderBy('service_name');

        $services = $query
            ->paginate(5)
            ->withQueryString();

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

            'service_image' => [
                'required',
                'image',
                'mimes:jpeg,png,jpg,gif,webp',
                'max:10240',
            ],
        ]);

        // Generate slug dari nama service
        $validated['slug'] = Str::slug($validated['service_name']);

        /*
        |--------------------------------------------------------------------------
        | Upload Service Image
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('service_image')) {
            $validated['service_image'] = $this->processImage(
                $request->file('service_image'),
                'service',
                1600
            );
        }

        Service::create($validated);

        return redirect()
            ->route('service.index')
            ->with(
                'success',
                'Layanan berhasil ditambahkan'
            );
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
            'service_name' => 'required|string|max:225',
            'service_description' => 'required|max:1000',

            'service_image' => [
                'nullable',
                'image',
                'mimes:jpeg,png,jpg,gif,webp',
                'max:10240',
            ],
        ]);

        // Update slug berdasarkan nama service
        $validated['slug'] = Str::slug($validated['service_name']);

        /*
        |--------------------------------------------------------------------------
        | Update Service Image
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('service_image')) {

            if ($service->service_image) {
                Storage::disk('public')->delete(
                    $service->service_image
                );
            }

            $validated['service_image'] = $this->processImage(
                $request->file('service_image'),
                'service',
                1600
            );

        } else {

            // Jangan update kolom image jika tidak ada upload baru
            unset($validated['service_image']);
        }

        /*
        |--------------------------------------------------------------------------
        | Update Database
        |--------------------------------------------------------------------------
        */

        $service->update($validated);

        $currentPage = $request->get('page', 1);

        return redirect()
            ->route('service.index', [
                'page' => $currentPage
            ])
            ->with(
                'success',
                'Layanan berhasil diupdate.'
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $service = Service::findOrFail($id);

        /*
        |--------------------------------------------------------------------------
        | Delete Service Image
        |--------------------------------------------------------------------------
        */

        if ($service->service_image) {
            Storage::disk('public')->delete(
                $service->service_image
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Soft Delete
        |--------------------------------------------------------------------------
        */

        $service->delete();

        $currentPage = request()->get('page', 1);

        return redirect()
            ->route('service.index', [
                'page' => $currentPage
            ])
            ->with(
                'success',
                'Layanan berhasil dihapus.'
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
        | Convert to WebP
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

        $filename = 'service/'
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