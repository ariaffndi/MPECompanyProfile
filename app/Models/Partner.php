<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Partner extends Model
{
    use SoftDeletes;
    
    protected $fillable = ['company_name', 'logo'];
    protected $dates = ['delete_at_'];
}
