<template>
  <div id='log-in'>
        <a @click.prevent='showPopup = true' v-if="loggedIn === false" href="">Log in/register</a>
        <p v-if="loggedIn ===true">{{player.name}} <a @click.prevent='logOut'>Log out</a></p>
        
        <log-in-popup
        v-if="showPopup">
        
        </log-in-popup>
  </div>
</template>

<script>
import LogInPopup from '@/components/LogInPopup.vue';
import {eventBus} from '@/main.js';
export default {
    name: 'log-in',
    props: ['players'],
    components: {
        'log-in-popup': LogInPopup
    },
    data() {
        return {
            loggedIn: false,
            player: null,
            showPopup: false
        }
    },
    mounted(){
        eventBus.$on('credentials-submitted',(form) => {
            this.logIn(form);
        }),
        eventBus.$on('show-pop-up', (message) => {this.showPopup = message} )
    },
    methods: {
    // placeholder function
    logIn: function(form) {
      this.player = this.players[0];
      this.loggedIn = true;
     },
     logOut: function() {
         this.player = null;
         this.loggedIn = false;
     }
    }
}
</script>

<style>

</style>