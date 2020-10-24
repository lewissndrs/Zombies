<template>
  <div id='home'>
      <div class="column-filler"></div>
      <instructions :player="player"></instructions>
      <div class="column-filler"></div>
      <leader-board  :players="players" :currentPlayer="player"/>
      <div class="column-filler"></div>
      
  </div>
</template>

<script>
import LeaderBoard from '@/components/LeaderBoard.vue';
import Instructions from '../components/Instructions.vue';

export default {
    name: 'home',
    components: {
        'leader-board':LeaderBoard,
        'instructions':Instructions
    },
    props:['player', 'players']
}
</script>

<style>
  #home {
    display: grid;
    grid-template-columns: 1fr 140fr 1fr 70fr 1fr;
    
  }

  
</style>