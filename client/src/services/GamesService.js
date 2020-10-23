export default {
  shuffle(players){
    let players_left = players.length;
    let shuffled_players = [];
    let index;
    while (players_left != 0){
      let index = Math.floor(Math.random()*players_left);
      shuffled_players.push(players[index]);
      players = players.filter((player) => player != players[index])
      players_left --
    }
    return shuffled_players
  },
  takeShot(dice_left, current_dice=[]){
    let results = [[], [], []]
    let dice_rolls = []
    while (current_dice.length < 3){
      let dice_no = Math.floor(Math.random()*dice_left.length)
      let dice = dice_left.splice(dice_no, 1)
      current_dice.push(dice[0])
    }
    for (let dice of current_dice){
      let options;
      if (dice === "red"){
        options = ["Brain", "Walker", "Walker", "Shot", "Shot", "Shot"]
      } else if (dice === "yellow"){
        options = ["Brain", "Brain", "Walker", "Walker", "Shot", "Shot"]
      } else {
        options = ["Brain", "Brain", "Brain", "Walker", "Walker", "Shot"]
      }
      let number = Math.floor(Math.random()*6)
      if (options[number] === "Brain"){
        results[0].push(dice)
        dice_rolls.push(`${dice}-Brain`)
      } else if (options[number] === "Walker"){
        results[1].push(dice)
        dice_rolls.push(`${dice}-Walker`)
      } else {
        results[2].push(dice)
        dice_rolls.push(`${dice}-Shot`)
      }
    }
    return [results, dice_left, dice_rolls]
  },
  aITurn(aIscore){
    let dice = ["red", "red", "red", "yellow", "yellow", "yellow", "yellow", "yellow", "green", "green", "green", "green", "green", "green", "green"]
    let current_scores = [[], []]
    let current_dice = []
    let rolls = []
  
    while (current_scores[1].length < 2 && dice.length > 2 && (aIscore+current_scores[0].length) < 13){
      let data = this.takeShot(dice, current_dice)
      for (let brain of data[0][0]){
        current_scores[0].push(brain)
      }
      for (let shot of data[0][2]){
        current_scores[1].push(shot)
      }
      current_dice = data[0][1]
      dice = data[1]
      rolls.push(data[2])
    }
  
    return [current_scores[0].length, rolls]
  }
}