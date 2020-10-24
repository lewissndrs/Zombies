<template>
  <div id="instructions">

    <div id="play-game-holder" v-if="player">
      <label for="selectDifficulty">Please Select difficulty</label>
      <select v-model="difficulty" v-on:change="changeDifficulty">
        <option value=1>Easy</option>
        <option value=2>Difficult</option>
      </select>
      <button id="button-play"  @click='gameRoute'>Play Game!</button>
    </div>

    <h2>Instructions</h2>
    <h4>Step 1: The Overview</h4>
    <p>
      There are 13, 6 sided dice total. Each die has a combination of brains, shotgun blasts, and victims escaping(runners) on their side.
      There are 7 green, 5 yellow, and 3 red dice, each one having a higher shotgun blast chance. The first player to roll 13 'Brains' is
      the winner.
    </p>
    <h4>Step 2: The Dice</h4>
    <p>
      The objective is to get 13 brains, colour is irrelevant. A red die has 3 shotgun blasts, 2 runners, and 1 brain on its sides. A 
      yellow die has 2 of each. And a green die has 1 blast, 2 runners, and 3 brains.
    </p>
    <h4>Step 3: The Rules</h4>
    <p>
      Upon starting game the computer will decide the order of play. To start each turn 3 dice chosen at random, and then rolled. If a 
      brain or blast is rolled, it will be placed aside to keep track of what you have. If you roll any runners(footsteps), these will
      be rolled again if you chose to do so. If you choose to roll again, take those runners, and take further dice from the pile until you
      once again have 3, before rolling once more. You're turn will end upon choosing to do so, being shot 3 times, or having no more dice
      to pick out of the pile. If you choose to stop or you run out of dice, your current brains will be added to your running total. If
      you are shot 3 times, you are killed and lose all brains for this round. Luckily you're a zombie so you'll be resurrected in no time.
    </p>
    <h4>Step 4: Winning</h4>
    <p>
      The game ends when the first person reaches 13 brains. See if you can find all the achievements on your path to victory.
    </p>
<<<<<<< HEAD
    <div id="play-game-holder">
      <label v-if="player" for="selectDifficulty">Please Select difficulty</label>
      <select v-if="player" v-model="difficulty" v-on:change="changeDifficulty">
        <option value=1>Easy</option>
        <option value=2>Difficult</option>
      </select>
      <button id="button-play" v-if="player" @click='gameRoute'>Play Game!</button>
    </div>
=======
    
>>>>>>> d6a2f25a67d8f6f0ee5d48d62f4e8142bd0c510e
    
  </div>
</template>

<script>
import {eventBus} from '@/main.js'
export default {
  name:"instructions",
  props:['player'],
  data(){
    return {
      difficulty:1
    }
  },
  methods: {
    gameRoute: function() {
      this.$router.push({ name: 'game' })
    },
    changeDifficulty(){
      eventBus.$emit('change-difficulty', difficulty)
    }
  }
}
</script>

<style>
  #instructions {
    margin: 16px;
  }

  #instructions > p {
    text-shadow: none;
    margin-bottom: 5px;
    line-height: 1.2;
  }

  #button-play {
    margin: 50px 0;
    font-size: 32px;
    background-color: darkred;
    color: white;
    border-radius: 8px;
  }

  #play-game-holder {
    font-size: 32px;
  }

  #play-game-holder > select {
    width: 150px;
    font-size: 32px;
    margin: 16px;
  }
</style>