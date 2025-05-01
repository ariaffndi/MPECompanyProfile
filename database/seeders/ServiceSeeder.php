<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            Service::create([
                'service_name' => $faker->bs,
                'service_description' => $faker->sentence,
                'service_image' => 'service'.$index.'.jpg',
            ]);
        }
    }
}