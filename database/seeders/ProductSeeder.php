<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Str;
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

            $productName = $faker->word;

            Product::create([
                'product_name' => $productName,
                'slug' => Str::slug($productName),
                'product_description' => $faker->paragraph,
                'product_specification' => $faker->paragraph,
                'product_image' => 'product' . $index . '.jpg',
            ]);
        }
    }
}