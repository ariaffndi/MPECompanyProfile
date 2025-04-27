<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            ClientSeeder::class,
            InquirySeeder::class,
            PartnerSeeder::class,
            PerusahaanSeeder::class,
            ProductSeeder::class,
            ProjectSeeder::class,
            ServiceSeeder::class,
            TeamSeeder::class,
            UserSeeder::class,
        ]);
    }
}