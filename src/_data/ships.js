// modules
const axios = require("axios");

/**
 * Get all ships from the API
 *
 * @TODO: add caching - see https://www.webstoemp.com/blog/performant-data-fetching-promises-eleventy/
 * - The API has a limit and will only return 10 ships per request
 * - Do a first request, get 10 ships and the total number of available ships
 * - Calculate how many more requests are needed to get everything
 * - Store those requests as promises and then execute them all
 * - Get the ships from all those additional request and store them
 *
 * @returns {Array} allShips - all the ships returned from the API regardless of the pagination limit
 */

async function getShips() {
  let allShips = [];
  let allPromises = [];

  try {
    // initial request
    let response = await axios.get("http://swapi.dev/api/starships");

    // get first results and push to array
    let { results, count } = response.data;
    allShips.push(...results);

    // how many more requests do we need
    let moreRequests = Math.floor(count / results.length);

    // additional requests promises
    for (let i = 0; i < moreRequests; i++) {
      let page = i + 2;
      let promise = axios.get(`http://swapi.dev/api/starships/?page=${page}`);
      allPromises.push(promise);
    }

    // execute all requests / promises
    let moreResponses = await Promise.all(allPromises);

    // get results, flatten (each promise returns an array) and push to array
    moreResponses.forEach((response) => {
      let { results } = response.data;
      allShips.push(...results);
    });

    // return all ships
    return allShips;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = getShips();
