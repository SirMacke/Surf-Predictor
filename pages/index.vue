<template>
  <div>
    <Navbar @aside="asideOpen = !asideOpen" />
    <Aside :asideOpen="asideOpen" />
    <!--<img id="texture" src="/images/texture2.jpg" alt="texture">-->
    <video id="texture" width="100%" height="100%" autoplay muted><source src="/videos/texture5.mp4" autoplay></video>
    <div id="grid">
      <Weather />
      <Predictor />
    </div>
    <Footer />
  </div>
</template>

<script setup>

</script>

<script>
export default {
  data() {
    return {
      asideOpen: false
    }
  },
  mounted() {
    //document.getElementById("texture").playbackRate = .5;
  }
}
</script>

<style lang="sass" scoped>
#texture
  position: absolute
  width: 100%
  height: 100%
  object-fit: cover
  object-position: 50% 90%
  opacity: 0.75
  z-index: 5
  top: 0px

#grid
  position: relative
  display: grid
  grid-template-columns: 70% 30%
  width: 100%
  max-width: 1200px
  left: 50%
  transform: translateX(-50%)
  height: calc(100vh - 80px - 60px)
  top: 0px
  z-index: 10
</style>