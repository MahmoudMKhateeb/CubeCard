<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesTableSeeder extends Seeder
{
    public function run()
    {
        $categories = [
            [
                'name' => 'أفلام وموسيقى',
                'icon' => 'https://app.rasseed.com/files/Music_&_Films.svg',
                'link' => '/movies-music',
            ],
            [
                'name' => 'الخدمات',
                'icon' => 'https://app.rasseed.com/files/Services.svg',
                'link' => '/services',
            ],
            [
                'name' => 'المحافظ الرقمية',
                'icon' => 'https://app.rasseed.com/files/eWallet.svg',
                'link' => '/digital-wallets',
            ],
            [
                'name' => 'التسوق',
                'icon' => 'https://app.rasseed.com/files/Shopping00e504.svg',
                'link' => '/shopping',
            ],
            [
                'name' => 'الألعاب',
                'icon' => 'https://app.rasseed.com/files/Games99db4a.svg',
                'link' => '/games',
            ],
            [
                'name' => 'الإنترنت',
                'icon' => 'https://app.rasseed.com/files/Data--01.svg',
                'link' => '/internet',
            ],
            [
                'name' => 'المتاجر الرقمية',
                'icon' => 'https://app.rasseed.com/files/Stores.svg',
                'link' => '/digital-stores',
            ],
            [
                'name' => 'الإتصالات',
                'icon' => 'https://app.rasseed.com/files/Voice-01.svg',
                'link' => '/communications',
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
