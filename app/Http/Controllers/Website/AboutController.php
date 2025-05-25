<?php

namespace App\Http\Controllers\Website;

use Carbon\Carbon;
use App\Models\Team;
use Inertia\Inertia;
use App\Models\Partner;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Gallery;

class AboutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teams = Team::all();
        $gallery = Gallery::latest()->get();
        $partners = Partner::all();
        $currentYear = Carbon::now()->year;
        $yearsExperience = $currentYear - 2009;
        $totalPartner = Partner::count();
        $totalProject = Project::count();
        $totalTeam = Team::count();


        return Inertia::render('website/about', [
            'yearsExperience' => $yearsExperience,
            'totalProject' => $totalProject,
            'totalPartner' => $totalPartner,
            'totalTeam' => $totalTeam,
            'team' => $teams,
            'gallery' => $gallery,
            'partners' => $partners,
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}