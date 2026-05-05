import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'
import { createCategoryValidator, updateCategoryValidator } from '#validators/category'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const query = Category.query().preload('books')
    const { page = 1, search } = request.qs()
    const limit = 16

    if (search) {
      query.where('label', 'like', `%${search}%`)
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
    const payload = await request.validateUsing(createCategoryValidator)
    const category = await Category.create(payload)
    return response.created(category)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const category = await Category.query().where('id', params.id).preload('books').first()

    if (!category) {
      return response.notFound({ message: 'Category not found' })
    }

    return category
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const category = await Category.find(params.id)

    if (!category) {
      return response.notFound({ message: 'Category not found' })
    }

    const payload = await request.validateUsing(updateCategoryValidator)
    category.merge(payload)
    await category.save()

    return category
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const category = await Category.find(params.id)

    if (!category) {
      return response.notFound({ message: 'Category not found' })
    }

    await category.delete()
    return response.noContent()
  }
}
