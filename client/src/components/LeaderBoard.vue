<template>
  <div id='leaderboard' v-if="players">
      <button v-on:click="displayLeaderBoard" v-if="!topPlayers">Show Leader Board</button> 
      <button v-on:click="displayStats" v-if="topPlayers">Show My Stats</button>
      <table class="leaderboard-table" v-if="topPlayers">
        <tr v-if="topPlayers">
          <th>Name</th>
          <th>Wins</th>
          <th>Total Brains</th>
        </tr>
        <tr v-for="(player, index) in leaderBoard" :key="index" :class="[index===0 && player===currentPlayer ? 'firstplaceme' : 'notfirstplaceme', player===currentPlayer ? 'itsme' : 'itsnotme', index===0 ? 'firstplace' : 'notfirstplace']">
          <td>{{player.name}}</td>
          <td class="incenter">{{player.achievements.gamesWon}}</td>
          <td class="incenter">{{player.achievements.totalPoints}}</td>
        </tr>
      </table>
      <div id="myStats" v-if="!topPlayers && currentPlayer">
        <h2>{{currentPlayer.name}}</h2>
        <tr>
          <td>Games Played: </td>
          <th>{{currentPlayer.achievements.gamesPlayed}}</th>
        </tr>
        <tr>
          <td>Games Won: </td>
          <th>{{currentPlayer.achievements.gamesWon}}</th>
        </tr>
        <tr>
          <td>Total Brains: </td>
          <th>{{currentPlayer.achievements.totalPoints}}</th>
        </tr>
        <tr>
          <td>Total Rolls: </td>
          <th>{{currentPlayer.achievements.totalRolls}}</th>
        </tr>
        <tr>
          <td>Win Percentage: </td>
          <th>{{Math.round((100*currentPlayer.achievements.gamesWon/currentPlayer.achievements.gamesPlayed), 2)}}&#37</th>
        </tr>
        <h4>Medals:</h4>
          <div v-if="currentPlayer.achievements.gamesWon > 50">
              <h2>Grand Master Status 	&#128081; (More than 50 games won)</h2>
          </div>
          <div v-if="currentPlayer.achievements.totalPoints >= 100 && currentPlayer.achievements.totalPoints < 499">
              <h2> Brain Eater &#129504; (More than 100 brains collected)</h2>
          </div>
          <div v-if="currentPlayer.achievements.totalPoints >= 500 && currentPlayer.achievements.totalPoints < 4999">
            <h2> Zombie Commander &#129504; (More than 500 brains collected)</h2>
          </div>
          <div v-if="currentPlayer.achievements.totalPoints >= 5000">
            <h2> Zombie King &#129504; (More than 5000 brains collected)</h2>
          </div>
          <div v-if="currentPlayer.achievements.totalRolls >= 100 && currentPlayer.achievements.totalRolls < 499">
            <h2> ZombLand Newb 	&#129352; (More than 100 die rolls)</h2>
          </div>
           <div v-if="currentPlayer.achievements.totalRolls >= 500 && currentPlayer.achievements.totalRolls < 5000">
            <h2> ZombLand Citizen 		&#127894; (More than 500 die rolls)</h2>
          </div>
          <div v-if="currentPlayer.achievements.totalRolls >= 5000">
            <h2> ZombLand Elite &#129351; (More than 5000 die rolls)</h2>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'leader-board',
  props: ['players', 'currentPlayer'],
  data() {
    return {
      leaderBoard: [],
      topPlayers: false
    }
  },
  methods: {
    displayLeaderBoard() {
      let maximum = this.players[0].achievements.gamesWon;

      let array = this.players.sort(function(a, b){
        return b.achievements.gamesWon - a.achievements.gamesWon
      })
      this.leaderBoard = array  
      this.topPlayers = true
    },
    displayStats(){
      this.topPlayers = false
    }
  }
}
</script>

<style>
  #leaderboard {
    display: flex;
    flex-direction: column;
    padding: 16px;
  }
  
  .leaderboard-table {
    font-size: 24px;
  }

  .incenter {
    text-align: center;
  }

  #myStats > h2 {
    font-size: 48px;
  }

  #myStats > h4 {
    font-size: 32px;
  }

  #myStats > tr {
    font-size: 24px;
  }

  #myStats > tr > th {
    padding: 10px 20px;
  }

  .itsme {
    background-color: greenyellow;
  }

  .firstplace {
    background-color: yellow;
  }

  .firstplaceme {
    background-color: red;
  }

  
</style>