<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        // Retrieve all categories from the database
        $categories = Category::all();

        // Return the view with the list of categories
        return view('admin.categories.index', compact('categories'));
    }

    public function create()
    {
        // Return the view to create a new category
        return view('admin.categories.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string',
            'link' => 'nullable|url',
        ]);

        Category::create($request->only(['name', 'icon', 'link']));

        return redirect()->route('categories.index')->with('success', 'Category created successfully.');
    }

    public function edit($id)
    {
        // Retrieve the category to edit
        $category = Category::findOrFail($id);

        // Return the view to edit the category
        return view('admin.categories.edit', compact('category'));
    }

    public function update(Request $request, $id)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'link' => 'nullable|string|max:255',
        ]);

        $category = Category::findOrFail($id);

        // Debug: Log the request data to see if it is being received correctly
        \Log::info('Request data:', $request->all());

        $category->update($request->only(['name', 'icon', 'link']));


        // Debug: Log the updated category to see if the changes are saved
        \Log::info('Updated category:', $category->toArray());

        return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
    }


    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }

    public function GetForApi(){
        $categories = Category::all();
        return response()->json($categories);
    }
}
