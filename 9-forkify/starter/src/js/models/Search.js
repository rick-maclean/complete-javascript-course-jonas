//Use axios for the http requests
import axios from 'axios';
import { APIkey, proxy } from "../config";

// https://cors-anywhere.herokuapp.com/


export default class Search {
    constructor(query) {
        this.query = query;
    }

    // eg https://www.food2fork.com/api/search?key=YOUR_API_KEY&q=chicken%20breast&page=2
    async getResults() {
        // const proxy = 'https://cors-anywhere.herokuapp.com/';
        // const APIkey = 'd2b42c69bd9e70cc13ee4ad748961615';
        try {
            const searchResult = await axios(`${proxy}https://www.food2fork.com/api/search?key=${APIkey}&q=${this.query}`);
            this.recipes = searchResult.data.recipes;
            // console.log(this.recipes);
        } catch (error) {
            alert(error);
        }

    }
}