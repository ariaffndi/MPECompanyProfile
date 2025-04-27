<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Service::insert([
            [
                'service_name' => 'WWTP & WTP Design & Build',
                'service_description' => 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, ex. Nesciunt ullam aut laboriosam aliquid molestiae rerum! Quod, repudiandae explicabo.',
                'service_image' => 'service.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'service_name' => 'Equipment Supply',
                'service_description' => 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, ex. Nesciunt ullam aut laboriosam aliquid molestiae rerum! Quod, repudiandae explicabo.',
                'service_image' => 'service.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'service_name' => 'Operation & Maintenance',
                'service_description' => 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, ex. Nesciunt ullam aut laboriosam aliquid molestiae rerum! Quod, repudiandae explicabo.',
                'service_image' => 'service.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'service_name' => 'Engineering & Design',
                'service_description' => 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, ex. Nesciunt ullam aut laboriosam aliquid molestiae rerum! Quod, repudiandae explicabo.',
                'service_image' => 'service.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'service_name' => 'Project Management',
                'service_description' => 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, ex. Nesciunt ullam aut laboriosam aliquid molestiae rerum! Quod, repudiandae explicabo.',
                'service_image' => 'service.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}