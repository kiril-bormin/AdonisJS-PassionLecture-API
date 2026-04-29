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

router.group(() => {
  router.resource('books', 'BooksController').apiOnly()
})
