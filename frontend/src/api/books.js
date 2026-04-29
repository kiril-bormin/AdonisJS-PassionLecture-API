import apiClient from './axios'

/**
 * Books API — RESTful service layer
 */

export const getAllBooks = (params = {}) => apiClient.get('/books', { params })
export const getBookById = (id) => apiClient.get(`/books/${id}`)
export const createBook = (bookData) => apiClient.post('/books', bookData)
export const updateBook = (id, fields) => apiClient.patch(`/books/${id}`, fields)
export const deleteBook = (id) => apiClient.delete(`/books/${id}`)
