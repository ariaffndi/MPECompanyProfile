<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 5) as $index) {

            $serviceName = $faker->bs;

            Service::create([
                'service_name' => $serviceName,
                'slug' => Str::slug($serviceName),
                'service_description' => $faker->sentence,
                'service_image' => 'service' . $index . '.jpg',
            ]);
        }
    }
}