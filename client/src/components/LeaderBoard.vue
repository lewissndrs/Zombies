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
          <div v-if="currentPlayer.achievements.gamesWon > 50" class="gm-icon">
              <h2>Grand Master Status 	&#128081; </h2>
              <p class="gm-details">(More than 50 games won)</p>
          </div>
          <div v-if="currentPlayer.achievements.totalPoints >= 100" class="be-icon">
              <h2> Brain Eater &#129504;</h2>
              <p class="be-details">(More than 100 brains collected)</p>
          </div>
          <div v-if="currentPlayer.achievements.totalPoints >= 500" class="zcom-icon">
            <h2> Zombie Commander &#129504;</h2>
            <p class="zcom-details">(More than 500 brains collected)</p>
          </div>
          <div v-if="currentPlayer.achievements.totalPoints >= 5000" class="zk-icon">
            <h2> Zombie King &#129504;</h2>
            <p class="zk-details">(More than 5000 brains collected)</p>
          </div>
          <div v-if="currentPlayer.achievements.totalRolls >= 100" class="zn-icon">
            <h2> ZombLand Newb 	&#129352;</h2>
            <p class="zn-details">(More than 100 die rolls)</p>
          </div>
           <div v-if="currentPlayer.achievements.totalRolls >= 500" class="zcit-icon">
            <h2> ZombLand Citizen 		&#127894;</h2>
            <p class="zcit-details">(More than 500 die rolls)</p>
          </div>
          <div v-if="currentPlayer.achievements.totalRolls >= 5000" class="ze-icon">
            <h2> ZombLand Elite &#129351;</h2>
            <p class="ze-details">(More than 5000 die rolls)</p>
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

      let array = [...this.players].sort(function(a, b){
        return b.achievements.gamesWon - a.achievements.gamesWon
      })
      if (array.length <= 5){
        this.leaderBoard = array  
      } else {
        array.length = 5
        this.leaderBoard = array
      }
      
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
    color: #870000;
  }

  .firstplace {
    background-color: yellow;
    color: #870000;
  }

  .firstplaceme {
    background-color: red;
  }

  .gm-details {
    display: none;
  }
  .gm-icon:hover .gm-details{
    display: block;
  }

  .be-details {
    display: none;
  }
  .be-icon:hover .be-details{
    display: block;
  }

  .zcom-details {
    display: none;
  }
  .zcom-icon:hover .zcom-details{
    display: block;
  }

  .zk-details {
    display: none;
  }
  .zk-icon:hover .zk-details{
    display: block;
  }

  .zn-details {
    display: none;
  }
  .zn-icon:hover .zn-details{
    display: block;
  }

  .zcit-details {
    display: none;
  }
  .zcit-icon:hover .zcit-details{
    display: block;
  }

  .ze-details {
    display: none;
  }
  .ze-icon:hover .ze-details{
    display: block;
  }

  
</style>