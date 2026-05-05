/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const BooksController = () => import('#controllers/books_controller')
const AuthorsController = () => import('#controllers/authors_controller')
const CategoriesController = () => import('#controllers/categories_controller')
const PublishersController = () => import('#controllers/publishers_controller')
const ReviewsController = () => import('#controllers/reviews_controller')
const UsersController = () => import('#controllers/users_controller')

router.group(() => {
  router.resource('books', BooksController).apiOnly().use(
    ['store', 'update', 'destroy'],
    middleware.auth()
  )
  router.resource('authors', AuthorsController).apiOnly()
  router.resource('categories', CategoriesController).apiOnly()
  router.resource('publishers', PublishersController).apiOnly()
  router.resource('reviews', ReviewsController).apiOnly()
  router.resource('users', UsersController).apiOnly()
}).prefix('/api')
