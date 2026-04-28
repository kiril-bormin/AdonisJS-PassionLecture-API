import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@adonisjs/lucid/orm'
import Book from './book.js'

export default class Publisher extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Book, {
    foreignKey: 'publisher_id',
  })
  declare books: HasMany<typeof Book>
}
