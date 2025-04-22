<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;

    protected $fillable = ['catetory_name'];
    protected $dates = ['delete_at_'];

    public function projects() {
        return $this->hasMany(Project::class);
    }
}
