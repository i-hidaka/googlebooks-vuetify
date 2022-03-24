<template>
  <div>
    <!-- input -->
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="keyword" label="本のタイトルを検索" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-btn color="primary" @click="search()">検索する</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn color="secondary" to="/book">一覧に戻る</v-btn>
      </v-col>
    </v-row>
    <div v-if="error" class="mt-4">検索結果はありませんでした</div>
    <v-row class="mt-5">
      <v-col v-for="(book, i) of searchResult" :key="i" cols="12" md="6">
        <v-card class="card mx-auto mb-4">
          <v-row>
            <v-col cols="4"><v-img :src="book.image"></v-img> </v-col>
            <v-col cols="8">
              <v-card-title>{{ book.title }}</v-card-title>
              {{ book.description }}
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  color="indigo"
                  @click="addBook(book)"
                >
                  <v-icon>mdi-plus</v-icon>
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
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SearchPage',
  setup(_props, context) {
    const { $axios } = useContext()
    // GoogleBooksAPIのURL
    const baseURL = 'https://www.googleapis.com/books/v1/volumes'
    // 検索ワード
    const keyword = ref('')
    // 本のタイプ指定
    type Book = {
      title: String
      image: String
      description: String
    }
    // 本情報
    const searchResult = ref([] as Array<Book>)

    /**
     * 検索する.
     */
    const error = ref(false)
    const search = async () => {
      searchResult.value = []
      error.value = false
      try {
        const res = await $axios.get(baseURL, {
          params: {
            q: keyword.value,
            maxResults: 40,
          },
        })
        for (const book of res.data.items) {
          const title = book.volumeInfo.title
          const img = book.volumeInfo.imageLinks
          const description = book.volumeInfo.description
          searchResult.value.push({
            title: title || '',
            image: img ? img.thumbnail : '',
            description: description ? description.slice(0, 40) : '',
          })
        }
      } catch (e) {
        error.value = true
      }
    }
    // 親に（book.vue）に発火
    const addBook = (book: Book) => {
      context.emit('add-book-list', book)
    }
    return { keyword, searchResult, search, error, addBook }
  },
})
</script>

<style>
.result {
  margin-top: 10px;
}
.card {
  height: 300px;
}
</style>
