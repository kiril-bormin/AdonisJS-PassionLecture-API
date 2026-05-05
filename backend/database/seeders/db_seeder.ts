import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '../factories/user_factory.js'
import { AuthorFactory } from '../factories/author_factory.js'
import { CategoryFactory } from '../factories/category_factory.js'
import { PublisherFactory } from '../factories/publisher_factory.js'
import { BookFactory } from '../factories/book_factory.js'

export default class extends BaseSeeder {
  async run() {
    // 1. Créer un admin et quelques utilisateurs
    const admin = await UserFactory.merge({ role: 'admin', pseudo: 'admin', email: 'admin@test.com' }).create()
    const users = await UserFactory.createMany(5)
    const allUsers = [admin, ...users]

    // 2. Créer des auteurs, catégories et éditeurs
    const authors = await AuthorFactory.createMany(10)
    const categories = await CategoryFactory.createMany(5)
    const publishers = await PublisherFactory.createMany(5)

    // 3. Créer 30 livres en piochant aléatoirement dans les données créées
    for (let i = 0; i < 30; i++) {
      const user = allUsers[Math.floor(Math.random() * allUsers.length)]
      const author = authors[Math.floor(Math.random() * authors.length)]
      const category = categories[Math.floor(Math.random() * categories.length)]
      const publisher = publishers[Math.floor(Math.random() * publishers.length)]

      await BookFactory.merge({
        userId: user.id,
        authorId: author.id,
        categoryId: category.id,
        publisherId: publisher.id,
      }).create()
    }
  }
}
