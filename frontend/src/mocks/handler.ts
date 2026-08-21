import { http, HttpResponse } from 'msw'
import type { LoginRequest, RegisterRequest } from '@/modules/auth/types/auth'

const apiUrl = import.meta.env.VITE_API_URL

export const handlers = [
  http.post(`${apiUrl}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as LoginRequest

    if (body.email !== 'admin@example.com' || body.password !== 'password') {
      return HttpResponse.json({ message: 'Email atau password salah' }, { status: 401 })
    }

    return HttpResponse.json({
      accessToken: 'dummy-access-token',
      user: {
        id: 1,
        name: 'Admin UMKM',
        email: body.email,
      },
    })
  }),

  http.post(`${apiUrl}/auth/register`, async ({ request }) => {
    const body = (await request.json()) as RegisterRequest

    return HttpResponse.json(
      {
        message: 'Registrasi berhasil',
        user: {
          id: Date.now(),
          name: body.name,
          email: body.email,
        },
      },
      { status: 201 },
    )
  }),

  http.get(`${apiUrl}/home/products`, async () => {
    const mockProducts = [
      {
        name: 'Sepatu Sneakers Kanvas Lokal',
        price: 189000, // Menghapus 'Rp' dan titik, diubah jadi murni angka
        oldPrices: 235000,
        discount: 20, // Menghapus simbol '%'
        shop: 'Langkah Lokal',
        city: 'Bandung',
        rating: 4.9, // Desimal di JavaScript menggunakan titik
        sold: 1200, // '1,2 rb' diubah menjadi angka aslinya
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=640&q=82',
      },
      {
        name: 'Tas Anyaman Rotan Handmade',
        price: 145000,
        oldPrices: 0, // Nilai kosong ('') diganti angka 0 agar sesuai kontrak 'number'
        discount: 0,
        shop: 'Kriya Nusantara',
        city: 'Bantul',
        rating: 4.8,
        sold: 864,
        image:
          'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=640&q=82',
      },
      {
        name: 'Kopi Arabika Gayo 250 gram',
        price: 68000,
        oldPrices: 80000,
        discount: 15,
        shop: 'Ruang Seduh',
        city: 'Aceh Tengah',
        rating: 4.9,
        sold: 2400,
        image:
          'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=640&q=82',
      },
      {
        name: 'Jam Tangan Kayu Pria Wanita',
        price: 219000,
        oldPrices: 0,
        discount: 0,
        shop: 'KayuKita Studio',
        city: 'Yogyakarta',
        rating: 4.7,
        sold: 532,
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=640&q=82',
      },
    ]

    return HttpResponse.json({
      products: mockProducts,
      nextCursor: 2,
    })
  }),
]
