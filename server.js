// By creating/exporting a server object in it's own file and running it from index.js, we allow supertest to bind the API to whichever port it wants at runtime.

const express = require('express');
const server = express();
const data = require('./data.json')

server.use(express.json());

// GET route that returns all recipes
server.get('/recipes', (req, res) => {
  let response = {
    recipeNames: data.recipes.map(recipe => {
      return recipe.name
    })
  };
  res.status(200).json(response);
});

// GET route that takes a recipe name as a string param and returns the ingredients and number of steps
server.get('/recipes/details/:name', (req, res) => {
  const { name } = req.params;
  const recipeDetails = data.recipes.filter(x => x.name == name);
  if (recipeDetails.length == 0) {
    res.status(200).json();
  } else {
    let response = {
      "details": {
        "ingredients": recipeDetails[0].ingredients,
        "numSteps": recipeDetails[0].instructions.length
      }
    }
    
  }
});

module.exports = server;