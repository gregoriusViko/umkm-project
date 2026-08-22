import api from '@/services/api'
import type { ProductsRequest, ProductsResponse } from '../types/product'

export const productsApi = {
  async getProducts(payload: ProductsRequest): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>('/home/products', { params: payload })
    return response.data
  },
}
