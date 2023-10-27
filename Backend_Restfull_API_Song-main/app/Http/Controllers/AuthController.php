<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email'     => 'required|email',
            'password'  => 'required|string|min:6',
        ], [
            'email.required' => 'Kolom email wajib diisi',
            'email.email' => 'Format email tidak valid',
            'password.required' => 'Kolom password wajib diisi',
            'password.string' => 'Kolom password harus berupa teks',
            'password.min' => 'Password harus memiliki minimal 6 karakter',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json([
                'success' => false,
                'message' => 'Email atau Password Anda salah'
            ], 401);
        }
        return $this->createNewToken($token);
    }

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name'      => 'required|string|between:2,100',
            'email'     => 'required|string|email|max:100|unique:users',
            'password'  => 'required|string|confirmed|min:6',
        ],[
            'name.required' => 'Kolom nama wajib diisi',
            'name.string' => 'Kolom nama harus berupa teks',
            'name.between' => 'Panjang nama harus antara 2 hingga 100 karakter',
            'email.required' => 'Kolom email wajib diisi',
            'email.string' => 'Kolom email harus berupa teks',
            'email.email' => 'Format email tidak valid',
            'email.max' => 'Panjang email maksimal 100 karakter',
            'email.unique' => 'Email sudah terdaftar',
            'password.required' => 'Kolom password wajib diisi',
            'password.string' => 'Kolom password harus berupa teks',
            'password.confirmed' => 'Password konfirmasi tidak cocok',
            'password.min' => 'Password harus memiliki minimal 6 karakter',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }
        // $user = User::create(array_merge(
        //             $validator->validated(),
        //             ['password' => bcrypt($request->password)]
        //         ));
        $user = User::create(array_merge(
                $validator->validated(),
                ['password' => bcrypt($request->password), 'role' => 'user']
            ));
        return response()->json([
            'success' => 'User successfully registered',
            'user' => $user
        ], 201);
    }
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();
        return response()->json([
            'success' => true,
            'message' => 'User Berhasil Logout',
        ]);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh(true));
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        return response()->json(auth()->user());
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth()->factory()->getTTL() * 60 * 24,
            'user' => auth()->user()
        ]);
    }
}
