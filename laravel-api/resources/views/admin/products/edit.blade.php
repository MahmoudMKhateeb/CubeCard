@extends('adminlte::page')

@section('title', 'Edit Product')

@section('content_header')
    <h1>Edit Product</h1>
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

        <form action="{{ route('products.update', $product->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <!-- Pre-fill fields similarly to the create file -->
            @include('admin.products.create-fields', ['product' => $product])

            <button type="submit" class="btn btn-primary">Update Product</button>
        </form>
    </div>
@endsection
