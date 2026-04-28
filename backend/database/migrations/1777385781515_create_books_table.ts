import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 255).notNullable()
      table.text('summary').nullable()
      table.integer('pages_count').nullable()
      table.integer('edition_year').nullable()
      table.string('extract_url').nullable()
      table.string('cover_url').nullable()

      table.integer('category_id').notNullable().unsigned()
      table.integer('author_id').notNullable().unsigned()
      table.integer('publisher_id').notNullable().unsigned()
      table.integer('user_id').notNullable().unsigned()

      table.foreign('category_id').references('id').inTable('categories').onDelete('CASCADE')
      table.foreign('author_id').references('id').inTable('authors').onDelete('CASCADE')
      table.foreign('publisher_id').references('id').inTable('publishers').onDelete('CASCADE')
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
