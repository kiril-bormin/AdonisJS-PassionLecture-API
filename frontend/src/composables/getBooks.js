import { ref } from 'vue'
import { getAllBooks } from '@/api/books'
import mapBook from '@/utils/mapBook'

export function getBooks() {
  const books = ref([])
  const loading = ref(false)
  const meta = ref(null) // va contenir les infos de pagination retournées par l'API
  const error = ref(null)

  const fetchBooks = async ({
    page = 1,
    search = '',
    category = '',
    author = '',
    publisher = '',
  } = {}) => {
    loading.value = true
    error.value = null
    try {
      const params = { page }
      if (search) params.search = search
      if (category) params.category = category
      if (author) params.author = author
      if (publisher) params.publisher = publisher

      const resp = await getAllBooks(params)
      const payload = resp.data // Adonis paginate => { meta, data }

      if (payload && payload.data) {
        books.value = payload.data.map(mapBook)
        meta.value = payload.meta
      } else {
        books.value = (Array.isArray(payload) ? payload : []).map(mapBook)
        meta.value = null
      }
    } catch (err) {
      error.value = err
      books.value = []
      meta.value = null
    } finally {
      loading.value = false
    }
  }

  return { books, loading, meta, error, fetchBooks }
}
