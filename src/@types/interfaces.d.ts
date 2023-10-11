export interface Book {
  id: string
  name: string
  author: string
  image_url?: string
  rating?: number
  category?: Category
  category_id?: string
  year?: number
  pages: number
  created_at: Date
}

export interface User {
  id: string
  name: string
  email: string
  avatar_url: string
  created_at: Date
}

export interface ReviewedBook {
  id: string
  review: string
  stars: number
  created_at: Date
  user_id: string
  book_id: string
}

export interface Category {
  id: String
  name: String
  created_at: Date
}
