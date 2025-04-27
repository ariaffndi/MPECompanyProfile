<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Team::insert([
            'name' => 'Team 1',
            'position' => 'Position 1',
            'image' => 'image1.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}