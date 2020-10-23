<template>
  <div id='login-popup'>
      <Portal to="login">
          <pop-up-base>
                <form v-on:submit.prevent="submitLogIn" class='form'>
                    <p>Log in</p>
                    <label for="username">Username: </label>
                    <input type="text" name='username' v-model="form.username" required>
                    <label for="password">Password</label>
                    <input type="text" name='password' v-model="form.password" required>
                    <input type="submit">
                </form>
          </pop-up-base>
      </Portal>
  </div>
</template>

<script>
import {eventBus} from '@/main.js';
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