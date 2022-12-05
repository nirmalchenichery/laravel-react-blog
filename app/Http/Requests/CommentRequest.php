<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            // 'user_id'   => ['required'],
            // 'post_id'   => ['required'],
            // 'email'     => ['required'],
            'comment'   => ['required'],
            
        ];
    }

    public function messages()
    {
        return [
            // 'user_id.required'   => __('The user_id is required.'),
            // 'post_id.required'   => __('The Post_id is required.'),
            // 'email.required'     => __('The Enail is required.'),
            'comment.confirmed'  => __('The Comment is required.'),
        ];
    }
}
