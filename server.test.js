const request = require('supertest');
const server = require('./server');

const BadEntries = [
  { name: "Burger" },
  { name: "Burger", ingredients: ["buns", "ground beef"] },
  { ingredients: ["buns", "ground beef"], instructions: ["cook", "serve"] },
  { name: "Burger", instructions: ["cook", "serve"] },
  { instructions: ["cook", "serve"] }
];

const goodEntry = {
  name: "Burger",
  ingredients: ["buns", "ground beef"],
  instructions: ["cook", "serve"]
};

it('sanity check', () => {
  expect(true).not.toBe(false);
});

describe('GET /recipes', () => {
  test("Should respond with a 200 status code", async () => {
    const response = await request(server).get("/recipes");
    expect(response.statusCode).toBe(200);
  });
  
  test("Should return list of recipe names", async () => {
    const response = await request(server).get("/recipes");
    const { recipeNames } = response.body;
    
    expect(recipeNames).toBeInstanceOf(Array);
  });

  test("should specify json in the content header type", async () => {
    const response = await request(server).get("/recipes");

    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
  });
});

describe('GET /recipes/details/:name', () => {
  test("Should respond with a 200 status code with valid recipe and 404 with invalid recipe", async () => {
    const validNameResponse = await request(server).get("/recipes/details/chai");
    const invalidNameResponse = await request(server).get("/recipes/details/nonsense");

    expect(validNameResponse.statusCode).toBe(200);
    expect(invalidNameResponse.statusCode).toBe(404);
  });

  test("Valid name param should return object with ingredients and number of steps", async () => {
    debugger;
    const response = await request(server).get("/recipes/details/chai");
    const { ingredients, numSteps } = response.body.details;

    expect(ingredients).toBeInstanceOf(Array);
    expect(numSteps).toEqual(expect.any(Number));
  });

  test("Should specify json in the content header type", async () => {
    const response = await request(server).get("/recipes/details/chai");

    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
  });
});

describe('POST /recipes', () => {
  // This test uses the each() method of jest
  // If running the same test multiple times with different data, you can pass the data as a parameter to .each() and then write the tests as usual.
  // Each item gets passed as the parameter to the test


  test.each(BadEntries)("Should return 400 error if body doesn't include name, ingredients, and instructions", async (entry) => {
    const response = await request(server).post('/recipes').send(entry);
    
    expect(response.statusCode).toBe(400);
  })

  test('Should return 400 error if recipe already exists', async () => {
    await request(server).post('/recipes').send(goodEntry);
    const response = await request(server).post('/recipes').send(goodEntry);

    expect(response.statusCode).toBe(400);
  })
  test("Should return 201 if post request succeeds", async () => {
    const postBody = { name: "name", ingredients: "ingredients", instructions: "instructions" };
    const response = await request(server).post('/recipes').send(postBody);

    expect(response.statusCode).toBe(201)
  })
  test("Length of recipes list should increase by 1 if successful", async () => {
    const getRecipes = await request(server).get('/recipes');
    const initialNumberOfRecipes = (getRecipes.body.recipeNames.length);
    await request(server).post('/recipes').send({
      name: "Omlette",
      ingredients: ["Eggs", "Cheese", "Veggies"],
      instructions: ["Sautee veggies", "Add eggs", "Add Cheese"]
    });
    
    const newRecipes = await request(server).get('/recipes');
    const finalNumberOfRecipes = (newRecipes.body.recipeNames.length);
    expect(finalNumberOfRecipes).toEqual(initialNumberOfRecipes + 1);
  })
})

describe('PUT /recipes/details/:name', () => {
  test("Should return 404 if recipe doesn't exist", async () => {
    const response = await request(server).get('/recipes/details/fakerecipe');
    
    expect(response.statusCode).toEqual(404);
  })
  // Should return error: Recipe does not exist
  // Should modify the resource in the db
  // Returns 204 on success
})






