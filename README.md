# CrossDeals (Frontend)

Frontend for the CrossDeals project.

## Usage

1. Run the backend server: `node ./src/server.js` in the backend repo.
2. Use Firefox (recommended) to open the home page: `./html/index.html`
3. Use the sign up button in the header to make an account and gain access to all functions.

## Testing

Use any web browser and navigate to `./test/test.html`.

## CI/CD

[![Netlify Status](https://api.netlify.com/api/v1/badges/fdb31c98-bc6d-471c-9767-c21b6ca30602/deploy-status)](https://app.netlify.com/projects/crossdeals/deploys)

The frontend is deployed on Netlify. Every push to a PR will make a preview build which is available in the PR's comments section. Every push to main will trigger a new deployment on the actual [website](https://crossdeals.netlify.app/html/index.html).

Backend is not hosted at this time so most functions on the live website will pop up errors.
