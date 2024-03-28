// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [ '~/assets/css/main.css' ],
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap' }
      ]
    }
  },
  plugins: [
    '~/plugins/icons.ts'
  ],
  build: {
    transpile: [
      'oh-vue-icons'
    ]
  }
})
