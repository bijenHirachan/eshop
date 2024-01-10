<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\UserController;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use GuzzleHttp\Handler\Proxy;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [ShopController::class, 'index']);
Route::get('/products', [ShopController::class, 'products'])->name('shop-products');
Route::get('/cart', [ShopController::class, 'cart'])->name('shop-cart');
Route::delete('/cart/items', [ShopController::class, 'removeAllItemsFromCart']);
Route::get('/products/{product}', [ShopController::class, 'show']);
Route::post('/cart/{product}', [ShopController::class, 'addToCart']);
Route::post('/cart/{id}/increase', [ShopController::class, 'increaseQuantity']);
Route::post('/cart/{id}/decrease', [ShopController::class, 'decreaseQuantity']);
Route::delete('/cart/{id}/remove', [ShopController::class, 'removeFromCart']);



Route::get('/dashboard', function () {
    if(!auth()->user()->is_admin) return redirect("/");
    return Inertia::render('Dashboard',[
        'products' => Product::count(),
        'categories' => Category::count(),
        'users' => User::count(),
        'orders' => Order::count(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {
    Route::resource('products', ProductController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('users', UserController::class);
    Route::resource('orders', OrderController::class);
    Route::post('categories/{product}/product', [CategoryController::class, 'addCategories']);
    Route::delete('categories/{product}/product/{category}', [CategoryController::class, 'removeCategory']);
    Route::post('/products/{product}/featured', [ProductController::class, 'updateFeaturedProduct']);
});

Route::middleware('auth')->group(function () {
    Route::post('/checkout', [ShopController::class, 'checkout']);
    Route::get('/success', [ShopController::class, 'success'])->name('payment.success');
    Route::get('/cancel', [ShopController::class, 'cancel'])->name('payment.cancel');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
