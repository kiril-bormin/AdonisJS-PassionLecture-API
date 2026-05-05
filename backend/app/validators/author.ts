import vine from '@vinejs/vine'

/**
 * Validator to validate author creation
 */
export const createAuthorValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(2).maxLength(100),
    lastName: vine.string().trim().minLength(2).maxLength(100),
  })
)

/**
 * Validator to validate author update
 */
export const updateAuthorValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(2).maxLength(100).optional(),
    lastName: vine.string().trim().minLength(2).maxLength(100).optional(),
  })
)
