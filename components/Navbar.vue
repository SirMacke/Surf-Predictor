<template>
  <nav>
    <h1>Surf Predictor</h1>
    <img id="menu" src="/svgs/bars-solid.svg" @click="$nuxt.$emit('aside')">
  </nav>
</template>

<style lang="sass" scoped>
nav
  position: relative
  height: 80px
  width: 100%
  display: flex
  z-index: 20

  h1
    margin: auto 0px auto 25px

  #menu
    position: absolute
    right: 25px
    top: 50%
    transform: translateY(-50%)
    height: 25px
    width: 25px
    z-index: 10

  #menu:hover
    cursor: pointer
</style>