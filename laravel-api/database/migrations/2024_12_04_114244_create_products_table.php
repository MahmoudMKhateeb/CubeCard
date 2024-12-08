<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('image');
            $table->text('description');
            $table->json('features'); // Stored as a JSON array
            $table->string('target_audience');
            $table->decimal('discount', 5, 2)->nullable(); // Optional discount
            $table->string('category_slug');
            $table->json('prices'); // Stored as JSON to hold multiple prices
            $table->json('additional_prices')->nullable(); // Optional additional prices
            $table->json('regions')->nullable(); // Optional regions
            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
