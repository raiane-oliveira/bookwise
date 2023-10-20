export interface Book {
  id: string
  name: string
  image_url?: string
  rating?: number
  year?: number
  pages: number
  created_at: Date
  categories: Category[]
  authors: Author[]
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
  id: string
  name: string
  created_at: Date
}

export interface Author {
  id: string
  name: string
  avatar_url?: string
  created_at: Date
  books: Book[]
}
