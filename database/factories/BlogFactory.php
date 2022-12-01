<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Blog;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Blog::class;

    public function definition()
    {
        return [
            'user_id' =>1,
            'language' => "en",
            'title'=>$this->faker->text(10),
            'description'=>$this->faker->text,
            'content' => $this->faker->text,
            'author' =>"Nirmal",
            'author_image_url' =>'https://picsum.photos/300/350',
            'image_url_portrait' =>'https://picsum.photos/300/350',
            'image_url_landscape' =>'https://picsum.photos/360/160',
            'is_trending' =>true,
            'is_display'=> "Y",
            'is_approved'=> "N",
            'posted_at'=> date('Y-m-d H:i:s')
        ];
    }
}
