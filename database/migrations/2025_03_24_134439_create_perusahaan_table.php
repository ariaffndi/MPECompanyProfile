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
        Schema::create('perusahaans', function (Blueprint $table) {
            $table->id();
            $table->string('nama_perusahaan');
            $table->string('alamat_perusahaan');
            $table->string('email_perusahaan');
            $table->string('no_telp_perusahaan');
            $table->string('whatsapp_perusahaan');
            $table->text('deskripsi_perusahaan');
            $table->string('instagram_perusahaan');
            $table->string('facebook_perusahaan');
            $table->string('youtube_perusahaan');
            $table->string('foto_kantor_perusahaan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perusahaan');
    }
};