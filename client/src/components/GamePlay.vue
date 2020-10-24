<template>
  <div v-if="player" id='game-screen'>
    <button v-if="winner" v-on:click="newGame">Play a New Game</button>
    <h2 v-if="currentRound">Current Round: {{currentRound}}</h2>
    <h3 v-if="winner">The Winner is {{winner.name}}</h3>

    <div class="AIs">
      <ai-display v-for="(aI, index) of aIs" :key="index" :aI="aI" :currentRound="currentRound"></ai-display>
    </div>
  <div class="displayDie">
    <div class="playerDisplay">
      <h3>Player: {{player.name}}</h3>
      <p>Total Brains &#129504;: {{playerBrains}}</p>
      <p v-if="!died">Brains &#129504;: {{playerBrainsRound.length}}<main v-for="(brain, index) of playerBrainsRound" :key="index">{{brain}}</main></p>
      <p v-if="died">Brains &#128165;: <b>You Died</b><main v-for="(brain, index) of playerBrainsRound" :key="index">{{brain}}</main></p>
      <p>Shots &#128165;: {{playerShotsRound.length}}<main v-for="(shot, index) of playerShotsRound" :key="index">{{shot}}</main></p>
      <p>You're holding onto: <main v-for="(dice, index) of currentDice" :key="index">{{dice}}</main></p>
      <p>Previous Roll &#127922;: <main v-for="(dice, index) of diceRolled" :key="index">{{dice}}</main></p>
      <button v-if="!currentPlayer" @click="startGame">Start Game</button>
      <button v-if="currentPlayer===player && !takingTurn" v-on:click="startTurn">Start Turn</button>
      <button v-if="takingTurn" v-on:click="rollDice">Roll Dice</button>
      <!-- <button v-if="takingTurn" v-on:click="diceRoll">Roll Dice</button> -->
      <button v-if="takingTurn" v-on:click="endTurn">End Turn</button>
    </div>
    <div class="dice">
      <ol class="die-list even-roll" data-roll="1" id="die-1">
        <li class="die-item" data-side="1">
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="2">
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="3">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="4">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="5">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="6">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
      </ol>
      <ol class="die-list odd-roll" data-roll="1" id="die-2">
        <li class="die-item" data-side="1">
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="2">
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="3">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="4">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="5">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="6">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
      </ol>
      <ol class="die-list odd-roll" data-roll="1" id="die-2">
        <li class="die-item" data-side="1">
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="2">
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="3">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="4">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="5">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="6">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
      </ol>
    </div>
  </div>

  </div>
</template>

<script>
import AIDisplay from './AIDisplay.vue'
import GamesService from '@/services/GamesService'
import PlayersService from '@/services/PlayersService.js';
import {eventBus} from '@/main.js';

