<template>
  <div id="aside" :style="{ 'z-index': asideOpen ? 15 : 5 }">
    <aside :class="{ asideOpen: asideOpen, asideClose: !asideOpen }">
      <div id="main-links">
        <div><a class="link" href="/">Home</a></div>
        <div><a class="link" href="/sessions">Sessions</a></div>
        <div><a class="link" href="/video-feed">Video Feed</a></div>
        <div><a class="link" href="/">Link</a></div>
        <div><a class="link" href="/">Link</a></div>
        <div><a class="link" href="/">Link</a></div>
      </div>
      <div id="extra-links">
        <div><a class="link" href="/login">Login</a></div>
        <div><a class="link" href="/signup">Signup</a></div>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  props: ['asideOpen'],
  methods: {
    clickHandler(e) {
      //this.$emit("aside");
      console.log(this.asideOpen)
    }
  }
}
</script>

<style lang="sass" scoped>
#aside
  position: absolute
  height: calc(100vh - 80px - 60px)
  width: 350px
  top: 80px
  right: 0px
  overflow: hidden
  z-index: 5

aside
  position: relative
  top: 0px
  right: 0px
  width: 300px
  height: 100%
  box-shadow: 0px 0px 50px 1px rgba(0, 0, 0, 0.2)
  margin-left: 50px
  background: rgba($white-2, 0.25)
  backdrop-filter: blur(10px)

  #main-links
    display: flex
    flex-direction: column
    margin: 0px 0px 0px 0px
    padding-top: 40px

    div
      width: 100%
      padding: 10px 0px
      margin: 0px auto 0px 0px
      font-size: 1.25em
      transition: 0.25s
      color: $white-2

      .link
        margin-left: 50px
        color: inherit
        text-decoration: none

    div:hover
      cursor: pointer
      background: rgba($color-3, 0.5)

  #extra-links
    position: absolute
    bottom: 40px
    display: flex
    flex-direction: column
    width: 100%

    div
      width: 100%
      padding: 10px 0px
      margin: 0px auto 0px 0px
      font-size: 1.1em
      opacity: 0.75
      transition: 0.25s

      .link
        margin-left: 50px
        color: inherit
        text-decoration: none
        color: $white-2

    div:hover
      cursor: pointer
      background: rgba($color-3, 0.25)

.asideOpen
  animation: asideOpen 1s forwards

.asideClose
  animation: asideClose 1s forwards

@keyframes asideOpen
  0%
    right: -300px
  100%
    right: 0px
    
@keyframes asideClose
  0%
    right: 0px
  100%
    right: -300px
</style>