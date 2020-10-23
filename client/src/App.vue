<template>
  <div id='app'>
    <header>
      <hgroup>
        <router-link :to='{ name: "home"}' :players="players">
          <h1>Zombie Dice</h1>
        </router-link>
      <h3>don't sue me bro</h3>
      </hgroup>

      <div>
        <a @click.prevent='logIn' v-if="loggedIn === false" href="">Log in/register</a>
        <p v-if="loggedIn ===true">{{player.name}}</p>
      </div>  
      
    </header>

    <router-view :player="player" :players="players"></router-view>
  </div>
</template>

<script>
import PlayerService from '@/services/PlayerService.js';
export default {
  name: 'app',
  data() {
    return {
      loggedIn: false,
      player: null,
      players: []
    }
  },
  mounted() {
    this.fetchPlayers()
  },
  methods: {
    fetchPlayers: function() {
      PlayerService.getPlayers()
      .then(results => this.players = results)
    },
    // placeholder function
    logIn: function() {
      this.player = this.players[0];
      this.loggedIn = true;
    }
  }
}
</script>

<style>

</style>