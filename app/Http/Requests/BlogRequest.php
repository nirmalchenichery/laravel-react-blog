<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;

class BlogRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */

    protected $stopOnFirstFailure = true;

    protected function prepareForValidation()
    {
        $this->merge([
            'slug' => Str::slug($this->slug),
        ]);
    }

    public function authorize()
    {
        return Gate::allows('isAdmin') || Gate::allows('isManager');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'language'          => ['required'],
            'title'             => ['required'],
            'description'       => ['required'],
            'content'           => ['required'],
            'is_display'        => ['required'],
            'posted_date'       => ['required'],
            'posted_time'       => ['required'],
            'is_approved'       => ['required'],
           
        ];
    }

    public function messages()
    {
        return [
            'language.required'         => __('The Language field is required.'),
            'title.required'            => __('The Title field is required.'),
            'description.required'      => __('The Description field is required.'),
            'is_display.required'       => __('The Choose Display Option is required.'),
            'posted_date.required'      => __('The Posted date field is required.'),
            'posted_time.required'      => __('The Posted time field is required.'),
            'is_approved.required'      => __('The Approved field is required.'),
        ];
    }
}
