const data = require('./data.json');

const verifyReqBody = (req, res, next) => {
  const { name, ingredients, instructions } = req.body;

  // Verifying that all required data is included
  if (!name || !ingredients || !instructions) {
    res.status(400).json({
      "error": "Recipe must include a name, ingredients, and instructions!"
    });
  } else {
    next();
  };
}

const recipeExists = (req, res, next) => {
  const { name } = req.params;

  let recipeDetails = (data.recipes.filter(obj => obj.name.toLowerCase() == name.toLowerCase()));

  if (recipeDetails.length == 0) {
    res.status(404).json({
      "error": "Recipe does not exist"
    });
  } else {
    req.recipeDetails = recipeDetails[0];
    next();
  }
}
module.exports = {
  verifyReqBody,
  recipeExists
}