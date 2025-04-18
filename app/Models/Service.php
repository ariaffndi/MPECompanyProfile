<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use SoftDeletes;
    
    protected $fillable = ['service_name', 'service_description', 'service_image'];
    protected $dates = ['delete_at_'];
}
