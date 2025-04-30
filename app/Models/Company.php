<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table = 'companies';
    
    protected $fillable = [
        'name',
        'address',
        'email',
        'phone',
        'whatsapp',
        'description',
        'instagram',
        'facebook',
        'youtube',
        'office_image',
        'logo',
    ];
}