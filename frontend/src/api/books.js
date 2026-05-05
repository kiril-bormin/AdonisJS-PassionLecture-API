import apiClient from './axios'

/**
 * Books API — RESTful service layer
 */

export const getAllBooks = (params = {}) => apiClient.get('/api/books', { params })
export const getBookById = (id) => apiClient.get(`/api/books/${id}`)
export const createBook = (bookData) => apiClient.post('/api/books', bookData)
export const updateBook = (id, fields) => apiClient.patch(`/api/books/${id}`, fields)
export const deleteBook = (id) => apiClient.delete(`/api/books/${id}`)
