// By creating/exporting a server object in it's own file and running it from index.js, we allow supertest to bind the API to whichever port it wants at runtime.

const express = require('express');
const server = express();
const data = require('./data.json')

server.use(express.json());

server.get('/recipes', (req, res) => {
  let response = {
    recipeNames: data.recipes.map(recipe => {
      return recipe.name
    })
  };
  res.status(200).json(response);
});

module.exports = server;