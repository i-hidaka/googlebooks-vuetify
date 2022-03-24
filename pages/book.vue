<template>
  <div>
    <!-- bookフォルダの内容が入る（このファイル名と対象のフォルダ名が同じ必要がある） -->
    <nuxt-child @add-book-list="addBook" />
    {{ books }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BookPage',
  setup() {
    type Book = {
      title: String
      image: String
      description: String
    }
    const books = ref([] as Array<Book>)
    
    const addBook = (e: Book) => {
      books.value.push(e)
    }
    return { books, addBook }
  },
})
</script>

<style scoped></style>
