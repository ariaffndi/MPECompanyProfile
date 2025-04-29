<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;


use App\Models\Team;
use Inertia\Inertia;
use Illuminate\Http\Request;


class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Team::query();

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $sort = $request->get('sort', 'asc');
        $query->orderBy('name', $sort);

        $teams = $query->paginate(5)->withQueryString();

        return Inertia::render('admin/team/index', [
            'team' => $teams,
            'filter' => [
                'search' => $request->search,
                'sort' => $sort
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
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('image', 'public');
            $validated['image'] = $path;
        }

        Team::create($validated);

        return redirect()->route('team.index')->with('success', 'Team berhasil ditambahkan');
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
            'name' => 'string|max:225',
            'position' => "max:225"
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('team', 'public');
            $validated['image'] = $image;
        }

        $team->update($validated);

        $currentPage = $request->get('page', 1);

        return redirect()->route('team.index', ['page' => $currentPage])->with('success', 'Team berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Team::findOrFail($id);
        $data->delete();
        $currentPage = request()->get('page', 1);

        return redirect()->route('team.index', ['page' => $currentPage])->with('success', 'Team berhasil dihapus');
    }
}