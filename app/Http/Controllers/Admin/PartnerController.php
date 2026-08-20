<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Partner;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Format;

class PartnerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Partner::query();

        if ($request->has('search')) {
            $query->where(
                'company_name',
                'like',
                '%' . $request->search . '%'
            );
        }

        $query->orderBy('company_name');

        $partners = $query
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('admin/partner/index', [
            'partner' => $partners,
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
        return Inertia::render('admin/partner/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Upload Logo
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('logo')) {

            $validated['logo'] = $this->processImage(
                $request->file('logo'),
                'partner',
                1000
            );
        }

        Partner::create($validated);

        return redirect()
            ->route('partner.index')
            ->with(
                'success',
                'Partner berhasil ditambahkan'
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
    public function edit(Partner $partner)
    {
        $page = request('page');

        return Inertia::render('admin/partner/edit', [
            'partner' => $partner,
            'page' => $page,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Partner $partner)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',

            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Update Logo
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('logo')) {
            Storage::disk('public')->delete($partner->logo);

            $validated['logo'] = $this->processImage(
                $request->file('logo'),
                'partner',
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

        $partner->update($validated);

        $currentPage = $request->get('page', 1);

        return redirect()
            ->route('partner.index', [
                'page' => $currentPage
            ])
            ->with(
                'success',
                'Partner berhasil diupdate.'
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $partner = Partner::findOrFail($id);

        /*
        |--------------------------------------------------------------------------
        | Delete Logo
        |--------------------------------------------------------------------------
        */

        if ($partner->logo) {
            Storage::disk('public')->delete(
                $partner->logo
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Soft Delete
        |--------------------------------------------------------------------------
        */

        $partner->delete();

        $currentPage = request()->get('page', 1);

        return redirect()
            ->route('partner.index', [
                'page' => $currentPage
            ])
            ->with(
                'success',
                'Partner berhasil dihapus.'
            );
    }

    /**
     * Process uploaded image.
     */
    private function processImage(
        $file,
        string $prefix,
        int $maxWidth = 1000
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

        $filename = 'partner/'
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