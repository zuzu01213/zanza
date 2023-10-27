<?php

use App\Http\Controllers\Api\SongController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


// Route::post('/register',App\Http\Controllers\Api\RegisterController::class)->name('register');

// Route::post('/login', App\Http\Controllers\Api\LoginController::class)->name('login');

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//         return $request->user();
//     });

Route::apiResource('/songs',App\Http\Controllers\Api\SongController::class);
// Route::apiResource('/songs', App\Http\Controllers\Api\SongController::class)->middleware('checkRole:admin,operator');
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/user-profile', [AuthController::class, 'userProfile']);
});
