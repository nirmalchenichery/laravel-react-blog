<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use App\Models\Blog;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        return response()->json([
            'status' => 200,
            'comments' => Comment::where('post_id', $id)->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CommentRequest $request)
    {
        Comment::create([
            'user_id'               => Auth::user()->id,
            'post_id'               => $request->input('id'),
            'email'                 => Auth::user()->email,
            'comment'               => $request->validated('comment'),
        ]);
        
        return redirect()->route("blog.showBlog",$request->input('id'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CommentRequest $request, $id)
    {
        // var_dump(Comment::find($id));exit();

        Comment::find($id)->update([
            'user_id'               => $request->input('user_id'),
            'post_id'               => $request->input('post_id'),
            'email'                 => Auth::user()->email,
            'comment'               => $request->validated('comment'),
        ]);

        return redirect()->route("blog.showBlog", $request->input('post_id'));

        

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $comments = Comment::findOrFail($id);
        $blog_id  =  $comments["post_id"];       
        $this->authorize('delete', $comments);
        $comments->delete();

        if(Gate::allows('isUser')){
            return redirect()->route('blog.showBlog' ,$blog_id);
        }
        else{
            return redirect()->route('blog.show' ,$blog_id);
        }
    }
}
