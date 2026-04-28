import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@adonisjs/lucid/orm'
import Category from './category.js'
import Author from './author.js'
import Publisher from './publisher.js'
import User from './user.js'
import Review from './review.js'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare summary: string | null

  @column()
  declare pagesCount: number | null

  @column()
  declare editionYear: number | null

  @column()
  declare extractUrl: string | null

  @column()
  declare coverUrl: string | null

  @column()
  declare categoryId: number

  @column()
  declare authorId: number

  @column()
  declare publisherId: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Category, {
    foreignKey: 'category_id',
  })
  declare category: BelongsTo<typeof Category>

  @belongsTo(() => Author, {
    foreignKey: 'author_id',
  })
  declare author: BelongsTo<typeof Author>

  @belongsTo(() => Publisher, {
    foreignKey: 'publisher_id',
  })
  declare publisher: BelongsTo<typeof Publisher>

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  declare user: BelongsTo<typeof User>

  @hasMany(() => Review, {
    foreignKey: 'book_id',
  })
  declare reviews: HasMany<typeof Review>
}
