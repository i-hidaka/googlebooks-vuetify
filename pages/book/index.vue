<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-btn color="primary" to="/book/search">検索する</v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn color="error" @click="deleteLocalStorage">削除する</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="book of books" :key="book.id" cols="12" md="6">
        <v-card class="mt-2">
          <v-row>
            <v-col cols="4">
              <v-img :src="book.image"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-title>{{ book.title }}</v-card-title>
              読んだ日：{{ book.readDate }} 感想：{{ book.memo }}
              <v-card-actions>
                <v-btn
                  :to="'book/edit/' + book.id"
                  color="indigo"
                  fab
                  small
                  dark
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BookIndex',
  setup(_props, context) {
    const books = ref()
    onMounted(() => {
      books.value = JSON.parse(String(localStorage.getItem('books')))
    })
    /**
     * book.vueに発火.
     */
    const deleteLocalStorage = () => {
      context.emit('delete-local-storage')
    }

    return { books, deleteLocalStorage }
  },
})
</script>

<style></style>
