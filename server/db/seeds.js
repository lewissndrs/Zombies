use players_hub;
db.dropDatabase();

db.players.insertMany([

    {
        name: "Lewis",
        password: "password",
        achievements:{
            totalRolls: 20,
            totalPoints: 15,
            gamesPlayed: 2,
            gamesWon: 1
        }
    },
  
    {
        name: "Michael",
        password: "password",
        achievements:{
            totalRolls: 22,
            totalPoints: 10,
            gamesPlayed: 3,
            gamesWon: 0
        }
    },

    {
        name: "Cyril",
        password: "password",
        achievements:{
            totalRolls: 30,
            totalPoints: 19,
            gamesPlayed: 3,
            gamesWon: 1
        }
    }
]);


