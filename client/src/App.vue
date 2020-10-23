<template>
  <div id='app'>
    <header>
      <hgroup>
        <router-link :to='{ name: "home"}'>
          <h1>Zombie Dice</h1>
        </router-link>
      <h3>don't sue me bro</h3>
      </hgroup>

      <log-in :players='players'></log-in>
      
    </header>

    <router-view></router-view>
    
    <PortalTarget name="login"/>
  </div>
</template>

<script>
import LogIn from '@/components/LogIn.vue';
import PlayerService from '@/services/PlayerService.js';
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
    this.fetchPlayers()
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

</style>