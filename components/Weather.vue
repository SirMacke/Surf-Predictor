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
  width: 90%
  height: 100%
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)

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
        border: 2px solid #3d5a80
        color: #3d5a80
        border-radius: 5px
        padding: 5px 10px
        margin-right: 10px
        font-size: 1em
        font-weight: bold
        transition: 0.25s

      button:hover
        cursor: pointer

      .selected
        background: #3d5a80
        color: $white-2

    #chart
      position: relative
      height: 400px
      width: 99%
      margin-top: 25px
      border: 1px solid red
</style>