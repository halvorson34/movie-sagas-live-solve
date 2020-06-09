const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

router.get("/", (req, res) => {
  // get all movie data
  const queryText = `SELECT * FROM "movies" ORDER BY "title" ASC;`;

  pool
    .query(queryText)
    .then((responseDb) => {
      res.send(responseDb.rows);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

router.get("/details/:id", (req, res) => {
  // get single movie data
  const queryText = `SELECT * FROM "movies" WHERE "id" = $1;`;
  const movieId = req.params.id;

  pool
    .query(queryText, [movieId])
    .then((responseDb) => {
      res.send(responseDb.rows);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

router.put("/edit/:id", (req, res) => {
  const queryText = `UPDATE "movies"
  SET "title" = $1, "description" = $2
  WHERE "id" = $3;`;
  const movieId = req.params.id;
  const newMovieData = req.body;

  pool
    .query(queryText, [newMovieData.title, newMovieData.description, movieId])
    .then((responseDb) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

module.exports = router;
