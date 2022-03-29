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
        <v-btn color="primary" @click="login()">ログイン</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn to="./register" color="primary">会員登録</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from '@nuxtjs/composition-api'
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth'
export default defineComponent({
  name: 'RegisterPage',
  setup() {
    const email = ref('')
    const password = ref('')
    const firebase: any = inject('firebase')
    const auth = getAuth(firebase)
    const login = () => {
      signInWithEmailAndPassword(auth, email.value, password.value).then((res) => {
        console.log(res)
      })
    }
    return { email, password, login }
  },
})
</script>

<style></style>
