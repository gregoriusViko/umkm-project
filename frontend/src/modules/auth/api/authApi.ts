import api from '@/services/api'
import type { LoginRequest, LoginResponse, RegisterRequest } from '../types/auth'

export const authApi = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', payload)
    return response.data
  },

  async register(payload: RegisterRequest) {
    await api.post<RegisterRequest>('/auth/register', payload)
  },
}
