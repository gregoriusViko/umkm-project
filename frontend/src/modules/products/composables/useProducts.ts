import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { productsApi } from '../api/homeApi'
import type { ProductsRequest, ProductsResponse } from '../types/product'

export function useProducts() {
  const router = useRouter()

  const loading = ref(false)
  const error = ref<string | null>(null)

  async function getProducts(payload: ProductsRequest) : Promise<ProductsResponse | null> {
    loading.value = true
    error.value = null

    try {
      const response :ProductsResponse = await productsApi.getProducts(payload)
      return response
    } catch {
      error.value = 'Koneksi internet terputus'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    getProducts,
    loading,
    error,
  }
}
