import vine from '@vinejs/vine'

/**
 * Validator to validate category creation
 */
export const createCategoryValidator = vine.compile(
  vine.object({
    label: vine.string().trim().minLength(2).maxLength(50),
  })
)

/**
 * Validator to validate category update
 */
export const updateCategoryValidator = vine.compile(
  vine.object({
    label: vine.string().trim().minLength(2).maxLength(50).optional(),
  })
)
