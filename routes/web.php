<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use Inertia\Inertia;
use App\Http\Controllers\PerusahaanController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('admin/dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');
});

Route::resource('admin/users', UserController::class)->middleware('auth');

Route::resource('admin/perusahaan', PerusahaanController::class)->middleware('auth');
Route::get('admin/editPerusahaan', [PerusahaanController::class, 'edit'])
    ->name('perusahaan.edit')
    ->middleware('auth');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
