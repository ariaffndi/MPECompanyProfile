<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'product_name', 
        'slug', 
        'product_description', 
        'product_specification', 
        'product_image'
        ];
    protected $dates = ['delete_at'];

    public function inquiry() {
        return $this->hasMany(Inquiry::class);
    }
}