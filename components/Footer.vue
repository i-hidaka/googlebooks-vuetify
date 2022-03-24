<template>
  <div>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'FooterComponent',
  setup() {
    const fixed = false
    return {
      fixed,
    }
  },
})
</script>

<style scoped></style>
