import Book from '#models/book'
import type { HttpContext } from '@adonisjs/core/http'
import { createBookValidator, updateBookValidator } from '#validators/book'

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
  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(createBookValidator)
    const book = await Book.create({
      ...payload,
      userId: auth.user!.id,
    })

    return response.created(book)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const book = await Book.query()
      .where('id', params.id)
      .preload('author')
      .preload('publisher')
      .preload('category')
      .preload('reviews')
      .first()

    if (!book) {
      return response.notFound({ message: 'Book not found' })
    }

    return book
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const book = await Book.find(params.id)

    if (!book) {
      return response.notFound({ message: 'Book not found' })
    }

    const payload = await request.validateUsing(updateBookValidator)
    book.merge(payload)
    await book.save()

    return book
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const book = await Book.find(params.id)

    if (!book) {
      return response.notFound({ message: 'Book not found' })
    }

    await book.delete()
    return response.noContent()
  }
}
