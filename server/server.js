const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js')

MongoClient.connect('mongodb://localhost:27017')
.then((client) => {
    const db = client.db('players_hub');
    const playersCollection = db.collection('players');
    const playersRouter = createRouter(playersCollection);
    app.use('/api/players', playersRouter)
})
.catch(console.error)

app.listen(3000, function() {
    console.log(`Listening on port ${this.address().port}`)
});





