<template>
  <div v-if="player" id='game-screen'>
    <button v-if="winner" v-on:click="newGame">Play a New Game</button>
    <h2 v-if="currentRound">Current Round: {{currentRound}}</h2>
    <div id="myModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content" v-if="currentRound && !winner">
        <span class="close">&times;</span>
      <p>Round {{currentRound}} Begins</p>
      </div>
    </div>

    <h1 v-if="winner" style="color: yellowgreen">The Winner is {{winner.name}}</h1>

    <winner-pop-up v-if="winner" :winner="winner" />

    <div class="AIs">
      <ai-display v-for="(aI, index) of aIs" :key="index" :aI="aI" :currentRound="currentRound"></ai-display>
    </div>
  <div class="displayDie">
    <div class="playerDisplay">
      <h3>Player: {{player.name}}</h3>
      <p>Total Brains &#129504;: {{playerBrains}}</p>
      <div v-if="!died">Brains &#129504;: {{playerBrainsRound.length}}
        <p class="icon-list">
          <main v-for="(brain, index) of playerBrainsRound" :key="index">
            <img v-if="brain==='green'" src="@/assets/green-Brain.jpg" height="40px" width="40px">
            <img v-if="brain==='yellow'" src="@/assets/yellow-Brain.jpg" height="40px" width="40px">
            <img v-if="brain==='red'" src="@/assets/red-Brain.jpg" height="40px" width="40px">
          </main>
        </p>
      </div>
      <div v-if="died">Brains &#129504;: <b>You Died</b></div>

      <div id="myDied" class="died">
        <div class="died-content" v-if="died">
          <!-- <span class="closeDied" v-on:click="closeDead">&times;</span> -->
          <h1 class="you-died">You Died!</h1>
          <div class="image-close">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbHEok0ABPJvT6NgVFv62SXN96VX2LDJ9e0Q&usqp=CAU" alt="blank" class="dead-image"> 
            <span class="closeDied" v-on:click="closeDead">&times;</span>
          </div>
          
          <!-- <h1>You Died</h1>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbHEok0ABPJvT6NgVFv62SXN96VX2LDJ9e0Q&usqp=CAU" alt="blank">  -->
          
      </div>
      </div>
      <div>Shots &#128165;: {{playerShotsRound.length}}
        <p class="icon-list">
          <main v-for="(shot, index) of playerShotsRound" :key="index">
            <img v-if="shot==='green'" src="@/assets/green-Shot.jpg" height="40px" width="40px">
            <img v-if="shot==='yellow'" src="@/assets/yellow-Shot.jpg" height="40px" width="40px">
            <img v-if="shot==='red'" src="@/assets/red-Shot.jpg" height="40px" width="40px">
          </main>
        </p>
      </div>
      <button v-if="!currentPlayer" @click="startGame">Start Game</button>
      <button v-if="currentPlayer===player && !takingTurn" v-on:click="startTurn">Start Turn</button>
      <button v-if="takingTurn && !diceRolling" v-on:click="rollDice">Roll Dice</button>
      <button v-if="takingTurn && !diceRolling" v-on:click="endTurn">End Turn</button>
    </div>
    <div class="dice">
      <dice :colour="diceColours[0]" roll="even-roll" id="die-1"></dice>
      <dice :colour="diceColours[1]" roll="even-roll" id="die-2"></dice>
      <dice :colour="diceColours[2]" roll="even-roll" id="die-3"></dice>
    
      <!-- <ol class="die-list even-roll" :class="{ 'red':diceNumbers[0]==='red'}" data-roll="1" id="die-1">
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
      </ol> -->
    </div>
  </div>

  </div>
</template>

