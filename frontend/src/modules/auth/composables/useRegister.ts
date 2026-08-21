import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '../api/authApi'
import type { RegisterRequest } from '../types/auth'

export function useRegister() {
  const router = useRouter()
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function register(payload: RegisterRequest) {
    loading.value = true
    error.value = null

    try {
      await authApi.register(payload)
      await router.push('/login')
    } catch {
      error.value = 'Gagal mendaftar. Silakan coba lagi.'
    } finally {
      loading.value = false
    }
  }

  return {
    register,
    loading,
    error,
  }
}
