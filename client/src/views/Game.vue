<template>
  <div id='game'>
      <game-play :player="player" :difficulty="difficulty"></game-play>
  </div>
</template>

<script>
import GamePlay from '../components/GamePlay.vue'

export default {
  name: "game",
  components: {
    'game-play': GamePlay
  },
  props:['player', 'difficulty']

}
</script>

<style>

</style>