export default {
  name: 'game-play',
  props:['player', 'difficulty'],
  data(){
    return {
      currentRound: null,
      allAIs:["Viper", "Casper", "Mad Max", "George", "Bobert", "Josephine", "Mary", "Cobra"],
      aIs:[
        {
          name:"",
          brains:0,
          lastRound:[]
        },
        {
          name:"",
          brains:0,
          lastRound:[]
        },
        {
          name:"",
          brains:0,
          lastRound:[]
        }
      ],
      playerBrains: 0,
      playerBrainsRound: [],
      playerShotsRound: [],
      playerRolls: 0,
      players: [],
      allDice: ["red", "red", "red", "yellow", "yellow", "yellow", "yellow", "yellow", "green", "green", "green", "green", "green", "green", "green"],
      diceRemaining: ["red", "red", "red", "yellow", "yellow", "yellow", "yellow", "yellow", "green", "green", "green", "green", "green", "green", "green"],
      currentDice:[],
      diceRolled:[],
      currentPlayer: null,
      takingTurn:false,
      died: false,
      winner: null

    }
  },
  methods: {
    startGame(){
      this.winner = null
      this.currentRound = 1
      this.players = GamesService.shuffle([this.player, this.aIs[0], this.aIs[1], this.aIs[2]])
      this.players.push("new round")
      this.currentPlayer = this.players[0]
      if (this.currentPlayer != this.player){this.playAI()}
    },
    startTurn(){
      this.takingTurn = true
      this.playerBrainsRound = []
      this.playerShotsRound = []
      this.died = false
      this.diceRemaining = [...this.allDice]
      this.rollDice()
    },
    rollDice(){
      this.playerRolls ++
      let data = GamesService.takeShot(this.diceRemaining, this.currentDice)
      this.diceRolled = data[2]
      for (let brain of data[0][0]){
        this.playerBrainsRound.push(brain)
      }
      for (let shot of data[0][2]){
        this.playerShotsRound.push(shot)
      }
      this.currentDice = data[0][1]
      this.diceRemaining = data[1]
      if (this.playerShotsRound.length > 2){
        this.died = true
        this.endTurn(true)
      }
      if (this.diceRemaining < 3){
        this.endTurn()
      }

      // code for rolling the dice
      const dies = [...document.querySelectorAll(".die-list")];
      dies.forEach(die => {
        this.toggleClasses(die);
        die.dataset.roll = 4
          
      });
    },

  toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  },
    endTurn(){
      this.takingTurn = false
      this.currentDice = []
      if (this.died === false){
        this.playerBrains += this.playerBrainsRound.length
      }
      if (this.playerBrains > 12){
        this.winner = this.currentPlayer
        eventBus.$emit('game-played', [this.playerRolls, this.playerBrains, true])
      } else {
        this.players.push(this.players.shift())
        this.currentPlayer = this.players[0]
        this.playAI()
      }
    },
    playAI(){
      while (this.currentPlayer != this.player && !this.winner){
        if (this.currentPlayer === "new round"){
          this.currentRound ++
          this.players.push(this.players.shift())
          this.currentPlayer = this.players[0]
        } else {
          let data = GamesService.aITurn(this.currentPlayer.brains, this.difficulty)
          this.currentPlayer.brains += data[0]
          this.currentPlayer.lastRound = data[1]
          if (this.currentPlayer.brains > 12){
            this.winner = this.currentPlayer
            eventBus.$emit('game-played', [this.playerRolls, this.playerBrains, false])
          } else {
            this.players.push(this.players.shift())
            this.currentPlayer = this.players[0]
          }
        }
      }
    },
    newGame(){
      window.location.reload()
    }
  },
  components: {
    'ai-display': AIDisplay
  },
  mounted(){
    let list = GamesService.shuffle(this.allAIs)
    this.aIs[0].name = list[0]
    this.aIs[1].name = list[1]
    this.aIs[2].name = list[2]
  }
}

</script>

