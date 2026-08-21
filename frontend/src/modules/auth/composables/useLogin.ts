import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '../api/authApi'
import { useAuthStore } from '../stores/authStore'
import type { LoginRequest } from '../types/auth'

export function useLogin() {
  const router = useRouter()
  const authStore = useAuthStore()

  const loading = ref(false)
  const error = ref<string | null>(null)

  async function login(payload: LoginRequest) {
    loading.value = true
    error.value = null

    try {
      const response = await authApi.login(payload)

      authStore.setAuth(response.accessToken, response.user)

      await router.push('/')
    } catch {
      error.value = 'Email atau password salah'
    } finally {
      loading.value = false
    }
  }

  return {
    login,
    loading,
    error,
  }
}
