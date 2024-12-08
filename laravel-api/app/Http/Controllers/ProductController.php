<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'target_audience' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'prices' => 'required|array',
            'prices.*.region' => 'required|string',
            'prices.*.amount' => 'required|numeric',
            'prices.*.currency' => 'required|string',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $validatedData['image'] = $request->file('image')->store('product_images', 'public');
        }

        // Extract prices from validated data
        $pricesData = $validatedData['prices'];
        unset($validatedData['prices']); // Remove prices before creating the product

        // Create the product
        $product = Product::create($validatedData);

        // Attach prices to the product
        foreach ($pricesData as $price) {
            $product->prices()->create($price);
        }

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    public function update(Request $request, Product $product)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'target_audience' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'prices' => 'required|array',
            'prices.*.region' => 'required|string',
            'prices.*.amount' => 'required|numeric',
            'prices.*.currency' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            $validatedData['image'] = $request->file('image')->store('product_images', 'public');
        } else {
            $validatedData['image'] = $product->image;
        }

        $pricesData = $validatedData['prices'];
        unset($validatedData['prices']);

        // Update the product
        $product->update($validatedData);

        // Sync prices
        $product->prices()->delete();
        foreach ($pricesData as $price) {
            $product->prices()->create($price);
        }

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    // Get all products
    public function index()
    {
        $products = Product::with('prices')->get();
        return response()->json($products);
    }

    public function getProductsByCatgoreyId($id){
        $products = Product::with('prices')->where('category_id', $id)->get();
        return response()->json($products);
    }
    // Get a product by its ID
    public function show($uuid)
    {
        $product = Product::with('prices')->where('uuid', $uuid)->firstOrFail();

        // Add the full URL for the image
        if ($product->image) {
            $product->image = $this->getFullImageUrl($product->image);
        }

        $groupedPrices = $product->prices->groupBy('region')->map(function ($prices, $region) {
            return [
                'region' => $region,
                'prices' => $prices->map(function ($price) {
                    return [
                        'amount' => $price->amount,
                        'currency' => $price->currency,
                    ];
                }),
            ];
        })->values();

        return response()->json([
            'product' => $product->only(['uuid', 'name', 'image', 'description', 'features', 'target_audience']),
            'regions' => $groupedPrices,
        ]);
    }

    public function searchProducts(Request $request)
    {
        $query = $request->input('query');

        if (empty(trim($query))) {
            return response()->json(['products' => []]);
        }

        $products = Product::with('prices')->where('name', 'LIKE', "%{$query}%")
            ->orWhere('description', 'LIKE', "%{$query}%")
            ->get()
            ->map(function ($product) {
                $product->image = $this->getFullImageUrl($product->image);
                return $product;
            });

        return response()->json($products);
    }

    private function getFullImageUrl($imagePath)
    {
        return url('storage/' . $imagePath);
    }

}
