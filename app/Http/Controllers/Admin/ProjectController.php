<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Project;
use App\Models\Client;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Support\Facades\Response;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Format;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {

            $query = Project::with(['client', 'category']);

            if ($request->has('search')) {
                $query->where(
                    'project_name',
                    'like',
                    '%' . $request->search . '%'
                );
            }

            $query
                ->orderByDesc('year')
                ->orderByDesc('created_at');

            $projects = $query
                ->paginate(5)
                ->withQueryString();

            return Inertia::render('admin/project/index', [
                'project' => $projects,
                'filters' => [
                    'search' => $request->search,
                ],
            ]);

        } catch (\Exception $e) {

            return back()->withErrors([
                'error' => 'Terjadi kesalahan: ' . $e->getMessage()
            ]);
        }
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/project/create', [
            'clients' => Client::all([
                'id',
                'client_type'
            ]),

            'categories' => Category::all([
                'id',
                'category_name'
            ]),
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            $validated = $request->validate([
                'project_name' => 'required|string|max:255',
                'location' => 'required|string|max:255',
                'year' => 'required|integer|min:1900|max:2100',
                'value' => 'required|numeric|min:0',
                'description' => 'required',

                'project_image' => [
                    'required',
                    'image',
                    'mimes:jpeg,png,jpg,gif,webp',
                    'max:10240',
                ],

                'client_id' => 'nullable|exists:clients,id',
                'category_id' => 'nullable|exists:categories,id',
            ]);

            /*
            |--------------------------------------------------------------------------
            | Upload Project Image
            |--------------------------------------------------------------------------
            */

            if ($request->hasFile('project_image')) {

                $validated['project_image'] = $this->processImage(
                    $request->file('project_image'),
                    'project',
                    1600
                );
            }

            /*
            |--------------------------------------------------------------------------
            | Create Project
            |--------------------------------------------------------------------------
            */

            Project::create($validated);

            return redirect()
                ->route('project.index')
                ->with(
                    'success',
                    'Project berhasil ditambahkan'
                );

        } catch (\Exception $e) {

            return back()->withErrors([
                'error' => 'Terjadi kesalahan: ' . $e->getMessage()
            ]);
        }
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
    public function edit(Project $project)
    {
        $page = request('page');

        return Inertia::render('admin/project/edit', [
            'project' => $project,
            'page' => $page,

            'clients' => Client::all([
                'id',
                'client_type'
            ]),

            'categories' => Category::all([
                'id',
                'category_name'
            ]),
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'project_name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:2100',
            'value' => 'required|numeric|min:0',
            'description' => 'required|max:1000',

            'project_image' => [
                'nullable',
                'image',
                'mimes:jpeg,png,jpg,gif,webp',
                'max:10240',
            ],

            'client_id' => 'nullable|exists:clients,id',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Update Project Image
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('project_image')) {
            Storage::disk('public')->delete($project->project_image);

            $validated['project_image'] = $this->processImage(
                $request->file('project_image'),
                'project',
                1600
            );
        } else {
            unset($validated['project_image']);
        }

        /*
        |--------------------------------------------------------------------------
        | Update Database
        |--------------------------------------------------------------------------
        */

        $project->update($validated);

        $currentPage = $request->get('page', 1);

        return redirect()
            ->route('project.index', [
                'page' => $currentPage
            ])
            ->with(
                'success',
                'Project berhasil diupdate.'
            );
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $project = Project::findOrFail($id);

        /*
        |--------------------------------------------------------------------------
        | Delete Project Image
        |--------------------------------------------------------------------------
        */

        if ($project->project_image) {
            Storage::disk('public')->delete(
                $project->project_image
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Soft Delete
        |--------------------------------------------------------------------------
        */

        $project->delete();

        $currentPage = request()->get('page', 1);

        return redirect()
            ->route('project.index', [
                'page' => $currentPage
            ])
            ->with(
                'success',
                'Project berhasil dihapus.'
            );
    }


    /**
     * Export projects to CSV.
     */
    public function export()
    {
        $projects = Project::with([
            'client',
            'category'
        ])
            ->orderBy('year', 'asc')
            ->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="projects.csv"',
        ];

        $callback = function () use ($projects) {

            $file = fopen(
                'php://output',
                'w'
            );

            fputcsv($file, [
                'No',
                'Nama Project',
                'Klien',
                'Kategori',
                'Lokasi',
                'Tahun',
                'Harga',
                'Deskripsi'
            ]);

            foreach ($projects as $index => $project) {

                fputcsv($file, [
                    $index + 1,
                    $project->project_name,
                    $project->client->client_type ?? '',
                    $project->category->category_name ?? '',
                    $project->location,
                    $project->year,
                    $project->value,
                    str_replace(
                        ["\r\n", "\r", "\n"],
                        ' ',
                        $project->description
                    ),
                ]);
            }

            fclose($file);
        };

        return Response::stream(
            $callback,
            200,
            $headers
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

        $filename = 'project/'
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