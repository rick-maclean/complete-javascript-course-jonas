//Use axios for the http requests
import axios from 'axios';
import { APIkey, proxy } from "../config";

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    // eg https://www.food2fork.com/api/get?key=YOUR_API_KEY&rId=67890
    async getRepipe() {
        // const proxy = 'https://cors-anywhere.herokuapp.com/';
        // const APIkey = 'd2b42c69bd9e70cc13ee4ad748961615';
        try {
            const searchResult = await axios(`${proxy}https://www.food2fork.com/api/get?key=${APIkey}&rId=${this.id}`);
            this.recipe = searchResult.data.recipe;
            // console.log(this.recipe);
            this.img = this.recipe.image_url;
            this.ingredients = this.recipe.ingredients;
            this.author = this.recipe.publisher;
            this.title = this.recipe.title;
            this.url = this.recipe.source_url;
        } catch (error) {
            console.log(error);
            alert('something went wrong :-(')
        }

    }

    calcTime() {
        // Assuming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

}