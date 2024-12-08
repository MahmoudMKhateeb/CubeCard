<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Display a listing of the products
    public function index()
    {
        $products = Product::all();
        return view('admin.products.index', compact('products'));
    }

    // Show the form for creating a new product
    public function create()
    {
        $categories = Category::all();
        return view('admin.products.create-edit', [
            'product' => null,
            'categories' => $categories,
        ]);
    }


    // Store a newly created product in storage
    public function store(Request $request)
    {
        // Validate the request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required|string',
            'features' => 'required|array',
            'target_audience' => 'required|string',
            'category_id' => 'required|exists:categories,id', // Validate category_id
            'prices' => 'required|array',
            'prices.*.region' => 'required|string',
            'prices.*.amount' => 'required|numeric',
            'prices.*.currency' => 'required|string',
            'regions' => 'nullable|array',
            'additional_prices' => 'nullable|array',
        ]);

        // Handle the image upload
        if ($request->hasFile('image')) {
            $validatedData['image'] = $request->file('image')->store('product_images', 'public');
        }

        // Create the product
        $product = Product::create($validatedData);

        // Attach prices to the product
        foreach ($validatedData['prices'] as $price) {
            $product->prices()->create($price);
        }

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }



    // Show the form for editing the specified product
    public function edit(Product $product)
    {
        $categories = Category::all();
        $product->load('prices');
        return view('admin.products.create-edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }


    // Update the specified product in storage
    public function update(Request $request, Product $product)
    {
        // Validate the request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required|string',
            'features' => 'required|array',
            'target_audience' => 'required|string',
            'category_id' => 'required|exists:categories,id', // Validate category_id
            'prices' => 'required|array',
            'prices.*.region' => 'required|string',
            'prices.*.amount' => 'required|numeric',
            'prices.*.currency' => 'required|string',
            'regions' => 'nullable|array',
            'additional_prices' => 'nullable|array',
        ]);

        // Handle the image upload if there's a new image
        if ($request->hasFile('image')) {
            $validatedData['image'] = $request->file('image')->store('product_images', 'public');
        } else {
            $validatedData['image'] = $product->image; // Keep the old image if no new one is uploaded
        }

        // Update the product
        $product->update($validatedData);

        // Sync prices
        $product->prices()->delete(); // Remove old prices
        foreach ($validatedData['prices'] as $price) {
            $product->prices()->create($price); // Insert updated prices
        }

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }



    // Remove the specified product from storage
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
