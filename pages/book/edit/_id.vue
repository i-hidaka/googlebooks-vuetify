<template>
  <div>
    <v-row class="mt-5">
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-row>
            <v-col cols="4">
              <v-img :src="propbook.image"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-title>{{ propbook.title }}</v-card-title>

              読んだ日：
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Picker without buttons"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>

              メモ：
              <v-textarea v-model="propbook.memo" class="mx-2">
                {{ propbook.memo }}
              </v-textarea>
              <v-card-actions>
                <v-btn color="secondary" to="/book"> 一覧に戻る</v-btn>
                <v-btn color="info">保存する</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
  useRoute,
} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    books: { type: Array, default: () => {} },
  },
  setup(props) {
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
    const id = route.value.params.id

    const propbook = ref('')
    onMounted(() => {
      // ローカルストレージに存在していれば取り出す
      if (localStorage.getItem(STORAGE_KEY)) {
        propbook.value = JSON.parse(String(localStorage.getItem(STORAGE_KEY)))[
          id
        ]
      } else {
        propbook.value = props.books[id]
        const parsed = JSON.stringify(propbook.value)
        localStorage.setItem(STORAGE_KEY, parsed)
      }
    })

    return { propbook, date, menu }
  },
})
</script>

<style></style>
