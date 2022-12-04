<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BlogController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', [HomeController::class, 'index'])->name('home.index');
    
Route::get('/user', [UserController::class, 'index'])->name('user.index');
Route::get('/user', [UserController::class, 'show'])->name('user.show');

Route::resource('/user', UserController::class);

Route::resource('/blog', BlogController::class);

Route::get('/getblog', [BlogController::class, 'getBlog'])->name('blog.getBlog');




// Route::get('/', function () {
//     return Inertia::render('Home', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    
    if (Gate::allows('isAdmin')){
        return Inertia::render('Dashboard');
    }
    elseif(Gate::allows('isManager')){
        return Inertia::render('ManagerDashboard');
    }
    elseif(Gate::allows('isUser')){
        return Inertia::render('UserDashboard');
    }

})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
