<template>
  <div id='winner-pop-up'>
      <Portal to="winner">
          <pop-up-base>
              <div id='message'>
                <h2>Game Over</h2>
                <h3>The Winner is {{winner.name}}</h3>
                <button @click='emitNewGame'>Play again?</button>
              </div>
          </pop-up-base>
      </Portal>
  </div>
</template>

<script>
import PopupBase from '@/components/PopupBase.vue';
import {eventBus} from '@/main.js';

export default {
    components: {
        'pop-up-base':PopupBase
    },
    props: ['winner'],
    methods: {
        emitNewGame: function () {
            eventBus.$emit('play-new-game')
        }
    }
}
</script>

<style>

#message {
    font-size: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#message > h2, #message > h3, #message > button {
    margin: 10px;
} 

#message > button {
    font-size: 20px;
}


</style>