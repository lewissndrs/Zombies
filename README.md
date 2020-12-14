# Zombie Dice

This project is a clone of the popular tabletop game Zombie Dice by Steve Jackson Games. The goal of this project was to produce a game where a single player could play against three AI players. Players can log in to the app, and various statistics will be saved about their gameplay. Vue framework was used for the front end, with an Express/MongoDB backend.

## Screenshots

A game in progress.
![gameplay](https://github.com/lewissndrs/Zombies/blob/main/screenshots/gameplay.jpg)

The log-in page for the app.
![login](https://github.com/lewissndrs/Zombies/blob/main/screenshots/login.jpg)

The front page with the player's stats and awards visible.
![awards](https://github.com/lewissndrs/Zombies/blob/main/screenshots/leaderboard.jpg)


## Brief

## MVP
A user should be able to:
* Create a profile which will track their play persistently.
* Log in to the app.
* Play a game of zombie dice against several computer opponents.
* See a leaderboard which will compare their wins to other players.
* Access the app through an appealing zombie-themed front-end.

## Extensions
* Add an “achievements” element which tracks player statistics and gives awardsat the end of a game. Eg. 1000 total dice rolls.
* Implement an AI library for the computer players.
* Add custom animations to the front-end for dice rolling actions.

# Setting Up
To play the game, you must first install dependencies in both the client and server folders.

    //in client
    npm install

    //in server
    npm install

Then both the front end and back end must be run simultaneously in seperate terminals.

    //in client
    npm run serve

    //in server
    npm run server:dev

Once both applications are running, go to localhost:8080 in the browser to play the game.