<script>
import AIDisplay from './AIDisplay.vue'
import GamesService from '@/services/GamesService'
import PlayersService from '@/services/PlayersService.js';
import {eventBus} from '@/main.js';
import Dice from './Dice.vue';
import YellowDice from './YellowDice.vue';
import RedDice from './RedDice.vue';
import WinnerPopUp from './WinnerPopUp.vue';
import PopupBase from '@/components/PopupBase.vue';

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
          lastRound:[],
          died:false
        },
        {
          name:"",
          brains:0,
          lastRound:[],
          died:false
        },
        {
          name:"",
          brains:0,
          lastRound:[],
          died:false
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
      diceNumbers: [0, 0, 0],
      diceColours:['yellow', 'yellow', 'yellow'],
      currentPlayer: null,
      takingTurn:false,
      died: false,
      diceRolling: false,
      winner: null,
      showPopUp: false

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
      this.diceRolling = true
      let data = GamesService.takeShot(this.diceRemaining, this.currentDice)
      this.diceColours = data[4]
      this.diceNumbers = data[3]
      // code for rolling the dice
      const dies = [...document.querySelectorAll(".die-list")];
      dies.forEach(die => {
        let index = dies.indexOf(die)
        this.toggleClasses(die);
        die.dataset.roll = this.diceNumbers[index]
          
      });
      this.playerRolls ++
      setTimeout(()=>{
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
        this.diceRolling = false
      },1500)
      
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
      else if(this.died === true){
          let modal = document.getElementById("myDied");
          modal.style.display = "block";
          let span = document.getElementsByClassName("closeDied")[2];
          window.onclick = function(event) {
            if (event.target == modal) {
            modal.style.display = "none";
            }
        }
        }

      if (this.playerBrains > 12){
        this.winner = this.currentPlayer
        this.showPopUp = true
        eventBus.$emit('game-played', [this.playerRolls, this.playerBrains, true])
      } else {
        this.players.push(this.players.shift())
        this.currentPlayer = this.players[0]
        this.playAI()
      }

      
      this.takingTurn = false
    },
    playAI(){
      while (this.currentPlayer != this.player && !this.winner){
        
        if (this.currentPlayer === "new round"){
          this.currentRound ++

          // Modal Display
          let modal = document.getElementById("myModal");
          modal.style.display = "block";
          let span = document.getElementsByClassName("close")[0];
          this.players.push(this.players.shift())
          span.onclick = function() {
            modal.style.display = "none";
          }
          window.onclick = function(event) {
            if (event.target == modal) {
            modal.style.display = "none";
            }
          }
          
          this.currentPlayer = this.players[0]
        } else {
          let data = GamesService.aITurn(this.currentPlayer.brains, this.difficulty)
          this.currentPlayer.died = false
          if (data[0] === 'died'){
            this.currentPlayer.died = true
          } else {
            this.currentPlayer.brains += data[0].length
          }
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
    },
    closeDead(){
      let modal = document.getElementById("myDied");
      modal.style.display = "none";
    }
  },
  components: {
    'ai-display': AIDisplay,
    'dice':Dice,
    'yellow-dice':YellowDice,
    'red-dice':RedDice,
    'winner-pop-up': WinnerPopUp,
    'pop-up-base':PopupBase
  },
  mounted(){
    let list = GamesService.shuffle(this.allAIs)
    this.aIs[0].name = list[0]
    this.aIs[1].name = list[1]
    this.aIs[2].name = list[2]

    eventBus.$on('show-pop-up',(message) => this.showPopUp = message)
    eventBus.$on('play-new-game', (res) => this.newGame())
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

  .icon-list {
    display: flex;
  }


  .dice {
  align-items: center;
  display: flex;
  grid-gap: 7rem;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  grid-template-rows: auto;
  justify-content: center;
  padding: 2rem;
  perspective: 800px;
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
/* .die-item {
  background-color: yellow;
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
} */
/* .dot {
  align-self: center;
  background-color: #676767;
  border-radius: 50%;
  box-shadow: inset -0.15rem 0.15rem 0.25rem rgba(0, 0, 0, 0.5);
  display: block;
  height: 1.25rem;
  justify-self: center;
  width: 1.25rem;
} */
.die-item {
  height: 100%;
  width: 100%;
}
.die-icon-item {
  box-shadow: inset -0.35rem 0.35rem 0.75rem rgba(0, 0, 0, 0.3),
    inset 0.5rem -0.25rem 0.5rem rgba(0, 0, 0, 0.15);
  display: grid;
  grid-column: 1;
  grid-row: 1;
  height: 100%;
  padding: 1rem;
  width: 100%;
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

.red {
  background-color: red;
}

.yellow {
  background-color: yellow;
}

.green {
  background-color: green;
}

.modal {
  display: none; 
  position: fixed; 
  z-index: 1; 
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); 
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  
  
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.died {
  display: none; 
  position: fixed; 
  z-index: 1; 
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); 
  
}

/* Modal Content for dead */
.died-content {
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to top, #870000, #190a05);
}

/* The Close for dead Button */
.closeDied {
  color: #aaaaaa;
  float: right;
  font-size: 48px;
  font-weight: bold;
  margin-left: 34%;
}

.closeDied:hover,
.closeDied:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.image-close {
  display: flex;
  align-items: center;
}

.you-died{
  align-self: center;
}

.dead-image{
  justify-self: center;
  margin-left: 37%;
}





  
</style>