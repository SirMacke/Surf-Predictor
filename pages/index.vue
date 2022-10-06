<template>
  <div>
    <Navbar />
    <Aside :asideOpen="asideOpen" />
    <div id="grid">
      <Weather />
      <div>test</div>
    </div>
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
  created() {
    this.$nuxt.$on('aside', () => this.asideOpen = !this.asideOpen)
  }
}
</script>

<style lang="sass" scoped>
#grid
  position: relative
  display: grid
  grid-template-columns: 60% 40%
  width: 100%
  height: calc(100vh - 80px)
  top: 80px
  z-index: 10
</style>