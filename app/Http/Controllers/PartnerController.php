<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Partner;

class PartnerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Partner::query();

        if ($request->has('search')) {
            $query->where('company_name', 'like', '%' . $request->search . '%');
        }

        $sort = $request->get('sort', 'asc');
        $query->orderBy('company_name', $sort);

        $partners = $query->paginate(5)->withQueryString();

        return Inertia::render('admin/partner/index', [
            'partner' => $partners,
            'filters' => [
                'search' => $request->search,
                'sort' => $sort,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/partner/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $path = null;
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('logo', 'public');
            $validated['logo'] = $path;
        }

        Partner::create($validated);

        return redirect()->route('partner.index')->with('success', 'Partner berhasil ditambahkan');
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
    public function edit(Partner $partner)
    {
        $page = request('page');
        return Inertia::render('admin/partner/edit', [
            'partner' => $partner,
            'page' => $page,
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Partner $partner)
    {
        $validated = $request->validate([
            'company_name' => 'string|max:225',
        ]);

        if ($request->hasFile('logo')) {
            $foto = $request->file('logo')->store('partner', 'public');
            $validated['logo'] = $foto;
        }

        $partner->update($validated);

        $currentPage = $request->get('page', 1);

        return redirect()->route('partner.index', ['page' => $currentPage])
            ->with('success', 'Partner berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //soft delete
        $data = Partner::findOrFail($id);
        $data->delete();
        $currentPage = request()->get('page', 1);

        return redirect()->route('partner.index', ['page' => $currentPage])
            ->with('success', 'Partner berhasil dihapus.');
    }
}
