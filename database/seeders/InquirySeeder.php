<?php

namespace Database\Seeders;

use App\Models\Inquiry;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InquirySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Inquiry::insert([
            [
                'name' => 'John Doe',
                'email' => 'XKg9E@example.com',
                'phone' => '1234567890',
                'service_id' => 1,
                'product_id' => 1,
                'detail' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'status' => 'pending',
            ], [
                'name' => 'Jane Doe',
                'email' => 'YtHdD@example.com',
                'phone' => '9876543210',
                'service_id' => 2,
                'product_id' => 2,
                'detail' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'status' => 'progress',
            ], [
                'name' => 'Bob Smith',
                'email' => '2a9K8@example.com',
                'phone' => '5555555555',
                'service_id' => 3,
                'product_id' => 3,
                'detail' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'status' => 'finished',
            ], [
                'name' => 'Alice Johnson',
                'email' => '7tP0W@example.com',
                'phone' => '9999999999',
                'service_id' => 4,
                'product_id' => 4,
                'detail' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'status' => 'cancelled',
            ]

        ]);
    }
}
