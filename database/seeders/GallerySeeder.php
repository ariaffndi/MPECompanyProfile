<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Gallery::insert([
            'activity_name' => 'Activity 1',
            'activity_image' => 'image1.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}