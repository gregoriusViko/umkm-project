export interface Product {
  id: string
  name: string
  price: number
  discount: number
  shop: string
  city: string
  rating: number
  sold: number
  image: string
  description: string
}

export interface Comment {
  personName: string
  content: string
  rate: number
  date: Date
}

export interface ProductsRequest {
  limit: number
  after: number | null
}

export interface ProductsResponse{
  products: Product[]
  nextCursor: number
}

export interface ProductResponse{
  product: Product
  comments: Comment[]
}
