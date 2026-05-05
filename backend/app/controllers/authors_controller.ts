import type { HttpContext } from '@adonisjs/core/http'
import Author from '#models/author'
import { createAuthorValidator, updateAuthorValidator } from '#validators/author'

export default class AuthorsController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const query = Author.query().preload('books')
    const { page = 1, search } = request.qs()
    const limit = 16

    if (search) {
      query.where((builder) => {
        builder
          .where('first_name', 'like', `%${search}%`)
          .orWhere('last_name', 'like', `%${search}%`)
      })
    }

    return query.paginate(Number(page), limit)
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createAuthorValidator)
    const author = await Author.create(payload)
    return response.created(author)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const author = await Author.query().where('id', params.id).preload('books').first()

    if (!author) {
      return response.notFound({ message: 'Author not found' })
    }

    return author
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const author = await Author.find(params.id)

    if (!author) {
      return response.notFound({ message: 'Author not found' })
    }

    const payload = await request.validateUsing(updateAuthorValidator)
    author.merge(payload)
    await author.save()

    return author
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const author = await Author.find(params.id)

    if (!author) {
      return response.notFound({ message: 'Author not found' })
    }

    await author.delete()
    return response.noContent()
  }
}
