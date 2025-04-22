<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PerusahaanController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\ProjectController;


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

    //Company routes
    Route::resource('admin/perusahaan', PerusahaanController::class);
    Route::put('/admin/perusahaan/{perusahaan}', [PerusahaanController::class, 'update'])->name('perusahaan.update');
    Route::post('/admin/perusahaan/{perusahaan}', [PerusahaanController::class, 'update']);

    //Service routes
    Route::resource('admin/service', ServiceController::class);
    Route::put('/admin/service/{service}', [ServiceController::class, 'update'])->name('service.update');
    Route::post('/admin/service/{service}', [ServiceController::class, 'update']);
    Route::delete('/admin/service/{service}', [ServiceController::class, 'destroy'])->name('service.destroy');
    
    //Partner routes
    Route::resource('admin/partner', PartnerController::class);
    Route::put('/admin/partner/{partner}', [PartnerController::class, 'update'])->name('partner.update');
    Route::post('/admin/partner/{partner}', [PartnerController::class, 'update']);
    Route::delete('/admin/partner/{partner}', [PartnerController::class, 'destroy'])->name('partner.destroy');

    //Project routes
    Route::resource('admin/project', ProjectController::class);
});





require __DIR__.'/settings.php';
require __DIR__.'/auth.php';