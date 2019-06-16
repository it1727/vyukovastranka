const fs = require("fs");
const Joi = require("joi");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

const movies = require("./movies.json");

/* Request: použití metody GET, URL adresy /:
   Response: HTML stránka  */
app.get("/", (req, res) => {
  res.send("<h1>Úvodní stránka - REST API</h1>");
});

/* Request: použití metody GET, URL adresy /api/movies:
   Response: výpis všech filmů ve formátu JSON  */
app.get("/api/movies", (req, res) => {
  res.send(movies);
});

/* Request: použití metody GET, URL adresy /api/movies, parametr id
   Response: výpis konkrétního filmu podle zadaného id ve formátu JSON  */
app.get("/api/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find(movie => movie.id === id);
  if (movie) {
    res.send(movie);
  } else {
    res.status(404).send("Bitva nebyla nalezena.");
  }
});

/* Request: použití metody POST, URL adresy /api/movies
   Response: výpis nového filmu   */
app.post("/api/movies", (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    const movie = {
      id: movies.length !== 0 ? movies[movies.length - 1].id + 1 : 1,
      bitva: req.body.bitva,
      vitez: req.body.vitez,
      loser: req.body.loser,
      doba: req.body.doba,
      vitezvel: req.body.vitezvel,
      loservel: req.body.loservel,
      popis: req.body.popis,
    };
    movies.push(movie);
    res.send(movie);
    writeJSON(movies, "movies.json");
  }
});

app.put("/api/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find(movie => movie.id === id);
  if (!movie) {
    res.status(404).send("Film nebyl nalezen.");
    return;
  }
  const { error } = validateMovie(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    movie.bitva = req.body.bitva;
    movie.vitez = req.body.vitez;
    movie.loser = req.body.loser;
    movie.doba = req.body.doba;
    movie.vitezvel = req.body.vitezvel;
    movie.loservel = req.body.loservel;
    movie.popis = req.body.popis;
    res.send(movie);
    writeJSON(movies, "movies.json");
  }
});

app.delete("/api/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find(movie => movie.id === id);
  if (!movie) {
    res.status(404).send("Film nebyl nalezen.");
  } else {
    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    res.send(movie);
    writeJSON(movies, "movies.json");
  }
});

app.listen(3000, () => console.log("Listening on port 3000..."));

function validateMovie(movie) {
  const schema = {
    bitva: Joi.string(),
    vitez: Joi.string(),
    loser: Joi.string(),
    doba: Joi.number(),
    vitezvel: Joi.string()
    .min(2)
    .required(),
    loservel: Joi.string()
    .min(2)
    .required(),
    state: Joi.string(),
    popis: Joi.string()
  };
  return Joi.validate(movie, schema);
}

function writeJSON(jsonData, pathToFile) {
  let data = JSON.stringify(jsonData, null, 2);
  fs.writeFile(pathToFile, data, err => {
    if (err) {
      throw err;
    } else {
      console.log("Data written to file");
    }
  });
}
