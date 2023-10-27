<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Casts\Attribute;

class Song extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($image) => asset('/storage/images/' . $image),
        );
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }
}
