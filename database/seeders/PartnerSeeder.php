<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Partner;
use Faker\Factory as Faker;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            Partner::create([
                'company_name' => $faker->company,
                'logo' => 'logo'.$index.'.png', // contoh file logo
            ]);
        }
    }
}
