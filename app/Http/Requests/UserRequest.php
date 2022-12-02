<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;

class UserRequest extends FormRequest
{
    protected $stopOnFirstFailure = true;

    protected function prepareForValidation()
    {
        $this->merge([
            'slug' => Str::slug($this->slug),
        ]);
    }
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('isAdmin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'                  => ['required'],
            'email'                 => ['required'],
            'password'              => ['required'],
            // 'password_confirmation' => ['required','confirmed'],
            'role'                  => ['required'],
        ];
    }

    public function messages()
    {
        return [
            'name.required'      => __('The Name field is required.'),
            'email.required'     => __('The Email field is required.'),
            'password.required'  => __('The Password field is required.'),
            'password_confirmation.confirmed'  => __('The password confirmation confirmation does not match.'),
            'role.required'      => __('The Role field is required.'),
        ];
    }

}
