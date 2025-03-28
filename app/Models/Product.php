<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;
    
    protected $fillable = ['nama_product', 'deskripsi_product','foto_product'];
    protected $dates = ['delete_at_'];
}