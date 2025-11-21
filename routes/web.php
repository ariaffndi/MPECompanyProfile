<?php

use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\TeamController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\InquiryController as AdminInquiryController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Website\ContactController;
use App\Http\Controllers\Website\PortofolioController;
use App\Http\Controllers\Website\ServicesController;
use App\Http\Controllers\Website\HomeController;
use App\Http\Controllers\Website\AboutController;
use App\Http\Controllers\Website\InquiryController as WebsiteInquiryController;

//website route
Route::get('/', [HomeController::class,'index'])->name('home');
Route::get('/about', [AboutController::class,'index']);
Route::get('/services', [ServicesController::class,'index']);
Route::get('/services/{id}', [ServicesController::class, 'show'])->name('services.show');
Route::get('/portofolio', [PortofolioController::class,'index']);
Route::get('/portofolio/{id}', [PortofolioController::class, 'show'])->name('portofolio.show');
Route::get('/contact', [ContactController::class,'index']);
Route::post('/contact', [ContactController::class,'store'])->name('contact.store');
Route::get('/inquiry', [WebsiteInquiryController::class,'create'])->name('inquiry.create');
Route::post('/inquiry', [WebsiteInquiryController::class,'store'])->name('inquiry.store');


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

    Route::prefix('admin')->name('admin.')->group(function () {

    Route::resource('service', ServiceController::class)->names([
        'index' => 'service.index',
        'create' => 'service.create',
        'store' => 'service.store',
        'show' => 'service.show',
        'edit' => 'service.edit',
        'update' => 'service.update',
        'destroy' => 'service.destroy',
    ]);

});

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
    Route::get('admin/inquiry',[AdminInquiryController::class,'index'])->name('inquiry.index');
    Route::put('/admin/inquiry/{inquiry}/update-status', [AdminInquiryController::class, 'updateStatus'])->name('inquiry.update-status');
});







require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';