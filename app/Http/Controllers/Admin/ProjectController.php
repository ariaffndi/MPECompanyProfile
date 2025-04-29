<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Client;
use App\Models\Category;
use Inertia\Inertia;

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
                $query->where('project_name', 'like', '%' . $request->search . '%');
            }

            $sort = $request->get('sort', 'desc');
            $query->orderBy('project_name', $sort);

            $projects = $query->paginate(5)->withQueryString();

            return Inertia::render('admin/project/index', [
                'project' => $projects,
                'filters' => [
                    'search' => $request->search,
                    'sort' => $sort,
                ],
            ]);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/project/create', [
            'clients' => Client::all(['id', 'client_type']),
            'categories' => Category::all(['id', 'category_name']),
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
                'project_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
            $validated['client_id'] = $request->input('client_id');
            $validated['category_id'] = $request->input('category_id');

            $path = null;
            if ($request->hasFile('project_image')) {
                $path = $request->file('project_image')->store('project_image', 'public');
                $validated['project_image'] = $path;
            }

            Project::create($validated);

            return redirect()->route('project.index')->with('success', 'Project berhasil ditambahkan');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
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
            'clients' => Client::all(['id', 'client_type']),
            'categories' => Category::all(['id', 'category_name']),
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
            'description' => 'required',
        ]);
        $validated['client_id'] = $request->input('client_id');
        $validated['category_id'] = $request->input('category_id');

        if ($request->hasFile('project_image')) {
            $foto = $request->file('project_image')->store('project', 'public');
            $validated['project_image'] = $foto;
        }

        $project->update($validated);

        $currentPage = $request->get('page', 1);

        return redirect()->route('project.index', ['page' => $currentPage])
            ->with('success', 'Project berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //soft delete
        $data = Project::findOrFail($id);
        $data->delete();
        $currentPage = request()->get('page', 1);

        return redirect()->route('project.index', ['page' => $currentPage])
            ->with('success', 'Project berhasil dihapus.');
    }
}