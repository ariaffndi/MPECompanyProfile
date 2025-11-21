<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ServiceFactory extends Factory
{
    public function definition()
    {
        return [
            'service_name' => $this->faker->words(2, true),
            'service_description' => $this->faker->sentence(),
            'service_image' => 'default.jpg',
        ];
    }
}
