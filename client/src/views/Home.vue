<template>
  <div id='home'>
      <button @click='gameRoute'>Play Game!</button>
      <leader-board />
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
    }
}
</script>

<style>

</style>