<template>
  <div id="predictor">
    <div id="container">
      <h2>Surf Predictor</h2>
      <div class="fields">
        <h3>När ska du surfa?</h3>
        <div>
          <input type="number" v-model="timeStartHour" min="0" max="23" @change="changeSail()">
          <p class="colon">:</p>
          <input type="number" v-model="timeStartMinute" min="0" max="59">
        </div>
      </div>
      <div class="fields">
        <h3>Hur länge ska du surfa?</h3>
        <div>
          <input type="number" v-model="timeDuration" min="1" max="23" @change="changeSail()">
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
  },
  async mounted() {
    this.sailSize = await $fetch(`/api/predictor?timeStartHour=${this.timeStartHour}&timeDuration=${this.timeDuration}`);
  },
  methods: {
    async changeSail() {
      this.sailSize = '';
      this.sailSize = await $fetch(`/api/predictor?timeStartHour=${this.timeStartHour}&timeDuration=${this.timeDuration}`);
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
      font-size: 1.75em

    .fields
      display: grid
      grid-template-columns: 1fr auto
      position: relative
      width: 100%
      font-size: 1.25em

      h3
        font-size: 1.25em
        font-weight: 600
        font-family: "Lato", "sans-serif"

      div
        display: flex

        p
          margin-top: 5px

        .colon
          margin: 25.5px 2px 0px 2px

        .hour
          margin-top: 27.5px
          margin-right: 7.5px

        .sail
          position: relative
          margin-right: 7.5px
          margin-top: 28px

          span
            font-size: 0.8em
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
          outline: none
          text-decoration: underline
          margin-top: 26.5px

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button
          -webkit-appearance: none
          margin: 0

        input[type=number]
          -moz-appearance: textfield

</style>