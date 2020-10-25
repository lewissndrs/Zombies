const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function(collection){
    const router = express.Router();

    router.get('/', (req, res) => {
        collection.find().toArray()
        .then(docs => res.json(docs))
        .catch((err) => {
            console.error(err)
            res.status(500)
            res.json({status: 500, error: error})
        })
    });

    router.get('/id/:id', (req, res) => {
        const id = ObjectID(req.params.id)
        collection.findOne({_id: id})
        .then((doc) => res.json(doc))
        .catch((err) => {
            console.error(err);
            res.status(500);
            res.json({status: 500, error: error});
        });
    });

    router.post('/', (req, res) => {
        const newPlayer = req.body;
        collection.insertOne(newPlayer)
        .then((response) => res.json(response.ops[0]))
        .catch((err) => {
            console.error(err);
            res.status(500);
            res.json({status: 500, error: error});
        });
    });

    router.put('/:id', (req, res) => {
        const id = ObjectID(req.params.id)
        const updatedPlayer = req.body
        collection.findOneAndUpdate(
            {_id: id},
            {$set: updatedPlayer},
            {returnOriginal: false}
        )
        .then((result) => res.json(result.value))
        .catch((err) => {
            console.error(err);
            res.status(500);
            res.json({status: 500, error: error});
        });
    });

    router.get('/log', (req, res) => {
        collection.findOne({log_in: true})
        .then((doc) => res.json(doc))
        .catch((err) => {
            console.error(err);
            res.status(500);
            res.json({status: 500, error: error});
        });
    });

    router.get('/name/:name', (req, res) => {
        const name = req.params.name
        collection.findOne({name: name})
        .then((doc) => res.json(doc))
        .catch((err) => {
            console.error(err);
            res.status(500);
            res.json({status: 500, error: error});
        });
    });

    return router;


}

module.exports = createRouter;