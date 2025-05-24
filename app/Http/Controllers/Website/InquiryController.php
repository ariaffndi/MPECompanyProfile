<?php

namespace App\Http\Controllers\Website;

use Illuminate\Http\Request;
use App\Models\Inquiry;
use App\Models\Product;
use App\Models\Service;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class InquiryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function create()
    {
        $services = Service::all()->map(function ($item) {
            $item->type = 'service';
            return $item;
        });

        $products = Product::all()->map(function ($item) {
            $item->type = 'product';
            return $item;
        });

        $mergedData = $services->concat($products);

        // dd($services, $products, $mergedData);

        return Inertia::render('website/inquiry', [
            'services' => $services,
            'products' => $products,
            'mergedData' => $mergedData,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'service_id' => 'nullable|integer|exists:services,id',
            'product_id' => 'nullable|integer|exists:products,id',
            'detail' => 'required|string',
        ]);


        $inquiry = Inquiry::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'service_id' => $validated['service_id'] ?? null,
            'product_id' => $validated['product_id'] ?? null,
            'detail' => $validated['detail'],
            'status' => 'pending',
        ]);

        return redirect()->back()->with('success', 'Permintaan penawaran berhasil dikirim.');
    }
}