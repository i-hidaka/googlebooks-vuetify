<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="email" label="メール" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="password" label="パスワード" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-btn color="primary" @click="signup()">ユーザー登録</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn color="secondary" to="./login">ログインページ</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from '@nuxtjs/composition-api'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
export default defineComponent({
  name: 'RegisterPage',
  setup() {
    const email = ref('')
    const password = ref('')
    const firebase: any = inject('firebase')
    const auth = getAuth(firebase)
    const signup = () => {
      createUserWithEmailAndPassword(auth, email.value, password.value).then(
        (res) => {
          console.log(res)
        }
      )
    }
    return { email, password, signup }
  },
})
</script>

<style></style>
