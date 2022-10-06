<template>
  <div id="container">
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
  props: ['asideOpen']
}
</script>

<style lang="sass" scoped>
#container
  position: absolute
  height: 100vh
  width: 350px
  top: 0px
  right: 0px
  z-index: 15
  overflow: hidden

aside
  position: relative
  top: 0px
  right: 0px
  width: 300px
  height: 100%
  box-shadow: 0px 0px 50px 1px rgba(0, 0, 0, 0.2)
  z-index: 1000
  margin-left: 50px

  #main-links
    display: flex
    flex-direction: column
    margin: 0px 0px 0px 0px
    padding-top: 100px

    div
      width: 100%
      padding: 10px 0px
      margin: 0px auto 0px 0px
      font-size: 1.25em
      transition: 0.25s

      .link
        margin-left: 50px
        color: inherit
        text-decoration: none

    div:hover
      cursor: pointer
      background: rgba(0, 0, 0, 0.1)

  #extra-links
    position: absolute
    bottom: 50px
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

    div:hover
      cursor: pointer
      background: rgba(0, 0, 0, 0.1)

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