<template>
  <div id='leaderboard' v-if="players">
      OOH I'm A LEADERBOARD
      <button v-on:click="displayLeaderBoard">Show Leader Board</button> 
      <h3 v-for="(player, index) in leaderBoard" :key="index"> Name: {{ player.name }}  Games Won: {{ player.achievements.gamesWon }}</h3>
  </div>
</template>

<script>
export default {
  name: 'leader-board',
  props: ['players'],
  data() {
    return {
      leaderBoard: []
    }
  },

  methods: {
    displayLeaderBoard() {
      let maximum = this.players[0].achievements.gamesWon;

      let array = this.players.sort(function(a, b){
        return b.achievements.gamesWon - a.achievements.gamesWon
      })
      this.leaderBoard = array  
      return this.leaderBoard
    }
  }
}
</script>

<style>

</style>