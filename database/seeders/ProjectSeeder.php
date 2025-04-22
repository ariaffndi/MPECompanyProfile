<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Project::insert([
            [
                'project_name' => 'Project 1',
                'client_id' => 1,
                'category_id' => 1,
                'location' => 'Jakarta',
                'year' => 2022,
                'value' => 10000000,
                'description' => 'Project 1 description',
                'project_image' => 'project1.jpg',
            ], [
                'project_name' => 'Project 2',
                'client_id' => 2,
                'category_id' => 2,
                'location' => 'Bandung',
                'year' => 2023,
                'value' => 20000000,
                'description' => 'Project 2 description',
                'project_image' => 'project2.jpg',
            ], [
                'project_name' => 'Project 3',
                'client_id' => 1,
                'category_id' => 3,
                'location' => 'Surabaya',
                'year' => 2024,
                'value' => 30000000,
                'description' => 'Project 3 description',
                'project_image' => 'project3.jpg',
            ]
        ]);
    }
}
