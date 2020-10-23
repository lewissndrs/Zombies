<template>
  <div id='game'>
      OOH HEY LOOK THERE'S A BIG OL GAME HERE
      <game-play :player="player"></game-play>
  </div>
</template>

<script>
import GamePlay from '../components/GamePlay.vue'

export default {
  name: "game",
  components: {
    'game-play': GamePlay
  },
  props:['player']

}
</script>

<style>

</style>