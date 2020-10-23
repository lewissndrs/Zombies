<template>
  <div id='login-popup'>
      <Portal to="login">
          <pop-up-base>
                <form class='form'>
                    <h2>Log in</h2>
                    <label for="username">Username: </label>
                    <input type="text" name='username' v-model="form.username" required>
                    <label for="password">Password</label>
                    <input type="text" name='password' v-model="form.password" required>
                    <button type="submit" @click.prevent='submitLogIn'>Log in</button>
                    <button type="submit" @click.prevent='submitNewPlayer'>Create new account</button>

                </form>
          </pop-up-base>
      </Portal>
  </div>
</template>

<script>
import {eventBus} from '@/main.js';
import PlayersService from '@/services/PlayersService.js';
import PopupBase from '@/components/PopupBase.vue';
export default {
    name: 'log-in-popup',
    data(){
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        submitLogIn: function () {
            eventBus.$emit('credentials-submitted',this.form);
            eventBus.$emit('show-pop-up',false);
        },
        submitNewPlayer: function () {
            const newPlayer = {
                name: this.form.username,
                password: this.form.password,
                achievements:{
                    totalRolls: 0,
                    totalPoints: 0,
                    gamesPlayed: 0,
                    gamesWon: 0
                }
            }
            PlayersService.postPlayer(newPlayer)
            .then( res => eventBus.$emit('player-added', res))
            .then( res => eventBus.$emit('credentials-submitted', this.form))
            .then( res => eventBus.$emit('show-pop-up',false))
        }
    },
    components: {
        'pop-up-base': PopupBase
    }

}
</script>

<style>

.form {
    background-color: white;
    padding: 20px;
}

</style>