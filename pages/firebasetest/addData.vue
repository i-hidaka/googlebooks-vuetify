<template>
  <div>
    <v-btn @click="addData">追加</v-btn>
  </div>
</template>

<script>
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
export default defineComponent({
  setup() {
    const addData = async () => {
      try {
        // pluginからfirebase 取得
        const firebase = inject('firebase')
        // firestoreを使う
        const db = getFirestore(firebase)
        const res = await addDoc(collection(db, 'tasks'), {
          id: 1,
          title: 'test',
        })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

    return { addData }
  },
})
</script>

<style></style>
