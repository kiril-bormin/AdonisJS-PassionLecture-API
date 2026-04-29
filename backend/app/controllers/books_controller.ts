import Book from '#models/book'
import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const query = Book.query()
      .preload('author')
      .preload('publisher')
      .preload('category')
      .preload('reviews')

    const { page = 1, search, category, author, publisher } = request.qs()
    const limit = 16

    if (search) {
      query.where('title', 'like', `%${search}%`)
    }

    if (category) {
      query.where('category_id', Number(category))
    }

    if (author) {
      query.where('author_id', Number(author))
    }

    if (publisher) {
      query.where('publisher_id', Number(publisher))
    }

    return query.paginate(Number(page), limit)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
