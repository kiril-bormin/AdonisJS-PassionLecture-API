<template>
  <h1><strong>Liste de tous les ouvrages</strong></h1>
  <div class="home">
    <div class="filters">
      <div class="recherche">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher par titre..."
          class="search-input"
          @keyup.enter="applySearch"
        />
        <button type="button" @click="applySearch">
          <img src="../assets/icons8-loupe.svg" class="loupe-recherche" />
        </button>
      </div>
      <div class="filtrer-livres">
        <h3>Filtrer par catégorie :</h3>
        <select v-model="selectedCategory" class="category-select">
          <option value="">Toutes les catégories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
      <div class="trier-livres">
        <h3>Trier par :</h3>
        <select v-model="sortOption" class="category-select">
          <option value="addedDesc">Ajoutés récemment</option>
          <option value="added">Plus anciens d'abord</option>
          <option value="title">Titre (A - Z)</option>
          <option value="titleDesc">Titre (Z - A)</option>
          <option value="year">Année (croissant)</option>
          <option value="yearDesc">Année (décroissant)</option>
        </select>
      </div>
    </div>
    <div v-if="loading">Chargement...</div>
    <div v-else class="book-list">
      <div v-for="book in books" :key="book.id" class="book-card">
        <router-link :to="{ name: 'BookDetails', params: { id: book.id } }">
          <!-- faire l'objet cliquable -->
          <img :src="book.coverImage || 'default-cover.jpg'" alt="Couverture" />
          <div class="book-info">
            <h3>{{ book.title }}</h3>
            <p><strong>Année :</strong> {{ book.publishYear }}</p>
            <p><strong>Catégorie :</strong> {{ book.category }}</p>
            <p><strong>Description :</strong> {{ book.description }}</p>
            <p class="added-book">
              <strong>Ajouté le :</strong>
              {{ book.createdAt ? new Date(book.createdAt).toLocaleDateString() : '' }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
    <div class="pagination" v-if="meta && meta.lastPage > 1">
      <button :disabled="meta.currentPage === 1" @click="goTo(meta.currentPage - 1)">
        Précédent
      </button>

      <button
        v-for="p in meta.lastPage"
        :key="p"
        :class="{ active: p === meta.currentPage }"
        @click="goTo(p)"
      >
        {{ p }}
      </button>

      <button :disabled="meta.currentPage === meta.lastPage" @click="goTo(meta.currentPage + 1)">
        Suivant
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { getBooks } from '@/composables/getBooks'

const { books, loading, meta, fetchBooks } = getBooks()
const page = ref(1)
const searchQuery = ref('')
const activeSearch = ref('')
const selectedCategory = ref('')
const sortOption = ref('addedDesc')

// TODO: fetch real categories from the API later
const categories = ref(['Science-Fiction', 'Fantasy', 'Policier', 'Romance', 'Historique'])

const load = () => {
  fetchBooks({ page: page.value, search: activeSearch.value, category: selectedCategory.value })
}

const applySearch = () => {
  activeSearch.value = searchQuery.value
  page.value = 1 // Reset page on new search
  load()
}

watch([page, selectedCategory], () => load())
onMounted(load)

function goTo(p) {
  if (p < 1) p = 1
  if (meta.value && p > meta.value.lastPage) p = meta.value.lastPage
  page.value = p
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 20px;
  font-family: 'Jaldi', sans-serif;
}
.filters {
  display: flex;
  align-items: center;
  margin: 0 20px 0 20px;
  height: 35px;
}
.filters input {
  padding: 8px;
  width: 200px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.filters h3 {
  font-size: 1rem;
  margin-right: 10px;
}
.filters select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.filtrer-livres {
  display: flex;
  align-items: center;
  margin-left: 15px;
}
.trier-livres {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.recherche {
  display: flex;
  align-items: center;
  background-color: #fdfdfd;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.recherche input {
  border: none;
  margin-right: 0;
}
button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #dbdbdb;
}

.loupe-recherche {
  width: 24px;
  height: 24px;
  display: block;
}
.home {
  font-family: 'Jaldi', sans-serif;
  padding: 10px;
  width: 1050px;
  margin: 0 auto;
}
.home a {
  text-decoration: none;
  color: black;
}
.book-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  padding: 20px;
}

.book-card {
  background: #ffffff;
  overflow: hidden;
  border: rgb(199, 199, 199) 1px solid;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
  min-height: 470px;
  width: 100%;
  border-radius: 5px;
}

.book-card img {
  display: inline;
  border-bottom: 1px solid #eee;
  width: 100%;
}

.book-info {
  padding: 0 10px 5px 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}
.book-info h3 {
  margin: 0;
  text-decoration: none;
  color: black;
}

.book-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #464646;
  text-decoration: none;
}
.book-info p:nth-child(4) {
  font-size: 0.85rem;
  color: #8d8d8d;
}
.book-info p:last-child {
  margin-top: auto;
  bottom: 0;
  font-size: 0.85rem;
  color: #8d8d8d;
}
</style>
