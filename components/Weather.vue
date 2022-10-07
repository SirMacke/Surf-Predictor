<template>
  <div id="weather">
    <div id="container">
      <div id="filter">
        <button @click="selectedButton = 'medel'" :class="{ selected: selectedButton == 'medel' }">Medel</button>
        <button @click="selectedButton = 'smhi'" :class="{ selected: selectedButton == 'smhi' }">SMHI</button>
        <button @click="selectedButton = 'hässlö'" :class="{ selected: selectedButton == 'hässlö' }">Hässlö</button>
        <button @click="selectedButton = 'klart'" :class="{ selected: selectedButton == 'klart' }">Klart</button>
      </div>
      <div id="chart">
        <div id="overlay"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedButton: 'medel'
    }
  }
}
</script>

<style lang="sass" scoped>
#weather
  position: relative
  width: 82.5%
  height: 100%
  left: 25px
  top: 50%
  transform: translateY(-50%)

  #container
    position: relative
    height: auto
    top: 45%
    transform: translateY(-50%)
    overflow: hidden

    #filter
      position: relative
      height: auto

      button
        background: none
        border: 2.5px solid $color-3
        color: $color-3
        border-radius: 5px
        padding: 5px 10px
        margin-right: 10px
        font-size: 1em
        font-weight: bold
        transition: 0.25s
        background: rgba(white, 0.25)

      button:hover
        cursor: pointer
        background: rgba(white, 0.5)

      .selected
        background: $color-3
        color: $white-2

      .selected:hover
        background: $color-3
        color: $white-2
        border-color: $color-3

    #chart
      position: relative
      height: 400px
      width: calc(100% - 10px)
      margin-top: 25px
      border: 5px solid $color-3
      border-radius: 5px

      #overlay
        background: $white-2
        opacity: 0.25
        width: 100%
        height: 100%
</style>