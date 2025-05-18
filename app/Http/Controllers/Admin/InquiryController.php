<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;

use App\Models\Inquiry;
use App\Models\Product;
use App\Models\Service;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InquiryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {     
            $query = Inquiry::query()->with(['service', 'product']);

            if ($request->has('search')) {
                $query->where('name', 'like', '%' . $request->search . '%');
            }
    
            if ($request->has('status') && $request->status !== null) {
                $query->where('status', $request->status);
            }

            $query->orderBy('created_at', 'desc');
    
            $inquiries = $query->paginate(5)->withQueryString();

            return Inertia::render('admin/inquiry/index', [
                'inquiry' => $inquiries,
                'filters' => [
                    'search' => $request->search,
                    'status' => $request->status,
                ],
            ]);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $services = Service::all();
        $products = Product::all();
        
        return Inertia::render('website/inquiry', [
            'services' => $services,
            'products' => $products,
        ]);
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
    public function show(string $id)
    {
        //
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

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,progress,finished,cancelled',
        ]);

        $inquiry = Inquiry::findOrFail($id);
        $inquiry->status = $request->status;
        $inquiry->save();

        return back()->with('success', 'Status berhasil diperbarui.');
    }
}