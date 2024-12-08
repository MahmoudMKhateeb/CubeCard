<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    protected $fillable = ['product_id', 'region', 'amount', 'currency'];
    protected $hidden = ['created_at', 'updated_at' , 'product_id' ,'id'];
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
