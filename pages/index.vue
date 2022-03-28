<template>
  <div></div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  useRouter,
} from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'IndexPage',
  setup() {
    const router = useRouter()
    onBeforeMount(() => {
      router.push('/book')
    })
    return {}
  },
})
</script>
