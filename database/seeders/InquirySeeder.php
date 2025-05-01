<?php

namespace Database\Seeders;

use App\Models\Inquiry;
use App\Models\Product;
use App\Models\Service;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class InquirySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        $services = Service::pluck('id')->toArray();
        $products = Product::pluck('id')->toArray();

        foreach (range(1, 10) as $index) {
            Inquiry::create([
                'name' => $faker->name,
                'email' => $faker->email,
                'phone' => $faker->phoneNumber,
                'service_id' => $faker->randomElement($services),
                'product_id' => $faker->randomElement($products),
                'detail' => $faker->paragraph,
                'status' => $faker->randomElement(['pending', 'progress', 'finished', 'cancelled']),
            ]);
        }
    }
}
