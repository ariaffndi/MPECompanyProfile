<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Perusahaan;

class PerusahaanSeeder extends Seeder
{
    public function run()
    {
        Perusahaan::create([
            'nama_perusahaan' => 'PT. Mitra Prima Enviro',
            'alamat_perusahaan' => 'Jl. Kertajaya Indah Timur VI No.2, Manyar Sabrangan, Kota SBY, Jawa Timur 60116',
            'email_perusahaan' => 'admin@mitraprimaenviro.com',
            'no_telp_perusahaan' => '031-5924526',
            'whatsapp_perusahaan' => '+62 812-5942-9377',
            'deskripsi_perusahaan' => 'PT Mitra Prima Enviro merupakan salah satu layanan Achmad & Assosiates Group yang bergerak dibidang Enviromental Service meliputi Layanan WWTP Design and Build, WWTP Equipment Supply, dan WWTP Operational - Maintenance Service.
                Sejak berdiri pada 19 Maret 2009, PT Mitra Prima Enviro telah berpengalaman mengerjakan berbagai jenis Instalasi Pengolahan Air Limbah (IPAL) baik Domestik maupun Non-Domestik seperti Industri, Medis dan Laboratorium dengan jangkauan pekerjaan seluruh Indonesia.
                Dengan beberapa pengalaman proyek baik dalam instansi pemerintah maupun swasta, PT Mitra Prima Enviro senantiasa berkomitmen untuk dapat berkonstribusi dalam permasalahan lingkungan dan selalu meningkatkan kinerja dan jasa layanan, baik melalui profesionalisme kerja maupun inovatif dalam setiap kemajuan teknologi di bidang Teknik Lingkungan',
            'instagram_perusahaan' => '@mitraprimaenviro',
            'facebook_perusahaan' => 'facebook.com/mitraenviro',
            'foto_kantor_perusahaan' => 'kantor.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}