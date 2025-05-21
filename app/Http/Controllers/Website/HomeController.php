<?php

namespace App\Http\Controllers\Website;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Partner;
use App\Models\Product;
use App\Models\Project;
use App\Models\Service;
use App\Models\Team;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $partners = Partner::all();
        $services = Service::all();
        $products = Product::orderBy('created_at', 'desc')->take(4)->get();
        $recentProjects = Project::orderBy('created_at', 'desc')->take(4)->get();
        $currentYear = Carbon::now()->year;
        $yearsExperience = $currentYear - 2009;
        $totalPartner = Partner::count();
        $totalProject = Project::count();
        $totalTeam = Team::count();


        return Inertia::render('website/home', [
            'partners' => $partners,
            'services' => $services,
            'products' => $products,
            'projects' => $recentProjects,
            'yearsExperience' => $yearsExperience,
            'totalProject' => $totalProject,
            'totalPartner' => $totalPartner,
            'totalTeam' => $totalTeam,
        ]);
    }
}