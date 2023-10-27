<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SongResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Song;
use Illuminate\Support\Facades\Storage;

class SongController extends Controller
{
    public function getSongsForLoggedInUser() {
        $user = auth()->user(); // Mengambil pengguna yang telah login
        if ($user->hasRole('admin') || $user->hasRole('operator')) {
            // Jika pengguna memiliki role admin atau operator, kembalikan semua lagu
            $songs = Song::latest()->paginate();
        } else {
            // Jika bukan admin atau operator, ambil lagu-lagu yang dimiliki oleh pengguna
            $songs = $user->songs()->latest()->paginate();
        }
        return $songs;
    }
    public function index(){
        $songs = $this->getSongsForLoggedInUser();
        // $songs = Song::latest()->paginate(4);
        return new SongResource(true, 'Data lagu saat ini', $songs);
    }

    public function store(Request $request) {
        //cek validasi data
        $validator = Validator::make($request->all(), [
            'image'     =>'required|image|mimes:jpeg,jpg,png,gif,svg|max:2048',
            'nama'      => 'required',
            'judul_lagu'=> 'required',
        ],[
            'image.required'    => 'Kolom gambar wajib diisi.',
            'image.image'       => 'File harus berupa gambar.',
            'image.mimes'       => 'Format gambar harus jpeg, jpg, png, gif, atau svg.',
            'image.max'         => 'Ukuran gambar tidak boleh melebihi 2MB.',
            'nama.required'     => 'Kolom nama wajib diisi.',
            'judul_lagu.required' => 'Kolom judul lagu wajib diisi.',
        ]);

        //cek validasi jika gagal
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //upload image
        $image = $request->file('image');
        $image->storeAs('public/images', $image->hashName());

        //buat data song
        $song = Song::create([
            'image'     => $image->hashName(),
            'nama'      => $request->nama,
            'judul_lagu'=> $request->judul_lagu,
            'user_id'   => Auth()->user()->id
        ]);

        //kirim response
        return new SongResource(true, 'Data berhasil ditambahkan', $song);
    }

    public function show($id) {
        $song = Song::find($id);

        return new SongResource(true, 'Detail data lagu', $song);
    }

    public function update(Request $request, $id)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'nama'     => 'required',
            'judul_lagu'   => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //find songs by ID
        $song = Song::find($id);

        //check if image is not empty
        if ($request->hasFile('image')) {

            //upload image
            $image = $request->file('image');
            $image->storeAs('public/images', $image->hashName());

            //delete old image
            Storage::delete('public/images/'.basename($song->image));

            //update song with new image
            $song->update([
                'image'         => $image->hashName(),
                'nama'          => $request->nama,
                'judul_lagu'    => $request->judul_lagu,
            ]);

        } else {

            //update song without image
            $song->update([
                'nama'          => $request->nama,
                'judul_lagu'    => $request->judul_lagu,
            ]);
        }

        //return response
        return new SongResource(true, 'Data Lagu Berhasil Diubah!', $song);
    }

    public function destroy($id) {
        $song = Song::find($id);
        Storage::delete('public/images/'. basename($song->image));

        $song->delete();
        return new SongResource(true, 'Data lagu berhasil dihapus', null);
    }
}
