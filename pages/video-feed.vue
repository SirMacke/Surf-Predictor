<template>
  <div>
    <Navbar @aside="asideOpen = !asideOpen" />
    <Aside :asideOpen="asideOpen" />
    <video id="texture" width="100%" height="100%" autoplay muted><source src="/videos/texture5.mp4" autoplay></video>
    <div id="grid">
      <img src="http://92.43.32.201:8181/axis-cgi/mjpg/video.cgi?resolution=640x480&compression=30&clock=1&date=1&text=1&textstring=JKV%20Framnas&dummy=1668585715005" height="480" width="640" alt="JKV Video 1">
      <img src="http://92.43.32.201:8182/axis-cgi/mjpg/video.cgi?resolution=640x480&compression=30&clock=1&date=1&text=1&textstring=JKV%20Framnas&dummy=1668585715005" height="480" width="640" alt="JKV Video 2">
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      asideOpen: false
    }
  },
  mounted() {
    document.getElementById("texture").playbackRate = .5;
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
  grid-template-columns: 1fr 1fr
  width: 90vw
  max-width: 1315px
  left: 50%
  transform: translateX(-50%)
  height: calc(100vh - 80px - 60px)
  top: 0px
  z-index: 10
  grid-gap: 35px

  @media screen and (max-width: 800px)
    grid-template-columns: 1fr
    grid-template-rows: 1fr 1fr
    width: auto
    grid-gap: 0px
    margin: 25px 0px
    height: calc(100vh - 80px - 60px - 50px)

  img
    position: relative
    top: 50%
    transform: translateY(-50%)
    border-radius: 5px
    box-shadow: 0px 0px 10px 1px $color-1
    width: 100%
    aspect-ratio: 4 / 3
    height: auto

    @media screen and (max-width: 800px)
      max-width: 90vw
      width: auto
      height: auto
      max-height: 35vh
      left: 50%
      transform: translate(-50%, -50%)
</style>