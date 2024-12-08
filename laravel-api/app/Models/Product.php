<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    protected $fillable = [
        'uuid', 'name', 'image', 'description', 'features',
        'target_audience', 'discount',
        'additional_prices', 'regions', 'category_id'
    ];

    protected $hidden = ['id'];

    protected $casts = [
        'features' => 'array',
        'additional_prices' => 'array',
        'regions' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            if (empty($product->uuid)) {
                $product->uuid = (string) Str::uuid();
            }
        });
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function prices()
    {
        return $this->hasMany(Price::class);
    }
}