<style>

  #game-screen > h2 {
    margin: 20px 0;
    padding: 10px;
    color: white;
    background: rgba(255, 255, 255, 0.233);

  }

  #game-screen {
    font-size: 20px;
    text-shadow: none;
  }

  .AIs {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 20px;
  }

  .playerDisplay {
    background: rgba(255, 255, 255, 0.233);
    padding: 15px;
  }

  .playerDisplay > button {
    font-size: 16px;
  }


  .dice {
  align-items: center;
  display: flex;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  grid-template-rows: auto;
  justify-items: center;
  padding: 2rem;
  perspective: 600px;
}
.die-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  height: 6rem;
  list-style-type: none;
  transform-style: preserve-3d;
  width: 6rem;
}
.even-roll {
  transition: transform 1.5s ease-out;
}
.odd-roll {
  transition: transform 1.25s ease-out;
}
.die-item {
  background-color: #fefefe;
  box-shadow: inset -0.35rem 0.35rem 0.75rem rgba(0, 0, 0, 0.3),
    inset 0.5rem -0.25rem 0.5rem rgba(0, 0, 0, 0.15);
  display: grid;
  grid-column: 1;
  grid-row: 1;
  grid-template-areas:
    "one two three"
    "four five six"
    "seven eight nine";
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 100%;
  padding: 1rem;
  width: 100%;
}
.dot {
  align-self: center;
  background-color: #676767;
  border-radius: 50%;
  box-shadow: inset -0.15rem 0.15rem 0.25rem rgba(0, 0, 0, 0.5);
  display: block;
  height: 1.25rem;
  justify-self: center;
  width: 1.25rem;
}
.even-roll[data-roll="1"] {
  transform: rotateX(360deg) rotateY(720deg) rotateZ(360deg);
}
.even-roll[data-roll="2"] {
  transform: rotateX(450deg) rotateY(720deg) rotateZ(360deg);
}
.even-roll[data-roll="3"] {
  transform: rotateX(360deg) rotateY(630deg) rotateZ(360deg);
}
.even-roll[data-roll="4"] {
  transform: rotateX(360deg) rotateY(810deg) rotateZ(360deg);
}
.even-roll[data-roll="5"] {
  transform: rotateX(270deg) rotateY(720deg) rotateZ(360deg);
}
.even-roll[data-roll="6"] {
  transform: rotateX(360deg) rotateY(900deg) rotateZ(360deg);
}
.odd-roll[data-roll="1"] {
  transform: rotateX(-360deg) rotateY(-720deg) rotateZ(-360deg);
}
.odd-roll[data-roll="2"] {
  transform: rotateX(-270deg) rotateY(-720deg) rotateZ(-360deg);
}
.odd-roll[data-roll="3"] {
  transform: rotateX(-360deg) rotateY(-810deg) rotateZ(-360deg);
}
.odd-roll[data-roll="4"] {
  transform: rotateX(-360deg) rotateY(-630deg) rotateZ(-360deg);
}
.odd-roll[data-roll="5"] {
  transform: rotateX(-450deg) rotateY(-720deg) rotateZ(-360deg);
}
.odd-roll[data-roll="6"] {
  transform: rotateX(-360deg) rotateY(-900deg) rotateZ(-360deg);
}
[data-side="1"] {
  transform: rotate3d(0, 0, 0, 90deg) translateZ(4rem);
}
[data-side="2"] {
  transform: rotate3d(-1, 0, 0, 90deg) translateZ(4rem);
}
[data-side="3"] {
  transform: rotate3d(0, 1, 0, 90deg) translateZ(4rem);
}
[data-side="4"] {
  transform: rotate3d(0, -1, 0, 90deg) translateZ(4rem);
}
[data-side="5"] {
  transform: rotate3d(1, 0, 0, 90deg) translateZ(4rem);
}
[data-side="6"] {
  transform: rotate3d(1, 0, 0, 180deg) translateZ(4rem);
}
[data-side="1"] .dot:nth-of-type(1) {
  grid-area: five;
}
[data-side="2"] .dot:nth-of-type(1) {
  grid-area: one;
}
[data-side="2"] .dot:nth-of-type(2) {
  grid-area: nine;
}
[data-side="3"] .dot:nth-of-type(1) {
  grid-area: one;
}
[data-side="3"] .dot:nth-of-type(2) {
  grid-area: five;
}
[data-side="3"] .dot:nth-of-type(3) {
  grid-area: nine;
}
[data-side="4"] .dot:nth-of-type(1) {
  grid-area: one;
}
[data-side="4"] .dot:nth-of-type(2) {
  grid-area: three;
}
[data-side="4"] .dot:nth-of-type(3) {
  grid-area: seven;
}
[data-side="4"] .dot:nth-of-type(4) {
  grid-area: nine;
}
[data-side="5"] .dot:nth-of-type(1) {
  grid-area: one;
}
[data-side="5"] .dot:nth-of-type(2) {
  grid-area: three;
}
[data-side="5"] .dot:nth-of-type(3) {
  grid-area: five;
}
[data-side="5"] .dot:nth-of-type(4) {
  grid-area: seven;
}
[data-side="5"] .dot:nth-of-type(5) {
  grid-area: nine;
}
[data-side="6"] .dot:nth-of-type(1) {
  grid-area: one;
}
[data-side="6"] .dot:nth-of-type(2) {
  grid-area: three;
}
[data-side="6"] .dot:nth-of-type(3) {
  grid-area: four;
}
[data-side="6"] .dot:nth-of-type(4) {
  grid-area: six;
}
[data-side="6"] .dot:nth-of-type(5) {
  grid-area: seven;
}
[data-side="6"] .dot:nth-of-type(6) {
  grid-area: nine;
}

.displayDie{
  display: flex;
  justify-content: space-evenly;
}


  
</style>