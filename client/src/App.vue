<template>
  <div id='app'>
    <link href="https://fonts.googleapis.com/css2?family=Baloo+Da+2:wght@500&family=Baloo+Tammudu+2:wght@500&display=swap" rel="stylesheet">
    <header>
      <hgroup>
        <router-link :to='{ name: "home"}' class="anchor">
          <h1>Zombie Dice</h1>
        </router-link>
      <h3>don't sue me bro</h3>
      </hgroup>

      <log-in :player="player" :players='players' id="log-in"></log-in>
      
    </header>

    <router-view :player="player" :players="players" class="routers" :difficulty="difficulty"></router-view>
    
    <PortalTarget name="login"/>

    <footer>&#169 CLM.games</footer>

  </div>
</template>

<script>
import LogIn from '@/components/LogIn.vue';
import PlayersService from '@/services/PlayersService.js';
import {eventBus} from '@/main.js';
export default {
  name: 'app',
  components: {
    'log-in':LogIn
  },
  data() {
    return {
      players: [],
      player: null,
      difficulty: 1
    }
  },
  mounted() {
    this.fetchPlayers();
    this.checkLogIn();

    eventBus.$on('player-added', (player) => {
      this.players.push(player)
      this.player = player
    })
    eventBus.$on('player-logged', player => this.player = player)
    eventBus.$on('game-played', (data) => {
      let achievements = {
        totalRolls: this.player.achievements.totalRolls += data[0],
        totalPoints: this.player.achievements.totalPoints += data[1],
        gamesPlayed: this.player.achievements.gamesPlayed + 1,
      }
      achievements.gamesWon = data[2] ? this.player.achievements.gamesWon + 1 : this.player.achievements.gamesWon
      PlayersService.updatePlayer({achievements:achievements}, this.player._id)
      .then((data) => this.player = data)
      

      [this.rolls, this.playerBrains, true]
    })
    eventBus.$on('change-difficulty', difficulty => this.difficulty = difficulty)
    
  },
  methods: {
    fetchPlayers: function() {
      PlayersService.getPlayers()
      .then(results => this.players = results)
    },
    checkLogIn: function(){
      PlayersService.checkForLoggedIn()
      .then(results => {
        this.player = results
        if (results){
          eventBus.$emit('existing-log', results)
        }
      })
    }
  }
}

</script>

<style>

#app {
  font-family: 'Baloo Da 2', cursive;
  background-image: url("https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2020/10/CoD-Halloween-Warzone-796x417.jpg");
  background-repeat: no-repeat;
  background-size: 100% 90%;
  color: yellowgreen;
}

header {
  display: flex;
  justify-content: space-between;
  background-color: darkred;
  color: white;
  padding: 20px 50px 20px 100px;
}
footer {
  display: flex;
  justify-content: center;
  font-size: 32px;
  background-color: darkred;
  color: white;
  margin-top: 12%;
}

.column-filler {
  background-color: darkred;
}

.routers {
  height: 780px;
  margin: 0 20px;
}

.anchor {
  color: white;
  text-decoration: underline yellow;
  cursor: pointer;
}

#log-in {
  align-self: center;
  text-align: right;
  font-size: 20px;
}

h1 {
  color: white;
}



</style>