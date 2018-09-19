// Your API Details
// Current API Plan: Free
// API Key: d2b42c69bd9e70cc13ee4ad748961615

// Submitting a Query
// All search requests should be made to the search API URL.
// https://www.food2fork.com/api/search

// All recipe requests should be made to the recipe details API URL.
// https://www.food2fork.com/api/get

//Use axios for the http requests
import axios from 'axios';

// https://cors-anywhere.herokuapp.com/

// eg https://www.food2fork.com/api/search?key=YOUR_API_KEY&q=chicken%20breast&page=2
async function getResults(query) {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const APIkey = 'd2b42c69bd9e70cc13ee4ad748961615';
    try{
        const searchResult = await axios(`${proxy}https://www.food2fork.com/api/search?key=${APIkey}&q=${query}`);
        console.log(searchResult.data.recipes);
    } catch (error) {
        alert(error);
    }


}
getResults('banana bread');