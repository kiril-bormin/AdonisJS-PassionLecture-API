import vine from '@vinejs/vine'

/**
 * Validator to validate book creation
 */
export const createBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255),
    summary: vine.string().trim().optional(),
    pagesCount: vine.number().positive().optional(),
    editionYear: vine.number().min(1000).max(new Date().getFullYear()).optional(),
    extractUrl: vine.string().url().optional(),
    coverUrl: vine.string().url().optional(),
    categoryId: vine.number().exists({ table: 'categories', column: 'id' }),
    authorId: vine.number().exists({ table: 'authors', column: 'id' }),
    publisherId: vine.number().exists({ table: 'publishers', column: 'id' }),
  })
)

/**
 * Validator to validate book update
 */
export const updateBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255).optional(),
    summary: vine.string().trim().optional(),
    pagesCount: vine.number().positive().optional(),
    editionYear: vine.number().min(1000).max(new Date().getFullYear()).optional(),
    extractUrl: vine.string().url().optional(),
    coverUrl: vine.string().url().optional(),
    categoryId: vine.number().exists({ table: 'categories', column: 'id' }).optional(),
    authorId: vine.number().exists({ table: 'authors', column: 'id' }).optional(),
    publisherId: vine.number().exists({ table: 'publishers', column: 'id' }).optional(),
  })
)
