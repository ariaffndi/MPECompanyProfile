<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            Team::create([
                'name' => $faker->name,
                'position' => $faker->jobTitle,
                'image' => 'team'.$index.'.jpg', // atau sesuaikan nama file/folder-nya
            ]);
        }
    }
}
