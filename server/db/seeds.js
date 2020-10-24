use players_hub;
db.dropDatabase();

db.players.insertMany([

    {
        name: "Lewis",
        password: "password",
        achievements:{
            totalRolls: 57,
            totalPoints: 64,
            gamesPlayed: 6,
            gamesWon: 2
        },
        log_in: false
    },
  
    {
        name: "Michael",
        password: "password",
        achievements:{
            totalRolls: 49,
            totalPoints: 50,
            gamesPlayed: 8,
            gamesWon: 1
        },
        log_in: false
    },

    {
        name: "Cyril",
        password: "password",
        achievements:{
            totalRolls: 148,
            totalPoints: 122,
            gamesPlayed: 15,
            gamesWon: 3
        },
        log_in: false
    },

    {
        name: "Craig",
        password: "password",
        achievements:{
            totalRolls: 1048,
            totalPoints: 763,
            gamesPlayed: 85,
            gamesWon: 5
        },
        log_in: false
    },

    {
        name: "Steve",
        password: "password",
        achievements:{
            totalRolls: 5,
            totalPoints: 15,
            gamesPlayed: 1,
            gamesWon: 1
        },
        log_in: false
    },

    {
        name: "Cruella",
        password: "password",
        achievements:{
            totalRolls: 9786,
            totalPoints: 8888,
            gamesPlayed: 1000,
            gamesWon: 71
        },
        log_in: false
    },

    {
        name: "Snuffles",
        password: "password",
        achievements:{
            totalRolls: 103,
            totalPoints: 120,
            gamesPlayed: 11,
            gamesWon: 4
        },
        log_in: false
    },

    {
        name: "Mr T",
        password: "password",
        achievements:{
            totalRolls: 11290,
            totalPoints: 7164,
            gamesPlayed: 897,
            gamesWon: 21
        },
        log_in: false
    }

]);


