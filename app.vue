<template>
  <div>
    <Head>
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="sass">
html
  scroll-behavior: smooth

body
  font-family: "Lato", "sans-serif"
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: $color-1
  background-color: $white-2
  -webkit-tap-highlight-color: transparent
  margin: 0px
  
h1, h2, h3, h4, h5, h6
  font-family: "Poppins", "sans-serif"

p
  font-size: 1.1em

a
  font-size: 1.1em
</style>