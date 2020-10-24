<template>
  <div v-if="player">
    <button v-if="winner" v-on:click="newGame">Play a New Game</button>
    <h2 v-if="currentRound">Current Round: {{currentRound}}</h2>
    <h3 v-if="winner">The Winner is {{winner.name}}</h3>

    <div class="AIs">
      <ai-display v-for="(aI, index) of aIs" :key="index" :aI="aI" :currentRound="currentRound"></ai-display>
    </div>

    <div class="playerDisplay">
      <h3>Player: {{player.name}}</h3>
      <p>Total Brains: {{playerBrains}}</p>
      <p v-if="!died">Brains: {{playerBrainsRound.length}}<main v-for="(brain, index) of playerBrainsRound" :key="index">{{brain}}</main></p>
      <p v-if="died">Brains: <b>You Died</b><main v-for="(brain, index) of playerBrainsRound" :key="index">{{brain}}</main></p>
      <p>Shots: {{playerShotsRound.length}}<main v-for="(shot, index) of playerShotsRound" :key="index">{{shot}}</main></p>
      <p>You're holding onto: <main v-for="(dice, index) of currentDice" :key="index">{{dice}}</main></p>
      <p>Previous Roll: <main v-for="(dice, index) of diceRolled" :key="index">{{dice}}</main></p>
      <button v-if="!currentPlayer" @click="startGame">Start Game</button>
      <button v-if="currentPlayer===player && !takingTurn" v-on:click="startTurn">Start Turn</button>
      <button v-if="takingTurn" v-on:click="rollDice">Roll Dice</button>
      <button v-if="takingTurn" v-on:click="endTurn">End Turn</button>
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
  .AIs {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>