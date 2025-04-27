<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Partner;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Partner::insert([
            [
            'company_name' => 'Partner 1',
            'logo' => 'partner.jpg',
            'created_at' => now(),
            'updated_at' => now(),
            ],[
            'company_name' => 'Partner 2',
            'logo' => 'partner.jpg',
            'created_at' => now(),
            'updated_at' => now(),
            ],[
            'company_name' => 'Partner 3',
            'logo' => 'partner.jpg',
            'created_at' => now(),
            'updated_at' => now(),
            ],
        ]);
    }
}
