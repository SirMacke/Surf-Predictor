import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Surf Predictor',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          charset: 'utf-8'
        },
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
        {
          name: 'keywords',
          content: ''
        },
        {
          name: 'author',
          content: 'Surf Predictor'
        },
        {
          name: 'application-name',
          content: 'Surf Predictor'
        },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge'
        },
        {
          name: 'og:title',
          content: 'Surf Predictor'
        },
        {
          name: 'og:description',
          content: ''
        },
        {
          name: 'og:type',
          content: 'website'
        },
        {
          name: 'og:url',
          content: ''
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@import "@/assets/sass/variables.sass"'
        },
      },
    },
  },
  nitro: {
    plugins: [
      "~/server/index.js"
    ]
  },
  buildModules: [
    ['@nuxt-modules/compression', {
      algorithm: 'brotliCompress'
    }]
  ],
  optimization: {
    splitChunks: {
      maxSize: 300000
    }
  },
});
