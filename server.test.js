const request = require('supertest');
const server = require('./server');

it('sanity check', () => {
  expect(true).not.toBe(false);
});

describe('GET /recipes', () => {
  test("Should return list of recipe names", async () => {
    const response = await request(server).get("/recipes");
    expect(response.statusCode).toBe(200);
  })
  // Should respond with a 200 status code
  // should specify json in the content header type


})