<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use SoftDeletes;

    protected $fillable = ['project_name', 'client_id', 'category_id', 'location', 'year', 'value', 'description', 'project_image'];
    protected $dates = ['delete_at_'];

    public function client(){
            return $this->belongsTo(Client::class);
        }

    public function category(){
            return $this->belongsTo(Category::class);
        }
}