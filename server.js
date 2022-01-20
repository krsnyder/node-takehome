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