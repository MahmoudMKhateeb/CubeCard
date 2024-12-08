<?php
namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        return [
            'uuid' => (string) Str::uuid(),
            'name' => $this->faker->word,
            'image' => $this->faker->imageUrl(640, 480, 'products', true, 'Faker'),
            'description' => $this->faker->sentence,
            'features' => $this->faker->words(5),
            'target_audience' => $this->faker->randomElement(['Adults', 'Teenagers', 'Kids']),
            'discount' => $this->faker->numberBetween(0, 30),
            'category_slug' => $this->faker->randomElement(['electronics', 'games', 'fashion']),
            'prices' => [
                [
                    'amount' => $this->faker->randomFloat(2, 10, 500),
                    'currency' => 'USD'
                ],
            ],
            'additional_prices' => [],
            'regions' => [
                [
                    'name' => 'USA',
                    'flag' => 'https://flagcdn.com/us.svg'
                ]
            ],
        ];
    }
}
