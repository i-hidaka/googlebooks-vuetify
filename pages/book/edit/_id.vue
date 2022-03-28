<template>
  <div>
    <v-row class="mt-5">
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-row>
            <v-col cols="4">
              <v-img :src="book.image"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-title>{{ book.title }}</v-card-title>

              読んだ日：
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  locale="ja-jp"
                  :day-format="(date) => new Date(date).getDate()"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>

              メモ：
              <v-textarea v-model="book.memo" class="mx-2">
                {{ book.memo }}
              </v-textarea>
              <v-card-actions>
                <v-btn color="secondary" to="/book"> 一覧に戻る</v-btn>
                <v-btn color="info" @click="updateBookInfo">保存する</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useRoute,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_props, context) {
    const route = useRoute()
    // Vuetifyカレンダーの設定
    const date = ref(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    )
    const menu = ref(false)

    // ストレージから本の情報を取り出す
    const STORAGE_KEY = 'books'
    // 追加した本のID
    const id = Number(route.value.params.id)

    const book = ref({
      id: -1,
      title: '',
      image: '',
      description: '',
      readDate: '',
      memo: '',
    })
    onMounted(() => {
      // ローカルストレージに存在していれば取り出す
      if (localStorage.getItem(STORAGE_KEY)) {
        book.value = JSON.parse(String(localStorage.getItem(STORAGE_KEY)))[id]
        // 呼んだ日付を既に保存していた場合
        if (book.value.readDate !== '') {
          date.value = book.value.readDate
        }
      }
    })
    /**
     * 
     */
    const updateBookInfo = () => {
      context.emit('update-book-info', {
        id,
        readDate: date.value,
        memo: book.value.memo,
        title: book.value.title,
        image: book.value.image,
        description: book.value.description,
      })
    }
    return { book, date, menu, updateBookInfo }
  },
})
</script>

<style></style>
