<template>
  <div id='app'>
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
    <PortalTarget name="winner"/>

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

@import url('https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap');

* {
  margin: 0;
}

#app {
  font-family: 'Syne mono', monospace;
  background-image: linear-gradient(rgb(168, 167, 167), rgb(102, 101, 101)), url("https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2020/10/CoD-Halloween-Warzone-796x417.jpg");
  background-blend-mode: multiply;
  background-repeat: no-repeat;
  background-size: 185%;
  background-position: 65% 35%;
  color: yellowgreen;
  text-shadow: darkseagreen 1px 0 3px;
}

header {
  display: flex;
  justify-content: space-between;
  background: linear-gradient(to top, #870000, #190a05);
  color: yellowgreen;
  padding: 20px 50px 20px 100px;
}
footer {
  display: flex;
  justify-content: center;
  font-size: 32px;
  background-color: #870000;
  color: white;
  margin-top: 10%;
}

.column-filler {
  background-color: #870000;
}

.routers {
  margin: 0 20px;
  min-height: 670px;
}

.anchor {
  color: yellowgreen;
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

input, button {
    background: transparent;
    border: 1px solid #adff2f;
    color: greenyellow;
    padding: 2px;
    margin: 2px;
    font-family: 'Syne Mono',monospace;
}

button:hover {
  background: greenyellow;
  color: #870000
}

@media only screen and (max-width: 850px) {
  
  #app {
  background: #3C3B3F;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #605C3C, #3C3B3F);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #605C3C, #3C3B3F); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

}


</style>