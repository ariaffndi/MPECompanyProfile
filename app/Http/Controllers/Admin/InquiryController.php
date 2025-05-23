<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;

use App\Models\Inquiry;
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