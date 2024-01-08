<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->word(),
            'slug' => fake()->unique()->slug(2),
            'excerpt' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'quantity' => fake()->numberBetween(10, 50),
            'price' => fake()->numberBetween(2000, 10000)
        ];
    }
}
