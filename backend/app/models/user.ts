import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, HasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Book from './book.js'
import Review from './review.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pseudo: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: 'user' | 'admin'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Book, {
    foreignKey: 'user_id',
  })
  declare books: HasMany<typeof Book>

  @hasMany(() => Review, {
    foreignKey: 'user_id',
  })
  declare reviews: HasMany<typeof Review>

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
