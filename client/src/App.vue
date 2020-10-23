<template>
  <div id='app'>
    <header>
      <hgroup>
        <router-link :to='{ name: "home"}' :players="players">
          <h1>Zombie Dice</h1>
        </router-link>
      <h3>don't sue me bro</h3>
      </hgroup>

      <log-in :players='players'></log-in>
      
    </header>

    <router-view :player="player" :players="players"></router-view>
    
    <PortalTarget name="login"/>
  </div>
</template>

<script>
import LogIn from '@/components/LogIn.vue';
import PlayerService from '@/services/PlayerService.js';
import {eventBus} from '@/main.js';
export default {
  name: 'app',
  components: {
    'log-in':LogIn
  },
  data() {
    return {
      players: []
    }
  },
  mounted() {
    this.fetchPlayers();

    eventBus.$on('player-added', (player) => {
      this.players.push(player)
    })
  },
  methods: {
    fetchPlayers: function() {
      PlayerService.getPlayers()
      .then(results => this.players = results)
    }
    }
  }

</script>

<style>

header {
  display: flex;
  justify-content: space-around;
  align-content: stretch;
  background-color: darkred;
  color: white;
}

</style>