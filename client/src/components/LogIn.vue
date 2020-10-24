<template>
  <div id='log-in'>
        <a @click.prevent='showPopup = true' v-if="loggedIn === false" href="" class="anchor">Log in/register</a>
        <p v-if="loggedIn ===true">Hello {{player.name}}</p>
        <p v-if="loggedIn ===true" @click.prevent='logOut' class="anchor">Log out</p>

        <log-in-popup
        v-if="showPopup">
        
        </log-in-popup>
  </div>
</template>

<script>
import LogInPopup from '@/components/LogInPopup.vue';
import {eventBus} from '@/main.js';
import PlayersService from '@/services/PlayersService.js';
export default {
    name: 'log-in',
    props: ['players', 'player'],
    components: {
        'log-in-popup': LogInPopup
    },
    data() {
        return {
            loggedIn: false,
            showPopup: false,
            loggedplayer: null
        }
    },
    mounted(){
        eventBus.$on('show-pop-up', (message) => {this.showPopup = message} )
        eventBus.$on('credentials-submitted',(form) => {
            this.logIn(form);
        })
        eventBus.$on('existing-log', (player) => {
            this.loggedIn = true
            this.loggedplayer = player
        })
        
    },
    methods: {
    logIn: function(form) {

      const index = this.players.findIndex( (player) => player.name === form.username );
      
      if (index === -1) {
        console.log('USER DOES NOT EXIST')
        this.showPopup = true
      } else {
        if (form.password === this.players[index].password) {
            this.loggedplayer = this.players[index]
            this.loggedIn = true;
            eventBus.$emit('player-logged', this.loggedplayer)
            PlayersService.updatePlayer({log_in:true}, this.loggedplayer._id)
        } else {
            console.log('PASSWORD DOES NOT MATCH')
            this.showPopup = true
        }
      }
    },
    logOut: function() {
      PlayersService.updatePlayer({log_in:false}, this.loggedplayer._id)
      .then(() => {
        eventBus.$emit('player-logged', null)
        this.loggedplayer = null;
        this.loggedIn = false;
      })
      
    }
    }
}
</script>

<style>

</style>