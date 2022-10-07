<template>
  <div id="predictor">
    <div id="container">
      <h2>Surf Predictor</h2>
      <div class="fields">
        <h3>När ska du surfa?</h3>
        <div>
          <input type="number" v-model="timeStartHour" min="0" max="23">
          <p class="colon">:</p>
          <input type="number" v-model="timeStartMinute" min="0" max="59">
        </div>
      </div>
      <div class="fields">
        <h3>Hur länge ska du surfa?</h3>
        <div>
          <input type="number" v-model="timeDuration" min="1" max="23">
          <p class="hour">h</p>
        </div>
      </div>
      <div class="fields">
        <h3>Optimal segel storlek:</h3>
        <div>
          <p class="sail">{{ sailSize }} m<span>2</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeStartHour: 12,
      timeStartMinute: 30,
      timeDuration: 1,
      sailSize: 6.5,
    }
  }
}
</script>

<style lang="sass" scoped>
#predictor
  position: relative
  width: 100%
  height: 100%
  right: 25px

  #container
    position: relative
    height: auto
    top: 45%
    transform: translateY(-50%)
    overflow: hidden

    h2
      margin-bottom: 25px

    .fields
      display: grid
      grid-template-columns: 1fr auto
      position: relative
      width: 100%
      font-size: 1.1em

      h3
        font-size: 1.1em
        font-weight: 600
        font-family: "Lato", "sans-serif"

      div
        display: flex

        .colon
          margin-top: 17.5px

        .hour
          margin-top: 19px
          margin-right: 7.5px

        .sail
          position: relative
          margin-right: 7.5px

          span
            font-size: 0.7em
            position: relative
            top: -5px
            margin-left: 1px

        input
          position: relative
          margin: auto 0px
          height: 25px
          width: 25px
          background: none
          text-align: center
          border: none
          font-size: 1em
          color: $white-2

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button
          -webkit-appearance: none
          margin: 0

        input[type=number]
          -moz-appearance: textfield

</style>