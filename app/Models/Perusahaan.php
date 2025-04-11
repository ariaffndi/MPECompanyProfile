<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Perusahaan extends Model
{
    protected $table = 'perusahaan';
    
    protected $fillable = [
        'nama_perusahaan',
        'alamat_perusahaan',
        'email_perusahaan',
        'no_telp_perusahaan',
        'whatsapp_perusahaan',
        'deskripsi_perusahaan',
        'instagram_perusahaan',
        'facebook_perusahaan',
        'foto_kantor_perusahaan',
    ];
}