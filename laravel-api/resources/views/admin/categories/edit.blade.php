@extends('adminlte::page')

@section('title', 'Edit Category')

@section('content_header')
    <h1>Edit Category</h1>
@endsection

@section('content')
    <div class="container">
        <form action="{{ route('categories.update', $category->id) }}" method="POST">
            @csrf
            @method('PUT')

            <!-- Category Name -->
            <div class="mb-3">
                <label for="name" class="form-label">Category Name</label>
                <input type="text" class="form-control" id="name" name="name" value="{{ old('name', $category->name) }}" required>
            </div>

            <!-- Icon URL -->
            <div class="mb-3">
                <label for="icon" class="form-label">Icon URL</label>
                <input type="text" class="form-control" id="icon" name="icon" value="{{ old('icon', $category->icon) }}">
            </div>

            <!-- Link -->
            <div class="mb-3">
                <label for="link" class="form-label">Link</label>
                <input type="text" class="form-control" id="link" name="link" value="{{ old('link', $category->link) }}">
            </div>

            <button type="submit" class="btn btn-primary">Update Category</button>
        </form>
    </div>
@endsection
