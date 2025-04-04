<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Perusahaan;
use App\Models\Product;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('passadmin'),
        ]);

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
        ]);

        Product::insert([
            'nama_produk' => 'Grease Trap',
            'deskripsi_produk' => 'Grease Trap adalah alat perangkap grease (lemak) atau minyak dan oli. Alat ini membantu untuk memisahkan minyak dari air, sehingga minyak tidak menggumpal dan membeku di pipa pembuangan dan membuat pipa tersumbat',
            'foto_produk' => 'produk.jpg',
        ],[
            'nama_produk' => 'Biofilter Septic Tank',
            'deskripsi_produk' => 'Biofilter Septi Tank merupakan sistem pengolahan air limbah cair domestik yang dibuat dengan material berbahan Fiber Reinforced Plastic (FRP)',
            'foto_produk' => 'produk.jpg',
        ],[
            'nama_produk' => 'ECOKENN Kapasitas 1-4 m3/hari',
            'deskripsi_produk' => 'Instalasi Pengolahan Air Limbah (IPAL) “Ecokenn” Merupakan sistem pengolahan limbah cair yang di desain dan di produksi oleh PT Mitra Prima Enviro. Sistem pengolahan limbah cair “Ecokenn” merupakan solusi efektif untuk pengolahan limbah air domestik dari berbagai kegiatan dan usaha seperti Hotel, Apartemen, Mall, Supermarket, Kantor, Klinik, Laboratorium, Rumah Sakit, Sekolah dan lain sebagainya. Sistem pengelohan limbah cair bekerja secara Anaerobik -Aerobik, dengan unit Reaktor sebagai unit utama proses pengolahan limbah cair. PT Mitra Prima Enviro menawarkan unit reaktor berbahan Fiber Reinforced Plastic (FRP) Karena Memiliki keungulan diantaranya : - Tidak mudah korosif/karat - Tahan terhadap cuaca dan bahan kimia - Perawatan dan pemeliharaan yang mudah - Tidak diperlukan serapan - Mudah dibentuk dan ringan - Proses instalasi yang mudah',
            'foto_produk' => 'produk.jpg',
        ],[
            'nama_produk' => 'ECOKENN Kapasitas 5 m3/hari (UP)',
            'deskripsi_produk' => 'Instalasi Pengolahan Air Limbah (IPAL) “Ecokenn” Merupakan sistem pengolahan limbah cair yang di desain dan di produksi oleh PT Mitra Prima Enviro. Sistem pengolahan limbah cair “Ecokenn” merupakan solusi efektif untuk pengolahan limbah air domestik dari berbagai kegiatan dan usaha seperti Hotel, Apartemen, Mall, Supermarket, Kantor, Klinik, Laboratorium, Rumah Sakit, Sekolah dan lain sebagainya.',
            'foto_produk' => 'produk.jpg',
        ],[
            'nama_produk' => 'Membrane Disc Diffuser',
            'deskripsi_produk' => 'Fitur yang dimiliki Membrane DiscDiffuser adalah 1 “(¾”) utas konektor, Diameter luar 280 mm / 350 mm, Permukaan aerasi aktif 0,04 m² / 0,07 m²',
            'foto_produk' => 'produk.jpg',
        ],[
            'nama_produk' => 'Membrane Plate Diffuser',
            'deskripsi_produk' => 'Untuk tanaman yang akan diendapkan kerak kapur. Tanaman sebaiknya dibersihkan dengan cairan asam (85% asam format untuk membran EPDM atau 30% asetat untuk membran TPU) secara berkala. Dengan cara cairan asam disemprotkan ke udara terkompresi jika diperlukan. Aktivitas ini bertujuan mengurangi tekanan membran dan memperpanjang masa pakainya',
            'foto_produk' => 'produk.jpg',
        ],[
            'nama_produk' => 'Bacteria Starter',
            'deskripsi_produk' => 'Bacteria Starter merupakan koloni bakteri starter yang telah diikat dengan precursor khusus agar menghasilkan asam lemak dan asam amino yang sangat dibutuhkan pada proses metabolisme bakteri. Dengan komposisi yang ideal, pertumbuhan bakteri aerobic akan menjadi lebih pat, sehingga proses startup IPAL akan menjadi lebih singkat',
            'foto_produk' => 'produk.jpg',
        ],[
            'nama_produk' => 'Nutrition Bakteria',
            'deskripsi_produk' => 'WWTP Nutrition berfungsi untuk meningkatkan peforma bakteri pengurai dalam IPAL.Produk ini memiliki derajak keasaman pH skala 5-7 (asam), dengan sifat iritan sehingga dapat menyebabkan iritasi pada kulit dan mata pada kontak yang berulang',
            'foto_produk' => 'produk.jpg',
        ],[
            'nama_produk' => 'Root Blower',
            'deskripsi_produk' => '?????',
            'foto_produk' => 'produk.jpg',
        ]);
    }
}
