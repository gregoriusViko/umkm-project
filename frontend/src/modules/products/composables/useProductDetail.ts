import { ref } from "vue";
import type { ProductResponse } from "../types/product";
import { productsApi } from "../api/productsApi";

export function useProductDetail(){
  const loading = ref(false)
  const error = ref<string | null>(null)
  async function getDetailProduct (payload: string) : Promise<ProductResponse | null> {
    try {
      const responce :ProductResponse = await productsApi.getDetailProduct(payload)
      return responce
    } catch {
      error.value = 'Koneksi bermasalah'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    getDetailProduct,
    loading,
    error
  }
}
