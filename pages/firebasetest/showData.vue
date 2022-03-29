<template>
  <div>
    データの表示
    <div v-for="(task, index) of tasks" :key="index">
      {{ task.id }}
    </div>
  </div>
</template>

<script lang="ts">
import { collection, getDocs, getFirestore } from '@firebase/firestore'
import { defineComponent, inject, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    //   pluginからfirebase取得
    const firebase: any = inject('firebase')
    // firestoreを使う
    const db = getFirestore(firebase)
    const tasks = ref([] as any)
    const getData = async () => {
      const res = await getDocs(collection(db, 'tasks'))
      res.forEach((doc) => {
        tasks.value.push(doc.data())
      })
    }
    getData()
    return { tasks }
  },
})
</script>

<style></style>
