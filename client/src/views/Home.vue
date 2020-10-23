<template>
  <div id='home'>
      <button v-if="player" @click='gameRoute'>Play Game!</button>
      <leader-board  :players="players"/>
  </div>
</template>

<script>
import LeaderBoard from '@/components/LeaderBoard.vue';
export default {
    name: 'home',
    components: {
        'leader-board':LeaderBoard
    },
    methods: {
        gameRoute: function() {
            this.$router.push({ name: 'game' })
        }
    },
    props:['player', 'players']
}
</script>

<style>

</style>