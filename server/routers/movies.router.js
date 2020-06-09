const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

router.get('/', (req, res) => {
    // get all movie data
    const queryText = `SELECT * FROM "movies" ORDER BY "title" ASC;`;

    pool.query(queryText)
    .then((responseDb) => {
        res.send(responseDb.rows);
    })
    .catch((err) => {
        console.warn(err);
        res.sendStatus(500);
    });
});

router.get('/', (req, res) => {
    // get single movie data
};

router.put('/', (req, res) => {
    
};

module.export = router;
