/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import BooksController from '#controllers/books_controller'

import { middleware } from '#start/kernel'

router.group(() => {
  router.resource('books', 'BooksController').apiOnly().use(
    ['store', 'update', 'destroy'],
    middleware.auth()
  )
  router.resource('authors', 'AuthorsController').apiOnly()
  router.resource('categories', 'CategoriesController').apiOnly()
  router.resource('publishers', 'PublishersController').apiOnly()
  router.resource('reviews', 'ReviewsController').apiOnly()
  router.resource('users', 'UsersController').apiOnly()
}).prefix('/api')
