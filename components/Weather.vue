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
        <div id="table">
          <div id="info">
            <p>Tid</p>
            <p>Temperatur <span>(C)</span></p>
            <p>Nederbörd <span>(mm)</span></p>
            <p>Vind <span>(m/s)</span></p>
            <p>Vindbyar <span>(m/s)</span></p>
            <p>Vindriktning</p>
          </div>
          <div id="data" v-for="(hour, index) of weather['smhi']['1d']">
            <p>{{ new Date(hour.timestamp).getHours() }}</p>
            <p>{{ hour.temp }}°</p>
            <p>{{ hour.rain }}</p>
            <p>{{ hour.windSpeed }}</p>
            <p>{{ hour.windGust }}</p>
            <img src="/svgs/arrow-down.svg" :style="{ transform: 'rotateZ('+ hour.windDirection+'deg)'}">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let weather = (await useFetch('/api/weather')).data.value;
</script>

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
        border: none
        color: $white-2
        border-radius: 5px
        padding: 7.5px 12.5px
        margin-right: 10px
        font-size: 1em
        font-weight: bold
        transition: 0.25s
        background: rgba($white-2, 0.25)

      button:hover
        cursor: pointer
        background: rgba($white-2, 0.5)

      .selected
        background: $color-3
        color: $white-2

      .selected:hover
        background: $color-3
        color: $white-2
        border-color: $color-3

    #chart
      position: relative
      height: auto
      width: calc(100% - 20px)
      margin-top: 17.5px
      border: 10px solid rgba($white-2, 0.25)
      border-radius: 5px
      backdrop-filter: blur(10px)

      #overlay
        position: absolute
        background: $white-2
        opacity: 0.25
        width: 100%
        height: 100%
        z-index: 1
      
      #table
        position: relative
        display: flex
        margin: 0px
        overflow-y: hidden 
        z-index: 2
        border-radius: 5px

        #info
          margin: 25px 0px

          p
            font-weight: bold
            margin: 30px 15px 30px 20px
            white-space: nowrap

        #data
          position: relative
          border-left: 1px solid $white-2
          margin: 25px 0px

          p
            margin: 30px 20px
            text-align: center

          img
            position: relative
            left: 21.5px
            top: -5px
            margin: auto
            height: 30px
            object-fit: cover

      ::-webkit-scrollbar
        width: 10px
        height: 10px

      /* Track */
      ::-webkit-scrollbar-track
        background: rgba($white-2, 0.25)
        border-radius: 25px
      
      /* Handle */
      ::-webkit-scrollbar-thumb
        background: rgba($white-2, 0.75)
        border-radius: 25px

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover
        background: rgba($white-2, 1)


</style>