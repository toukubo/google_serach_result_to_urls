require('dotenv').config(); // Use if you are using a .env file
const axios = require('axios');

async function performSearch(query, numResults = 10) {
  try {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
            key: process.env.api_key,
        cx: "04bf9c6ac5c13410c",
        q: query,
        num: 10, // Number of search results to return.
      },
    });

    return response.data; // Returns the JSON response data

  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error Data:", error.response.data);
      console.error("Error Status:", error.response.status);
      console.error("Error Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }
    throw error; // Re-throw the error so the caller can handle it.
  }
}


// Replace with your actual API key, Search Engine ID, and query.
// const apiKey = process.env.API_KEY;  // Or directly provide your API Key
// const searchEngineId = process.env.SEARCH_ENGINE_ID; // Or directly provide your Search Engine ID.
const query = '日本で最も利用されているLLM';
// const numberOfResults = 10;

performSearch( query)
  .then(data => {
    // Handle the search results
     if (data.items) {
        data.items.forEach((item, index) => {
            // console.log(`Result ${index + 1}:`);
            // console.log(`  Title: ${item.title}`);
            console.log(`${item.link}`);
            // console.log(`  Snippet: ${item.snippet}`);
            // console.log("---");
        });

    } else {
      console.log("No results found.");
    }
  })
  .catch(error => {
    //Handle error - already logged in the performSearch function
    console.error("An error occurred during the search.");
  });

