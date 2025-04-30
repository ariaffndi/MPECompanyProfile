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
    public function index()
    {
        $currentYear = Carbon::now()->year;
        $startYear = $currentYear - 5;

    
        $projectCounts = DB::table('projects')
            ->join('clients', 'projects.client_id', '=', 'clients.id')
            ->select('projects.year', 'clients.client_type', DB::raw('count(projects.id) as total'))
            ->whereBetween('projects.year', [$startYear, $currentYear])
            ->groupBy('projects.year', 'clients.client_type')
            ->orderBy('projects.year')
            ->get();

        
        $chartData = [];
        for ($year = $startYear; $year <= $currentYear; $year++) {
            $chartData[$year] = [
                'year' => (string)$year,
                'pemerintah' => 0,
                'swasta' => 0,
            ];
        }

        
        foreach ($projectCounts as $row) {
            if (isset($chartData[$row->year])) {
                if ($row->client_type === 'Pemerintah') {
                    $chartData[$row->year]['pemerintah'] = $row->total;
                } elseif ($row->client_type === 'Swasta') {
                    $chartData[$row->year]['swasta'] = $row->total;
                }
            }
        }

        $chartData = array_values($chartData);

        $countofProjectLastYear = Project::whereBetween('year', [$currentYear-1, $currentYear-1])->count();
        $countofProjectLast2Year = Project::whereBetween('year', [$currentYear-2, $currentYear-2])->count();

        if ($countofProjectLastYear > $countofProjectLast2Year) {
            $performance = 'peningkatan';
        } else {
            $performance = 'penurunan';
        }


        return Inertia::render('admin/dashboard', [
            'productsCount' => Product::count(),
            'servicesCount' => Service::count(),
            'teamsCount' => Team::count(),
            'partnersCount' => Partner::count(),
            'projectChartData' => $chartData,
            'currentYear' => $currentYear,
            'startYear' => $startYear,
            'performance' => $performance
        ]);
    }
}