<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');

            $table->foreignId('service_id')
                ->nullable()
                ->constrained('services')
                ->onDelete('set null');

            $table->foreignId('product_id')
                ->nullable()
                ->constrained('products')
                ->onDelete('set null');

            $table->text('detail');

            $table->enum('status', ['pending', 'progress', 'finished', 'cancelled'])->default('pending');

            $table->timestamps();        
            $table->softDeletes();      
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};