<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use App\Models\Song;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Song::create([
            'user_id'   => 2,
            'nama'      => 'GiGI',
            'image'     => '',
            'judul_lagu'    => 'Melayang',
        ]);
        Song::create([
            'user_id'   => 3,
            'nama'      => 'Sheila on 7',
            'image'     => '',
            'judul_lagu'    => 'Melayang',
        ]);
        Song::create([
            'user_id'   => 4,
            'nama'      => 'Jikustik',
            'image'     => '',
            'judul_lagu'    => 'Puisi',
        ]);
        Song::create([
            'user_id'   => 1,
            'nama'      => 'Dewa 19',
            'image'     => '',
            'judul_lagu'    => 'Larut',
        ]);

    }
}
