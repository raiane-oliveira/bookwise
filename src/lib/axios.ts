import axios from "axios"

export const api = axios.create({
  baseURL: "/api",
})

export const booksApi = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
})
