<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use SoftDeletes;

    protected $fillable = ['client_type'];
    protected $dates = ['delete_at_'];

    public function projects() {
        return $this->hasMany(Project::class);
    }
}
