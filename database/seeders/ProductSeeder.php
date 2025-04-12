<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::insert([
            [
            'nama_product' => 'Grease Trap',
            'deskripsi_product' => 'Grease Trap adalah alat perangkap grease (lemak) atau minyak dan oli. Alat ini membantu untuk memisahkan minyak dari air, sehingga minyak tidak menggumpal dan membeku di pipa pembuangan dan membuat pipa tersumbat',
            'foto_product' => 'produk.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ],[
            'nama_product' => 'Biofilter Septic Tank',
            'deskripsi_product' => 'Biofilter Septi Tank merupakan sistem pengolahan air limbah cair domestik yang dibuat dengan material berbahan Fiber Reinforced Plastic (FRP)',
            'foto_product' => 'produk.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ],[
            'nama_product' => 'ECOKENN Kapasitas 1-4 m3/hari',
            'deskripsi_product' => 'Instalasi Pengolahan Air Limbah (IPAL) “Ecokenn” Merupakan sistem pengolahan limbah cair yang di desain dan di produksi oleh PT Mitra Prima Enviro. Sistem pengolahan limbah cair “Ecokenn” merupakan solusi efektif untuk pengolahan limbah air domestik dari berbagai kegiatan dan usaha seperti Hotel, Apartemen, Mall, Supermarket, Kantor, Klinik, Laboratorium, Rumah Sakit, Sekolah dan lain sebagainya. Sistem pengelohan limbah cair bekerja secara Anaerobik -Aerobik, dengan unit Reaktor sebagai unit utama proses pengolahan limbah cair. PT Mitra Prima Enviro menawarkan unit reaktor berbahan Fiber Reinforced Plastic (FRP) Karena Memiliki keungulan diantaranya : - Tidak mudah korosif/karat - Tahan terhadap cuaca dan bahan kimia - Perawatan dan pemeliharaan yang mudah - Tidak diperlukan serapan - Mudah dibentuk dan ringan - Proses instalasi yang mudah',
            'foto_product' => 'produk.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ],[
            'nama_product' => 'ECOKENN Kapasitas 5 m3/hari (UP)',
            'deskripsi_product' => 'Instalasi Pengolahan Air Limbah (IPAL) “Ecokenn” Merupakan sistem pengolahan limbah cair yang di desain dan di produksi oleh PT Mitra Prima Enviro. Sistem pengolahan limbah cair “Ecokenn” merupakan solusi efektif untuk pengolahan limbah air domestik dari berbagai kegiatan dan usaha seperti Hotel, Apartemen, Mall, Supermarket, Kantor, Klinik, Laboratorium, Rumah Sakit, Sekolah dan lain sebagainya.',
            'foto_product' => 'produk.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ],[
            'nama_product' => 'Membrane Disc Diffuser',
            'deskripsi_product' => 'Fitur yang dimiliki Membrane DiscDiffuser adalah 1 “(¾”) utas konektor, Diameter luar 280 mm / 350 mm, Permukaan aerasi aktif 0,04 m² / 0,07 m²',
            'foto_product' => 'produk.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ],[
            'nama_product' => 'Membrane Plate Diffuser',
            'deskripsi_produk' => 'Untuk tanaman yang akan diendapkan kerak kapur. Tanaman sebaiknya dibersihkan dengan cairan asam (85% asam format untuk membran EPDM atau 30% asetat untuk membran TPU) secara berkala. Dengan cara cairan asam disemprotkan ke udara terkompresi jika diperlukan. Aktivitas ini bertujuan mengurangi tekanan membran dan memperpanjang masa pakainya',
            'foto_produk' => 'produk.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ],[
            'nama_product' => 'Bacteria Starter',
            'deskripsi_product' => 'Bacteria Starter merupakan koloni bakteri starter yang telah diikat dengan precursor khusus agar menghasilkan asam lemak dan asam amino yang sangat dibutuhkan pada proses metabolisme bakteri. Dengan komposisi yang ideal, pertumbuhan bakteri aerobic akan menjadi lebih pat, sehingga proses startup IPAL akan menjadi lebih singkat',
            'foto_product' => 'produk.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ],[
            'nama_product' => 'Nutrition Bakteria',
            'deskripsi_product' => 'WWTP Nutrition berfungsi untuk meningkatkan peforma bakteri pengurai dalam IPAL.Produk ini memiliki derajak keasaman pH skala 5-7 (asam), dengan sifat iritan sehingga dapat menyebabkan iritasi pada kulit dan mata pada kontak yang berulang',
            'foto_product' => 'produk.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ],[
            'nama_product' => 'Root Blower',
            'deskripsi_product' => '?????',
            'foto_product' => 'produk.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ]
    ]);
    }
}