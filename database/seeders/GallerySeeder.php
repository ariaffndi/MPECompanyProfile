<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class GallerySeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            Gallery::create([
                'activity_name' => $faker->company,
                'activity_image' => 'activity'.$index.'.png',
            ]);
        }
    }
}