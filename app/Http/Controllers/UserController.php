<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;
use App\Http\Requests\UserRequest;
use Inertia\Inertia;
// use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Log;
use Exception;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected array $sortFields = ['name', 'email','role'];

    public const PER_PAGE           = 10;
    public const DEFAULT_SORT_FIELD = 'name';
    public const DEFAULT_SORT_ORDER = 'asc';

    public function index(Request $request)
    {
        $sortFieldInput = $request->input('sort_field', self::DEFAULT_SORT_FIELD);
        $sortField      = in_array($sortFieldInput, $this->sortFields) ? $sortFieldInput : self::DEFAULT_SORT_FIELD;
        $sortOrder      = $request->input('sort_order', self::DEFAULT_SORT_ORDER);
        $searchInput    = $request->input('search');

        $query          = User::orderBy($sortField, $sortOrder);

        $perPage        = $request->input('per_page') ?? self::PER_PAGE;

        if (!is_null($searchInput)) {
            $searchQuery = "%$searchInput%";
            $query       = $query->where('name', 'like', $searchQuery)
                                 ->orWhere('email', 'like', $searchQuery)
                                 ->orWhere('role','like', $searchQuery);
        }
        $users = $query->paginate((int)$perPage);
        return UserResource::collection($users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        User::create([
            'name'      => $request->validated('name'),
            'password'  => Hash::make($request->validated('password')) ,
            'email'     => $request->validated('email'),
            'role'      => $request->validated('role'), // user / manager / admin
        ]);
        return redirect()->route('dashboard');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        if ($this->authorize('view',$user)){
            return Inertia::render('User/Show')
                    ->with('user' , $user);
        }else{
            abort(403);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::findOrFail($id);
        if($this->authorize('update', $user))
        {
            return Inertia::render('User/Edit')
                ->with('user' ,$user);
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
    public function update(Request $request, $id) // Use UserRequest :- check alternative Password validation
    {
        $this->authorize('update',User::find($id));
        User::find($id)->update([
            'name'      => $request->validated('name'),
            'email'     => $request->validated('email'),
            'role'      => $request->validated('role'),
        ]);
        return redirect()->route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $this->authorize('delete',$user);
        $user->delete();
        return redirect()->route('dashboard');
    }

    public function getUser()
    {
       try{
            $user = User::all();
            return response()->json($user);
       }
       catch(Exception $e){
          Log::error($e);
       }
       
        // var_dump("dddd");exit();
    }
}
