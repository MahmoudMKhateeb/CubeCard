<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            // Add a UUID field to the products table
            $table->uuid('uuid')->after('id')->unique();

            // If you want to make 'uuid' the primary key, you need to drop 'id' and then set 'uuid' as primary.
            // However, doing that can have other implications (like foreign key relationships).
        });

        // Generate and set UUIDs for existing products
        \App\Models\Product::all()->each(function ($product) {
            $product->uuid = (string) Str::uuid();
            $product->save();
        });
    }

    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            // Drop the uuid column if you roll back the migration
            $table->dropColumn('uuid');
        });
    }
};
