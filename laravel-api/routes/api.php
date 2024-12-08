<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/hello', function () {
    return response()->json(['message' => 'Hello, World!']);
});

Route::post('/products', [ProductController::class, 'store']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/product/search', [ProductController::class, 'searchProducts']);
Route::get('/products/GetProductByCategory/{id}', [ProductController::class, 'getProductsByCatgoreyId'])->name('products.getProductsByCatgoreyId');
Route::get('/products/{uuid}', [ProductController::class, 'show'])->name('products.show');


Route::get('/categories', [CategoryController::class, 'GetForApi']);
