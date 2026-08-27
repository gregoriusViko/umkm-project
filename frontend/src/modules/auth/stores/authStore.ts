import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(localStorage.getItem('access_token'))
  const expired = ref<string | null>(localStorage.getItem('exp'))

  const isAuthenticated = computed(() => {
    return accessToken.value !== null
  })

  function setAuth(token: string, authenticatedUser: User) {
    accessToken.value = token
    user.value = authenticatedUser

    localStorage.setItem('access_token', token)
  }

  function logout() {
    accessToken.value = null
    user.value = null

    localStorage.removeItem('access_token')
  }

  return {
    user,
    accessToken,
    isAuthenticated,
    setAuth,
    logout,
  }
})
