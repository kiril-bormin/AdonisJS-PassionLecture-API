import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@adonisjs/lucid/orm'
import Book from './book.js'
import User from './user.js'

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare rating: number

  @column()
  declare comment: string | null

  @column()
  declare bookId: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Book, {
    foreignKey: 'book_id',
  })
  declare book: BelongsTo<typeof Book>

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  declare user: BelongsTo<typeof User>
}
