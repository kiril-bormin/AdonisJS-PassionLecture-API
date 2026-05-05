import type { HttpContext } from '@adonisjs/core/http'
import Publisher from '#models/publisher'
import { createPublisherValidator, updatePublisherValidator } from '#validators/publisher'

export default class PublishersController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const query = Publisher.query().preload('books')
    const { page = 1, search } = request.qs()
    const limit = 16

    if (search) {
      query.where('name', 'like', `%${search}%`)
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
    const payload = await request.validateUsing(createPublisherValidator)
    const publisher = await Publisher.create(payload)
    return response.created(publisher)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const publisher = await Publisher.query().where('id', params.id).preload('books').first()

    if (!publisher) {
      return response.notFound({ message: 'Publisher not found' })
    }

    return publisher
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const publisher = await Publisher.find(params.id)

    if (!publisher) {
      return response.notFound({ message: 'Publisher not found' })
    }

    const payload = await request.validateUsing(updatePublisherValidator)
    publisher.merge(payload)
    await publisher.save()

    return publisher
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const publisher = await Publisher.find(params.id)

    if (!publisher) {
      return response.notFound({ message: 'Publisher not found' })
    }

    await publisher.delete()
    return response.noContent()
  }
}
