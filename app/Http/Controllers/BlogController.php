<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Blog;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\BlogRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\BlogResource;


class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    // protected array $sortFields = ['title', 'description','author'];

    protected array $sortFields = ['user_id','language','title','description','content','author','author_image_url',
    'image_url_portrait','image_url_landscape','is_trending','is_display','is_approved','posted_at'];

    public const PER_PAGE           = 10;
    public const DEFAULT_SORT_FIELD = 'id';
    public const DEFAULT_SORT_ORDER = 'asc';

    public function getBlog(Request $request)
    {
        $sortFieldInput = $request->input('sort_field', self::DEFAULT_SORT_FIELD);
        $sortField      = in_array($sortFieldInput, $this->sortFields) ? $sortFieldInput : self::DEFAULT_SORT_FIELD;
        $sortOrder      = $request->input('sort_order', self::DEFAULT_SORT_ORDER);
        $searchInput    = $request->input('search');

        $query          = Blog::orderBy($sortField, $sortOrder);

        $perPage        = $request->input('per_page') ?? self::PER_PAGE;

        if (!is_null($searchInput)) {
            $searchQuery = "%$searchInput%";
            $query       = $query->where('name', 'like', $searchQuery)
                                 ->orWhere('email', 'like', $searchQuery)
                                 ->orWhere('role','like', $searchQuery);
        }

        $blogs = $query->paginate((int)$perPage);
        return BlogResource::collection($blogs);
    }

    public function index()
    {
        if(Gate::allows('isAdmin') || Gate::allows('isManager')){
            $blogs = Blog::paginate(3);
            return Inertia::render('Blog/Index')
                    ->with('blogs' , $blogs);
        }else{
            abort(403);
        }
       
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Blog/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BlogRequest $request)
    {
        // Checkbox and Radio button
        $posted_at=  $request->validated('posted_date') . " ". $request->validated('posted_time');

        Blog::create([
            'language'              => $request->validated('language'),
            'title'                 => $request->validated('title'),
            'description'           => $request->validated('description'),
            'content'               => $request->validated('content'),
            'author'                => Auth::user()->name,
            'is_display'            => $request->validated('is_display'),
            'is_approved'           => $request->validated('is_approved'),
            'posted_at'             => date('Y-m-d H:i:s', strtotime($posted_at)),
            'user_id'               => Auth::user()->id,
            'author_image_url'      =>"https://picsum.photos/300/350",
            'image_url_portrait'    =>"https://picsum.photos/300/350",
            'image_url_landscape'   =>"https://picsum.photos/300/350",
            'is_trending'           =>true,
            
        ]);
        
        return redirect()->route('blog.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $blog = Blog::findOrFail($id);
        $this->authorize('view', $blog);

        return Inertia::render('Blog/Show')
                ->with('blog' , $blog);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $blog = Blog::findOrFail($id);

        if($this->authorize('update', $blog))
        {
            return Inertia::render('Blog/Edit')
                ->with('blog' ,$blog);
        }else{
            abort(403);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(BlogRequest $request, $id)
    {
        // Checkbox and Radio button
        $posted_at=  $request->validated('posted_date') . " ". $request->validated('posted_time');

        Blog::create([
            'language'              => $request->validated('language'),
            'title'                 => $request->validated('title'),
            'description'           => $request->validated('description'),
            'content'               => $request->validated('content'),
            'author'                => Auth::user()->name,
            'is_display'            => $request->validated('is_display'),
            'is_approved'           => $request->validated('is_approved'),
            'posted_at'             => date('Y-m-d H:i:s', strtotime($posted_at)),
            'user_id'               => Auth::user()->id,
            'author_image_url'      =>"https://picsum.photos/300/350",
            'image_url_portrait'    =>"https://picsum.photos/300/350",
            'image_url_landscape'   =>"https://picsum.photos/300/350",
            'is_trending'           =>true,
            
        ]);
        
        return redirect()->route('blog.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        $this->authorize('delete', $blog);
        $blog->delete();
        return redirect()->route('blog.index');
        
    }

    public function showBlog($id)
    {
        $blog = Blog::findOrFail($id);
        // $this->authorize('delete', $blog);
        // $blog->delete();
        return Inertia::render('Blog/ShowBlog')
                ->with('blog' ,$blog);
    }

}
