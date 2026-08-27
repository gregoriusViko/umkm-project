import { http, HttpResponse } from 'msw'
import type { LoginRequest, RegisterRequest } from '@/modules/auth/types/auth'
import mockProducts from './json/products.json'
import mockComment from './json/comments.json'
import users from './json/users.json'

const apiUrl = import.meta.env.VITE_API_URL

export const handlers = [
  http.post(`${apiUrl}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as LoginRequest

    const user = users.find((person) => person.email === body.email)

    if (!user || body.password !== user?.password) {
      return HttpResponse.json({ message: 'Email atau password salah' }, { status: 401 })
    }

    return HttpResponse.json({
      accessToken: user.email,
      user: {
        id: user.id,
        name: user.name,
        email: body.email,
      },
    })
  }),

  http.post(`${apiUrl}/auth/register`, async ({ request }) => {
    const body = (await request.json()) as RegisterRequest
    const isEmailUsed = users.some((person) => person.email === body.email)
    if (isEmailUsed) {
      return HttpResponse.json(
        { message: 'Email sudah terdaftar, gunakan email lain.' },
        { status: 400 }, // 400 adalah kode standar untuk input yang tidak valid
      )
    }
    const newUser = {
      id: users.length + 1,
      ...body,
    }
    users.push(newUser)

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
    return HttpResponse.json({
      products: mockProducts,
      nextCursor: 2,
    })
  }),

  http.get(`${apiUrl}/product/:id`, async ({ params }) => {
    const { id } = params

    const detailProduct = mockProducts.find((product) => product.id === id)

    if (!detailProduct) {
      return HttpResponse.json({ message: 'Product not found' }, { status: 404 })
    }
    const comment = mockComment.find((product) => product.product_id === id)
    return HttpResponse.json({
      product: detailProduct,
      comments: comment?.comments,
    })
  }),
]
