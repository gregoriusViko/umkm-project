export interface Product {
  name: string
  price: number
  oldPrices: number
  discount: number
  shop: string
  city: string
  rating: number
  sold: number
  image: string
}

export interface ProductsRequest {
  limit: number
  after: number | null
}

export interface ProductsResponse{
  products: Product[]
  nextCursor: number
}
