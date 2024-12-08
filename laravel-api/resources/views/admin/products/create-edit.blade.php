@extends('adminlte::page')

@section('title', $product ? 'Edit Product' : 'Create Product')

@section('content_header')
    <h1>{{ $product ? 'Edit Product' : 'Create Product' }}</h1>
@endsection

@section('content')
    <div class="container">
        {{-- Display Validation Errors --}}
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ $product ? route('products.update', $product->id) : route('products.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            @if ($product)
                @method('PUT')
            @endif

            <!-- Product Name -->
            <div class="mb-3">
                <label for="name" class="form-label">Product Name</label>
                <input type="text" class="form-control" id="name" name="name"
                       value="{{ old('name', $product->name ?? '') }}"
                       placeholder="Enter product name" required>
            </div>

            <!-- Product Image -->
            <div class="mb-3">
                <label for="image" class="form-label">Product Image</label>
                <input type="file" class="form-control" id="image" name="image" accept="image/*">
                @if ($product && $product->image)
                    <small class="form-text text-muted">
                        Current Image:
                        <img src="{{ asset('storage/' . $product->image) }}" alt="Current Image" width="100">
                    </small>
                @endif
            </div>

            <!-- Product Description -->
            <div class="mb-3">
                <label for="description" class="form-label">Product Description</label>
                <textarea class="form-control" id="description" name="description" rows="4"
                          placeholder="Enter product description"
                          required>{{ old('description', $product->description ?? '') }}</textarea>
            </div>

            <!-- Product Features -->
            <div class="mb-3">
                <label for="features" class="form-label">Product Features</label>
                <div id="features-wrapper">
                    @if (isset($product->features) && is_array($product->features))
                        @foreach ($product->features as $feature)
                            <div class="input-group mb-2">
                                <input type="text" class="form-control" name="features[]" value="{{ $feature }}" required>
                                <button type="button" class="btn btn-danger remove-feature-btn">Remove</button>
                            </div>
                        @endforeach
                    @endif
                </div>
                <button type="button" class="btn btn-success add-feature-btn">Add Feature</button>
            </div>

            <!-- Target Audience and Discount -->
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="target_audience" class="form-label">Target Audience</label>
                    <input type="text" class="form-control" id="target_audience" name="target_audience"
                           value="{{ old('target_audience', $product->target_audience ?? '') }}"
                           placeholder="Enter target audience">
                </div>
                <div class="col-md-6">
                    <label for="discount" class="form-label">Discount (%)</label>
                    <input type="number" class="form-control" id="discount" name="discount"
                           value="{{ old('discount', $product->discount ?? '') }}" min="0" max="100" step="0.1"
                           placeholder="Enter discount (optional)">
                </div>
            </div>

            <!-- Category -->
            <div class="mb-3">
                <label for="category_id" class="form-label">Category</label>
                <select class="form-control" id="category_id" name="category_id" required>
                    <option value="">Select a category</option>
                    @foreach ($categories as $category)
                        <option value="{{ $category->id }}"
                            {{ old('category_id', $product->category_id ?? '') == $category->id ? 'selected' : '' }}>
                            {{ $category->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <!-- Prices -->
            <!-- Prices -->
            <div class="mb-3">
                <label for="prices" class="form-label">Prices</label>
                <div id="prices-wrapper">
                    @if (isset($product) && $product->prices->count() > 0)
                        @foreach ($product->prices as $index => $price)
                            <div class="row mb-2">
                                <div class="col-md-4">
                                    <input type="text" class="form-control" name="prices[{{ $index }}][region]"
                                           value="{{ old('prices.' . $index . '.region', $price->region) }}" placeholder="Region" required>
                                </div>
                                <div class="col-md-4">
                                    <input type="number" class="form-control" name="prices[{{ $index }}][amount]"
                                           value="{{ old('prices.' . $index . '.amount', $price->amount) }}" placeholder="Amount" required>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" class="form-control" name="prices[{{ $index }}][currency]"
                                           value="{{ old('prices.' . $index . '.currency', $price->currency) }}" placeholder="Currency" required>
                                </div>
                            </div>
                        @endforeach
                    @endif
                </div>
                <button type="button" class="btn btn-success add-price-btn">Add Price</button>
            </div>

            <button type="submit" class="btn btn-primary">{{ $product ? 'Update Product' : 'Create Product' }}</button>
        </form>
    </div>
    <script >
        document.addEventListener('DOMContentLoaded', function () {
            // Add Feature Field
            document.querySelector('.add-feature-btn').addEventListener('click', function () {
                let featureField = `
            <div class="input-group mb-2">
                <input type="text" class="form-control" name="features[]" placeholder="Enter a feature" required>
                <button type="button" class="btn btn-danger remove-feature-btn">Remove</button>
            </div>`;
                document.getElementById('features-wrapper').insertAdjacentHTML('beforeend', featureField);
            });

            // Add Price Field
            document.querySelector('.add-price-btn').addEventListener('click', function () {
                let priceIndex = document.querySelectorAll('#prices-wrapper .row').length;
                let priceField = `
            <div class="row mb-2">
                <div class="col-md-4">
                    <input type="text" class="form-control" name="prices[${priceIndex}][region]" placeholder="Enter region" required>
                </div>
                <div class="col-md-4">
                    <input type="number" class="form-control" name="prices[${priceIndex}][amount]" placeholder="Enter amount" step="0.01" required>
                </div>
                <div class="col-md-3">
                    <select class="form-control" name="prices[${priceIndex}][currency]" required>
                        <option value="USD">USD</option>
                        <option value="SAR">SAR</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>
                <div class="col-md-1">
                    <button type="button" class="btn btn-danger remove-price-btn">Remove</button>
                </div>
            </div>`;
                document.getElementById('prices-wrapper').insertAdjacentHTML('beforeend', priceField);
            });

            // Remove Dynamic Fields (Features or Prices)
            document.addEventListener('click', function (e) {
                if (e.target.classList.contains('remove-feature-btn')) {
                    e.target.closest('.input-group').remove();
                }
                if (e.target.classList.contains('remove-price-btn')) {
                    e.target.closest('.row').remove();
                }
            });
        });

    </script>
@endsection
