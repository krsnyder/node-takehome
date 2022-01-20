const request = require('supertest');
const { array } = require('yup');
const server = require('./server');

const entries = [
  { name: "Burger" },
  { name: "Burger", ingredients: ["buns", "ground beef"] },
  { ingredients: ["buns", "ground beef"], instructions: ["cook", "serve"] },
  { name: "Burger", instructions: ["cook", "serve"] },
  { instructions: ["cook", "serve"] }
];

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
  test("Should respond with a 200 status code with any name given", async () => {
    const validNameResponse = await request(server).get("/recipes/details/chai");
    const invalidNameResponse = await request(server).get("/recipes/details/nonsense");

    expect(validNameResponse.statusCode).toBe(200);
    expect(invalidNameResponse.statusCode).toBe(200);
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
  test.each(entries)("Should return 400 error if body doesn't include name, ingredients, and instructions", async (entry) => {
    const response = await request(server).post('/recipes').send(entry);
    expect(response.statusCode).toBe(400);
  })

  test('Should return 400 error if recipe already exists', async () => {
    const postRecipe = { name: "some food", ingredients: "some stuff", instructions: "more stuff" };
    await request(server).post('/recipes').send(postRecipe);
    const response = await request(server).post('/recipes').send(postRecipe);
    expect(response.statusCode).toBe(400);
  })
  // Should return 201 if post request succeeds
  // Length of recipes list should increase by 1 if successful
})








