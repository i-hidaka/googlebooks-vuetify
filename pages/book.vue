<template>
  <div>
    <!-- bookフォルダの内容が入る（このファイル名と対象のフォルダ名が同じ必要がある） -->
    <nuxt-child
      :books="books"
      @add-book-list="addBook"
      @update-book-info="updateBookInfo"
    />
  </div>
</template>

<script lang="ts">
import {
  onMounted,
  defineComponent,
  ref,
  useRouter,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BookPage',
  setup() {
    // 渡されてきた本の型
    type Book = {
      title: String
      image: String
      description: String
    }
    // ローカルストレージに保存する本の型
    type Books = {
      id: number
      title: String
      image: String
      description: String
      readDate: ''
      memo: ''
    }
    const STORAGE_KEY = 'books'
    const books = ref([] as Array<Books>)

    onMounted(() => {
      if (localStorage.getItem(STORAGE_KEY)) {
        const localStoragebooks = localStorage.getItem(STORAGE_KEY)
        books.value = JSON.parse(String(localStoragebooks))
      }
    })

    const router = useRouter()
    // ローカルストレージに保存する本の配列
    const addBook = (e: Book) => {
      books.value.push({
        id: books.value.length,
        title: e.title,
        image: e.image,
        description: e.description,
        readDate: '',
        memo: '',
      })

      const parsed = JSON.stringify(books.value)
      localStorage.setItem(STORAGE_KEY, parsed)
      // 追加した本のID
      const id = books.value.length - 1
      router.push(`edit/${id}`)
    }
    const updateBookInfo = (e: Books) => {
      // 渡されてきた本の情報をBooksの配列に置き換える
      books.value.splice(e.id, 1, e)
      // ローカルストレージに保存
      const parsed = JSON.stringify(books.value)
      localStorage.setItem(STORAGE_KEY, parsed)
      router.push('/book')
    }
    return { books, addBook, updateBookInfo }
  },
})
</script>

<style scoped></style>
