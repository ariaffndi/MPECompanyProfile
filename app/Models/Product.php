<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;
    
    protected $fillable = ['product_name', 'product_description', 'product_specification', 'product_image'];
    protected $dates = ['delete_at_'];

    public function inquiry() {
        return $this->hasMany(Inquiry::class);
    }
}