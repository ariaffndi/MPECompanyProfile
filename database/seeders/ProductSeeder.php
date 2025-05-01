<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            Product::create([
                'product_name' => $faker->word,
                'product_description' => $faker->paragraph,
                'product_image' => 'product'.$index.'.jpg',
            ]);
        }
    }
}