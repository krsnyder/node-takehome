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