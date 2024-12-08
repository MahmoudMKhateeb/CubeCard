@extends('adminlte::page')

@section('title', 'Add Category')

@section('content_header')
    <h1>Add Category</h1>
@endsection

@section('content')
    <div class="container">
        <form action="{{ route('categories.store') }}" method="POST">
            @csrf

            <!-- Category Name -->
            <div class="mb-3">
                <label for="name" class="form-label">Category Name</label>
                <input type="text" class="form-control" id="name" name="name" placeholder="Enter category name" required>
            </div>

            <!-- Icon URL -->
            <div class="mb-3">
                <label for="icon" class="form-label">Icon URL</label>
                <input type="text" class="form-control" id="icon" name="icon" placeholder="Enter icon URL">
            </div>

            <!-- Link -->
            <div class="mb-3">
                <label for="link" class="form-label">Link</label>
                <input type="text" class="form-control" id="link" name="link" placeholder="Enter link">
            </div>

            <button type="submit" class="btn btn-primary">Create Category</button>
        </form>
    </div>
@endsection
