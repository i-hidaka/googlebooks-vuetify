import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware((context) => {
  if (context.route.path==="/111") {
    context.redirect('login')
  }
})
