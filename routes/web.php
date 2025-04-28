<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PerusahaanController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\InquiryController;


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
    Route::post('/admin/product/{product}', [ProductController::class, 'update']);

    //Company routes
    Route::resource('admin/perusahaan', PerusahaanController::class);
    Route::post('/admin/perusahaan/{perusahaan}', [PerusahaanController::class, 'update']);

    //Service routes
    Route::resource('admin/service', ServiceController::class);
    Route::post('/admin/service/{service}', [ServiceController::class, 'update']);

    //Team routes
    Route::resource('admin/team', TeamController::class);
    Route::post('/admin/team/{team}', [TeamController::class, 'update']);

    //Partner routes
    Route::resource('admin/partner', PartnerController::class);
    Route::post('/admin/partner/{partner}', [PartnerController::class, 'update']);

    //Project routes
    Route::resource('admin/project', ProjectController::class);
    Route::post('/admin/project/{project}', [ProjectController::class, 'update']);

    //Inquiry routes
    Route::resource('admin/inquiry', InquiryController::class);
    Route::put('/admin/inquiry/{inquiry}/update-status', [InquiryController::class, 'updateStatus'])->name('inquiry.update-status');
});





require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';