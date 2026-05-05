import vine from '@vinejs/vine'

/**
 * Validator to validate publisher creation
 */
export const createPublisherValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
  })
)

/**
 * Validator to validate publisher update
 */
export const updatePublisherValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100).optional(),
  })
)
