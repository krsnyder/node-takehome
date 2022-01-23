// By creating/exporting a server object in it's own file and running it from index.js, we allow supertest to bind the API to whichever port it wants at runtime.

const express = require('express');
const server = express();
const data = require('./data.json');
const { verifyReqBody, recipeExists } = require('./middleware');

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
server.get('/recipes/details/:name', recipeExists, (req, res) => {
  const { recipeDetails } = req;
  let response = {
    "details": {
      "ingredients": recipeDetails.ingredients,
      "numSteps": recipeDetails.instructions.length
    }
  };
  res.status(200).json(response)
});

// POST route for adding new recipes
server.post('/recipes', verifyReqBody, (req, res) => {
  const { name } = req.body;
  let recipeIndex = data.recipes.findIndex(x => x.name.toLowerCase() == name.toLowerCase());
  
  if (recipeIndex != -1) {
    res.status(400).json({
      "error": "Recipe already exists"
    });
  } else {
    data.recipes.push(req.body);

    res.status(201).json();
  };

});

// PUT route for modifying recipes
server.put('/recipes/details/:name', verifyReqBody, recipeExists, (req, res) => {
  const updatedRecipe = req.body;
  const recipeIndex = data.recipes.findIndex(x => x.name.toLowerCase() == updatedRecipe.name.toLowerCase());

  data.recipes[recipeIndex] = updatedRecipe;
  res.status(204).json();
})

module.exports = server;