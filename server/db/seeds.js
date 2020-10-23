use players_hub;
db.dropDatabase();

db.players.insertMany([

    {
        name: "Lewis",
        password: "password",
        achievements:{
            totalRolls: 20,
            totalPoints: 18,
            gamesPlayed: 4,
            gamesWon: 3
        }
    },
  
    {
        name: "Michael",
        password: "password",
        achievements:{
            totalRolls: 22,
            totalPoints: 15,
            gamesPlayed: 3,
            gamesWon: 3
        }
    },

    {
        name: "Cyril",
        password: "password",
        achievements:{
            totalRolls: 30,
            totalPoints: 19,
            gamesPlayed: 3,
            gamesWon: 2
        }
    },

    {
        name: "Craig",
        password: "password",
        achievements:{
            totalRolls: 60,
            totalPoints: 32,
            gamesPlayed: 6,
            gamesWon: 5
        }
    }

]);


