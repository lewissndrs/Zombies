<template>
  <div id='login-popup'>
      <Portal to="login">
          <pop-up-base>
                <form class='form'>
                    <h2>Log in</h2>
                    <label for="username">Username: </label>
                    <input type="text" name='username' v-model="form.username" required>
                    <label for="password">Password</label>
                    <input :type="createNew ? 'text' : 'password'" name='password' v-model="form.password" required>
                    <label for="repeatPassword" v-if="createNew">Repeat Password</label>
                    <input type="text" name='repeatPassword' v-model="form.repeatPassword" v-if="createNew">
                    <button v-if="!createNew" type="submit" @click.prevent='submitLogIn'>Log in</button>
                    <button v-if="!createNew" type="submit" @click.prevent='createPlayer'>Create New Account</button>
                    <button v-if="createNew" type="submit" @click.prevent='submitNewPlayer'>Create new account</button>
                    <button v-if="createNew" type="submit" @click.prevent='existingLogIn'>Log in to existing</button>
                    <p v-if="errorMessage">{{this.errorMessage}}</p>
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
                password: '',
                repeatPassword: ''
            },
            createNew: false,
            errorMessage: ''
        }
    },
    methods: {
      submitLogIn: function () {
        if (this.form.username && this.form.password){
          eventBus.$emit('show-pop-up',false);
          eventBus.$emit('credentials-submitted',this.form);
        } else {
          this.errorMessage="Please enter both a username and password";
        }
      },
      submitNewPlayer: function () {
        if (this.form.username && this.form.password && this.form.repeatPassword){
          if (this.form.password === this.form.repeatPassword){
            PlayersService.checkUsernameUsed(this.form.username)
            .then(res => {
              if (!res){
                const newPlayer = {
                  name: this.form.username,
                  password: this.form.password,
                  achievements:{
                    totalRolls: 0,
                    totalPoints: 0,
                    gamesPlayed: 0,
                    gamesWon: 0
                  },
                  log_in:true
                }
                PlayersService.postPlayer(newPlayer)
                .then( res => eventBus.$emit('player-added', res))
                .then( res => eventBus.$emit('credentials-submitted', this.form))
                .then( res => eventBus.$emit('show-pop-up',false))
              } else {
                this.errorMessage = "I'm sorry, that username has already been taken."
                this.form.username = ''
                this.form.password = ''
                this.form.repeatPassword = ''
              }
            })
          } else {
            this.errorMessage = "You've not copied your password correctly, please try again";
          }
        } else {
          this.errorMessage = "You must enter a username and password";
        }
      },
      createPlayer: function(){
        this.createNew = true
      },
      existingLogIn: function(){
        this.createNew = false
      }
    },
    components: {
      'pop-up-base': PopupBase
    },
    mounted() {
      eventBus.$on('login-error', (message) => {
        this.errorMessage = message
        this.form.password = ""
      })
    }

}
</script>

<style>

.form {
    background: linear-gradient(to top, #870000, #190a05);
    padding: 20px;
}


</style>