<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'language',
        'title',
        'description',
        'content',
        'author',
        'author_image_url',
        'image_url_portrait',
        'image_url_landscape',
        'is_trending',
        'is_display',
        'is_approved',
        'posted_at'
    ];
}
