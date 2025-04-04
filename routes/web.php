<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use Inertia\Inertia;
use App\Http\Controllers\PerusahaanController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('admin/dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');

    //user routes
    Route::resource('admin/users', UserController::class);
    
    //product routes
    Route::resource('admin/product', ProductController::class);
    Route::put('/admin/product/{product}', [ProductController::class, 'update'])->name('product.update');
    Route::post('/admin/product/{product}', [ProductController::class, 'update']);
    Route::delete('/admin/product/{product}', [ProductController::class, 'destroy'])->name('product.destroy');
});


Route::resource('admin/perusahaan', PerusahaanController::class)->middleware('auth');
Route::put('/admin/perusahaan/{perusahaan}', [PerusahaanController::class, 'update'])->name('perusahaan.update');
Route::post('/admin/perusahaan/{perusahaan}', [PerusahaanController::class, 'update']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';