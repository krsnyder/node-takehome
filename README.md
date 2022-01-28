### Back-End Assessment

The goal of this assessment is to test your backend development skills. The objective is to write a simple JSON API.

The assessment will be graded based on the following criteria (so it is good practice to keep these categories in mind while completing this practice assessment):

- Correctness: Is your solution complete and does it pass different test cases?
- Code Organization, Readability, & Maintainability: Is your code easy to read and
  well organized?
- Code Performance: Is your code efficient? Did you use appropriate data
  structures?
- Best Practices: Did you utilize good programming practices (write unit tests,
  avoid anti-patterns)? Did you show a good grasp of your language/framework of
  choice?

## Part 1
Build a GET route that returns all recipe names with status code 200.

## Part 2
Build a GET route that takes a recipe name as a string param. Return the ingredients and the number of steps in the recipe as JSON
If the recipe does NOT exist, return status code 404 with the error message "Recipe does not exist"

## Part 3
Add a POST route that can add additional recipes in the existing format to the backend with support for the above routes.
Returns 201 status with no response body. If the recipe already exists, return a 400 error with the message "Recipe already exists"

## Part 4
Add a PUT route that can update existing recipes. Successful request returns a 204 code with no response body.
If the recipe doesn't exist, return status code 404 with the error message "Recipe does not exist"
