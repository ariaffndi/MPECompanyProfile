<?php

namespace App\Http\Controllers\Website;

use Inertia\Inertia;
use App\Models\Service;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;    

class ProductServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::all();
        $products = Product::all();


        return Inertia::render('website/services', [
            'services' => $services,
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function showService(string $id)
    {
        $service = Service::find($id);
        return Inertia::render('website/product-service/service-detail', [
            'service' => $service,
        ]);
    }

    public function showProduct(string $id)
    {
        $product = Product::find($id);
        return Inertia::render('website/product-service/product-detail', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}