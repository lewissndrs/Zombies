<template>
  <div id='home'>
      <button>Play Game!</button>
      <leader-board />
  </div>
</template>

<script>
import LeaderBoard from '@/components/LeaderBoard.vue';
export default {
    name: 'home',
    components: {
        'leader-board':LeaderBoard
    }
}
</script>

<style>

</style>