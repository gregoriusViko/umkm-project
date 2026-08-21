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
]
