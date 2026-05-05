import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
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

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @belongsTo(() => Author)
  declare author: BelongsTo<typeof Author>

  @belongsTo(() => Publisher)
  declare publisher: BelongsTo<typeof Publisher>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Review)
  declare reviews: HasMany<typeof Review>
}
