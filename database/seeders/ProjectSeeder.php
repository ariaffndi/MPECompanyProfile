<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $years = range(2020, 2025);

        $locations = [
            'Jakarta',
            'Surabaya',
            'Bandung',
            'Medan',
            'Makassar',
            'Yogyakarta'
        ];

        for ($i = 1; $i <= 10; $i++) {

            $projectName = 'Project ' . $i;

            Project::create([
                'project_name' => $projectName,
                'slug' => Str::slug($projectName),
                'client_id' => rand(1, 2),
                'category_id' => rand(1, 3),
                'location' => $locations[array_rand($locations)],
                'year' => $years[array_rand($years)],
                'value' => rand(10, 100) * 1000000,
                'description' => 'Deskripsi project ' . $i,
                'project_image' => 'project' . $i . '.jpg',
            ]);
        }
    }
}