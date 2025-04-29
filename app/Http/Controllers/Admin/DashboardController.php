<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Partner;
use App\Models\Product;
use App\Models\Project;
use App\Models\Service;
use App\Models\Team;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(){
        $currentYear = Carbon::now();
        $startYear = $currentYear->copy()->subYear(5)->year;
        
        
        $chartData = Project::select([
            DB::raw('YEAR(year) as year'),
            DB::raw("SUM(CASE WHEN clients.client_type = 'pemerintah' THEN 1 ELSE 0 END) as pemerintah"),
            DB::raw("SUM(CASE WHEN clients.client_type = 'swasta' THEN 1 ELSE 0 END) as swasta"),
        ])
        ->join('clients', 'projects.client_id', '=', 'clients.id')
        ->whereBetween('year', [$startYear,$currentYear])
        ->groupBy(DB::raw('YEAR(year)'))
        ->orderBy('year')
        ->get();
        
        return Inertia::render('admin/dashboard',[
            'productsCount' => Product::count(),
            'servicesCount' => Service::count(),
            'teamsCount' => Team::count(),
            'partnersCount' => Partner::count(),
            'chartData' => $chartData,
        ]);
    }
}