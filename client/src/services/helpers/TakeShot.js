const takeShot = function(dice_left, current_dice=[]){
  let results = [[], [], []]
  
  while (current_dice.length < 3){
    let dice_no = Math.floor(Math.random()*dice_left.length)
    let dice = dice_left.splice(dice_no, 1)
    current_dice.push(dice[0])
  }

  for (let dice of current_dice){
    let options;
    if (dice === "red"){
      options = ["Brain", "Walker", "Walker", "Shot", "Shot", "Shot"]
    } else if (dice === "yello"){
      options = ["Brain", "Brain", "Walker", "Walker", "Shot", "Shot"]
    } else {
      options = ["Brain", "Brain", "Brain", "Walker", "Walker", "Shot"]
    }
    let number = Math.floor(Math.random()*6)
    if (options[number] === "Brain"){
      results[0].push(dice)
    } else if (options[number] === "Walker"){
      results[1].push(dice)
    } else {
      results[2].push(dice)
    }
  }

  return [results, dice_left]
}

module.exports = takeShot;