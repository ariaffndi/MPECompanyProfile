<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = Product::all();
        return Inertia::render('admin/product/index', [
            "product" => Product::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/product/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_product' => 'required|string|max:255',
            'deskripsi_product' => 'required|string|max:225',
            'foto_product' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $path = null;
        if ($request->hasFile('foto_product')) {
            $path = $request->file('foto_product')->store('product_images', 'public');
            $validated['foto_product'] = $path;
        }

        Product::create($validated);

        return redirect()->route('product.index')->with('success', 'Produk berhasil ditambahkan');
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
        $product = Product::findOrFail($id);
        return inertia('admin/product/edit', [
            'product' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'nama_product' => 'string|max:225',
            'deskripsi_product' => 'string|max:225',
        ]);
    
        if ($request->hasFile('foto_product')) {
            $foto = $request->file('foto_product')->store('product', 'public');
            $validated['foto_product'] = $foto;
        }
    
        $product->update($validated);
    
        return redirect()->route('product.index')->with('success', 'Produk berhasil diperbarui!');
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //soft delete
        $data = Product::findOrFail($id);
        $data->delete();
        
        return redirect()->route('product.index')->with('success', 'Product berhasil dihapus.');
    }
}