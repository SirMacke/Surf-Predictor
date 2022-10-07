<template>
  <nav>
    <div id="overlay"></div>
    <div id="container">
      <NuxtLink id="home" to="/">
        <img id="logo" src="/images/logo.png" alt="Surf Predictor Logo">
        <h1>Surf Predictor</h1>
      </NuxtLink>
      <img class="menu" src="/svgs/bars-solid.svg" :class="{ menuOn: menu, menuOff: !menu }" @click="clickHandler">
    </div>
    <img class="xmark" src="/svgs/xmark.svg" :class="{ xmarkOn: !menu, xmarkOff: menu }" @click="clickHandler">
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menu: true
    };
  },
  methods: {
    clickHandler(e) {
      this.$emit("aside");
      this.menu = !this.menu;
    }
  }
};
</script>


<style lang="sass" scoped>
nav
  position: relative
  height: 80px
  width: 100%
  box-shadow: 0px 0px 25px 1px rgba(0, 0, 0, 0.1)
  z-index: 20

  #overlay
    position: absolute
    width: 100%
    height: 100%
    background: $white-2
    opacity: 0.4

  .xmark
    position: absolute
    right: 22.5px
    top: 50%
    transform: translateY(-50%)
    height: 30px
    width: 30px

  .xmark:hover
    cursor: pointer

  .xmarkOn
    animation: menuOn 0.5s forwards

  .xmarkOff
    animation: menuOff 0.5s forwards

  .xmarkOff:hover
    cursor: auto

  #container
    display: flex
    position: relative
    height: 100%
    width: 100%
    max-width: 1200px
    left: 50%
    transform: translateX(-50%)

    #home
      display: flex
      color: $color-3
      text-decoration: none

      #logo
        margin: auto 0px auto 25px
        height: 70%

      h1
        margin: auto 0px auto 10px

    .menu
      position: absolute
      right: 25px
      top: 50%
      transform: translateY(-50%)
      height: 25px
      width: 25px

    .menu:hover
      cursor: pointer

    .menuOn
      animation: menuOn 0.5s forwards

    .menuOff
      animation: menuOff 0.5s forwards

    .menuOff:hover
      cursor: auto

@keyframes menuOn
  0%
    opacity: 0
  100%
    opacity: 1

@keyframes menuOff
  0%
    opacity: 1
  100%
    opacity: 0
</style>