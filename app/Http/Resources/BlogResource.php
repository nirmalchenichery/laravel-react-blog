<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return parent::toArray([
            'id'                    => $this->id,
            'user_id'               => $this->user_id,
            'language'              => $this->language =="en" ?"English":"Japanese",
            'description'           => $this->description,
            'title'                 => $this->title,
            'content'               => $this->content,
            'author'                => $this->author,
            'author_image_url'      => $this->author_image_url,
            'image_url_portrait'    => $this->image_url_portrait,
            'image_url_landscape'   => $this->image_url_landscape,
            'is_trending'           => $this->is_trending,
            'is_display'            => $this->is_display =="Y" ?"Yes":"No", 
            'is_approved'           => $this->is_approved =="Y" ?"Yes":"No",
            'posted_at'             => $this->posted_at,
        ]);
    }
}
