<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Inquiry extends Model
{
    use SoftDeletes;
    use Notifiable;

    protected $fillable = ['name', 'email', 'phone', 'service_id', 'product_id', 'detail', 'status'];
    protected $dates = ['delete_at_'];

    public function service(){
            return $this->belongsTo(Service::class);
        }

    public function product(){
            return $this->belongsTo(Product::class);
        }
}
