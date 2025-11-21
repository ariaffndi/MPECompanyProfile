<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_service_can_be_created()
    {
        Storage::fake('public');

        $user = User::factory()->create();
        $this->actingAs($user);

        $file = UploadedFile::fake()->image('image.jpg');

        $response = $this->post(route('admin.service.store'), [
            'service_name' => 'Layanan 1',
            'service_description' => 'Deskripsi layanan 1',
            'service_image' => $file,
        ]);

        $this->assertDatabaseHas('services', [
            'service_name' => 'Layanan 1',
            'service_description' => 'Deskripsi layanan 1',
        ]);

        $service = Service::where('service_name', 'Layanan 1')->first();
        Storage::disk('public')->assertExists($service->service_image);

        $response->assertRedirect(route('admin.service.index'));
    }

    public function test_a_service_can_be_updated()
    {
        Storage::fake('public');

        $user = User::factory()->create();
        $this->actingAs($user);

        $service = Service::factory()->create();

        $file = UploadedFile::fake()->image('update.jpg');

        $response = $this->put(route('admin.service.update', $service->id), [
            'service_name' => 'Update Layanan',
            'service_description' => 'Update Deskripsi',
            'service_image' => $file,
        ]);

        $this->assertDatabaseHas('services', [
            'id' => $service->id,
            'service_name' => 'Update Layanan',
            'service_description' => 'Update Deskripsi',
        ]);

        $updatedService = Service::find($service->id);
        Storage::disk('public')->assertExists($updatedService->service_image);

        $response->assertRedirect(route('admin.service.index', ['page' => 1]));
    }

    public function test_a_service_can_be_deleted()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $service = Service::factory()->create();

        $response = $this->delete(route('admin.service.destroy', $service->id));

        $this->assertSoftDeleted('services', [
            'id' => $service->id,
        ]);

        $response->assertRedirect(route('admin.service.index', ['page' => 1]));
    }
}
