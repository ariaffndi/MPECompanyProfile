<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\Team;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Format;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Team::query();

        if ($request->has('search')) {
            $query->where(
                'name',
                'like',
                '%' . $request->search . '%'
            );
        }

        $query->orderBy('name');

        $teams = $query
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('admin/team/index', [
            'team' => $teams,
            'filter' => [
                'search' => $request->search,
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/team/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:225',
            'position' => 'required',

            'image' => [
                'required',
                'image',
                'mimes:jpeg,png,jpg,gif,webp',
                'max:10240',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Upload Team Image
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('image')) {

            $validated['image'] = $this->processImage(
                $request->file('image'),
                'team',
                1200
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Create Team
        |--------------------------------------------------------------------------
        */

        Team::create($validated);

        return redirect()
            ->route('team.index')
            ->with(
                'success',
                'Team berhasil ditambahkan'
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
    public function edit(Team $team)
    {
        $page = request('page');

        return Inertia::render('admin/team/edit', [
            'team' => $team,
            'page' => $page,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Team $team)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:225',
            'position' => 'required|max:225',

            'image' => [
                'nullable',
                'image',
                'mimes:jpeg,png,jpg,gif,webp',
                'max:10240',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Update Team Image
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($team->image);

            $validated['image'] = $this->processImage(
                $request->file('image'),
                'team',
                1200
            );
        } else {
            unset($validated['image']);
        }

        /*
        |--------------------------------------------------------------------------
        | Update Database
        |--------------------------------------------------------------------------
        */

        $team->update($validated);

        $currentPage = $request->get('page', 1);

        return redirect()
            ->route('team.index', [
                'page' => $currentPage
            ])
            ->with(
                'success',
                'Team berhasil diupdate'
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $team = Team::findOrFail($id);

        /*
        |--------------------------------------------------------------------------
        | Delete Team Image
        |--------------------------------------------------------------------------
        */

        if ($team->image) {
            Storage::disk('public')->delete(
                $team->image
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Soft Delete
        |--------------------------------------------------------------------------
        */

        $team->delete();

        $currentPage = request()->get('page', 1);

        return redirect()
            ->route('team.index', [
                'page' => $currentPage
            ])
            ->with(
                'success',
                'Team berhasil dihapus'
            );
    }

    /**
     * Process uploaded image.
     */
    private function processImage(
        $file,
        string $prefix,
        int $maxWidth = 1200
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

        $filename = 'team/'
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