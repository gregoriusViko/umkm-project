import api from '@/services/api'
import type { ProductResponse, ProductsRequest, ProductsResponse } from '../types/product'

export const productsApi = {
  async getProducts(payload: ProductsRequest): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>('/home/products', { params: payload })
    return response.data
  },

  async getDetailProduct(payload: string): Promise<ProductResponse> {
    const responce = await api.get<ProductResponse>(`/product/${payload}`)
    return responce.data
  }
}
