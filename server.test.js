const request = require('supertest');
const { array } = require('yup');
const server = require('./server');

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
  // test("Should return 400 error if body doesn't include name, ingredients, and instructions")

  // Should return 400 error if recipe already exists
  // Should return 201 if post request succeeds
  // Length of recipes list should increase by 1 if successful
})








