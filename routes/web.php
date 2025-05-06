<?php

use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\TeamController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\InquiryController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Website\ContactController;
use App\Http\Controllers\Website\PortofolioController;
use App\Http\Controllers\Website\ServicesController;
use App\Http\Controllers\Website\HomeController;
use App\Http\Controllers\Website\AboutController;

//website route
Route::get('/', [HomeController::class,'index']);
Route::get('/about', [AboutController::class,'index']);
Route::get('/services', [ServicesController::class,'index']);
Route::get('/portofolio', [PortofolioController::class,'index']);
Route::get('/contact', [ContactController::class,'index']);


//admin route
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('admin/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    //user routes
    Route::resource('admin/users', UserController::class);

    //product routes
    Route::resource('admin/product', ProductController::class);
    Route::post('/admin/product/{product}', [ProductController::class, 'update']);

    //Company routes
    Route::resource('admin/company', CompanyController::class);
    Route::post('/admin/company/{company}', [CompanyController::class, 'update']);

    //Service routes
    Route::resource('admin/service', ServiceController::class);
    Route::post('/admin/service/{service}', [ServiceController::class, 'update']);

    //Team routes
    Route::resource('admin/team', TeamController::class);
    Route::post('/admin/team/{team}', [TeamController::class, 'update']);

    //Gallery routes
    Route::resource('admin/gallery', GalleryController::class);
    Route::post('/admin/gallery/{gallery}', [GalleryController::class, 'update']);

    //Partner routes
    Route::resource('admin/partner', PartnerController::class);
    Route::post('/admin/partner/{partner}', [PartnerController::class, 'update']);

    //Project routes
    Route::resource('admin/project', ProjectController::class);
    Route::post('/admin/project/{project}', [ProjectController::class, 'update']);
    Route::get('/export-projects', [ProjectController::class, 'export']);


    //Inquiry routes
    Route::resource('admin/inquiry', InquiryController::class);
    Route::put('/admin/inquiry/{inquiry}/update-status', [InquiryController::class, 'updateStatus'])->name('inquiry.update-status');
});







require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';