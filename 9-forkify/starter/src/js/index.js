import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

/* Global state of the app
 *- Search object
 * Current recipe object
 * Shopping list object
 * Liked recipies
 */
const state = {};

/*
 Search Controller
 */
const controlSearch = async () => {
    // get query from view
    // const query = 'pizza'; //TODO
    const query = searchView.getInput();
    // console.log('Inside controlSearch');

    if (query) {
        console.log('Inside controlSearch if statement');
        // get new search objest and add to state
        state.search = new Search(query);
        console.log(state.search);

        // prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // do the search for recipes
            await state.search.getResults();

            // render results on UI
            clearLoader();
            // console.log(state.search.recipes);
            searchView.renderResults(state.search.recipes);
        } catch(error) {
            alert('something went wrong with getting of the search');
            clearLoader();
        }

    }

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    // console.log('Inside submit');
    controlSearch();
});

elements.searchButton.addEventListener('click', e => {
    e.preventDefault();
    // console.log('Inside click');
    controlSearch();
});

// Use event deligation to put the event handler on an element that
// exists when the page is loaded before the next/prev buttons are there.
elements.searchResPages.addEventListener('click', e => {
    console.log(e.target);
    const btn = e.target.closest('.btn-inline');
    console.log(btn);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        console.log(goToPage);
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, goToPage);
    } else {

    }
});


// const search = new Search('banana bread');
// console.log(search);
// search.getResults();

/*
 Recipe Controller
 */
// const r = new Recipe(34567);
// console.log(r);
// r.getRepipe();
const controlRecipe = async () => {
    // Get the ID from url if there is one
    const id = window.location.hash.replace('#', ''); //remove hash symbol
    console.log(id);

    if (id) {
        // prepare the UI for changes

        // create a new recipe object
        state.recipe = new Recipe(id);

        try {
            //get recipe data
            await state.recipe.getRepipe();

            // call calc time and servings
            state.recipe.calcServings();
            state.recipe.calcTime();

            // render the recipe
            console.log(state.recipe);
        } catch(error) {
            console.log(error);
            alert('Error processing recipe!');
        }



    }
};

//when the url changes because of clicking on a recipe in the list we get a hashchange
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
// ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe)); Alternate way to do multiple



