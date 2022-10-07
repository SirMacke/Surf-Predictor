<template>
  <footer>
    <div id="overlay"></div>
    <div id="container">
      <div id="left">
        <NuxtLink to="/sessions">Sessions</NuxtLink>
        <NuxtLink to="http://www.malarvader.se/2big.html" target="_blank">Video Feed</NuxtLink>
      </div>
      <div id="right">
        <NuxtLink to="/login">Login</NuxtLink>
        <NuxtLink to="/signup">Signup</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup>

</script>

<style lang="sass" scoped>
footer
  position: relative
  height: 60px
  width: 100%
  box-shadow: 0px 0px 25px 1px rgba(0, 0, 0, 0.05)
  z-index: 10

  #overlay
    position: absolute
    width: 100%
    height: 100%
    background: $white-2
    opacity: 0.3

  #container
    display: flex
    position: relative
    height: 100%
    width: 100%
    max-width: 1200px
    left: 50%
    transform: translateX(-50%)

    #left
      position: absolute
      left: 25px
      top: 50%
      transform: translateY(-50%)
      height: auto

      a
        position: relative
        top: 50%
        transform: translateY(-50%)
        font-size: 1.1em
        color: $white-2
        text-decoration: none
        margin: auto 20px auto 0px
        transition: 0.25s

      a:hover
        color: $color-4
        
    #right
      position: absolute
      right: 25px
      top: 50%
      transform: translateY(-50%)

      a
        position: relative
        top: 50%
        transform: translateY(-50%)
        font-size: 1em
        color: $white-2
        text-decoration: none
        margin: auto 0px auto 20px
        transition: 0.25s

      a:hover
        color: $color-4
</style>