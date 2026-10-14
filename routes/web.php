<?php

use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing/page', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/page', ['tab' => 'overview']);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/products', fn () => Inertia::render('Dashboard/page', ['tab' => 'products']))->name('products');
    // JSON product API: session auth + CSRF (axios sends the XSRF-TOKEN cookie automatically).
    Route::apiResource('api/products', ProductsController::class)->only(['index', 'store', 'update', 'destroy'])
        ->parameters(['products' => 'product']);
    Route::get('/students', fn () => Inertia::render('Student/page'))->name('students');
});

require __DIR__.'/auth.php';
