export interface LoginRequest {
  email: string
  password: string
}

export interface User {
  id: number
  name: string
  email: string
}

export interface LoginResponse {
  accessToken: string
  user: User
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}
