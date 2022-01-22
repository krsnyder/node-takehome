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

module.exports = {
  verifyReqBody
}