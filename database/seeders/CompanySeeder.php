<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;

class CompanySeeder extends Seeder
{
    public function run()
    {
        Company::create([
            'name' => 'PT. Mitra Prima Enviro',
            'address' => 'Jl. Kertomenanggal III No.1, Dukuh Menanggal, Kec. Gayungan, Surabaya, Jawa Timur 60234',
            'email' => 'admin@mitraprimaenviro.com',
            'phone' => '031-35959115',
            'whatsapp' => '+62 851-5758-0033',
            'description' => 'PT Mitra Prima Enviro merupakan salah satu layanan Achmad & Assosiates Group yang bergerak dibidang Enviromental Service meliputi Layanan WWTP Design and Build, WWTP Equipment Supply, dan WWTP Operational - Maintenance Service.
                Sejak berdiri pada 19 Maret 2009, PT Mitra Prima Enviro telah berpengalaman mengerjakan berbagai jenis Instalasi Pengolahan Air Limbah (IPAL) baik Domestik maupun Non-Domestik seperti Industri, Medis dan Laboratorium dengan jangkauan pekerjaan seluruh Indonesia.
                Dengan beberapa pengalaman proyek baik dalam instansi pemerintah maupun swasta, PT Mitra Prima Enviro senantiasa berkomitmen untuk dapat berkonstribusi dalam permasalahan lingkungan dan selalu meningkatkan kinerja dan jasa layanan, baik melalui profesionalisme kerja maupun inovatif dalam setiap kemajuan teknologi di bidang Teknik Lingkungan',
            'instagram' => 'https://www.instagram.com/mitraprimaenviro',
            'facebook' => 'https://www.facebook.com/mitraenviro/',
            'youtube' => 'https://www.youtube.com/@MITRAPRIMAENVIRO',
            'office_image' => 'kantor.jpg',
            'logo' => 'logo.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}