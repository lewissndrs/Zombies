const takeShot = require('./TakeShot.js')

const aITurn = function(){
  let dice = ["red", "red", "red", "yellow", "yellow", "yellow", "yellow", "yellow", "green", "green", "green", "green", "green", "green", "green"]
  let current_scores = [[], []]
  let current_dice = []

  while (current_scores[1].length < 2 && dice.length > 2){
    let data = takeShot(dice, current_dice)
    for (let brain of data[0][0]){
      current_scores[0].push(brain)
    }
    for (let shot of data[0][2]){
      current_scores[1].push(shot)
    }
    current_dice = data[0][1]
    dice = data[1]
  }

  return current_scores

}

console.log(aITurn());

