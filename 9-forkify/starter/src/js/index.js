import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements } from "./views/base";

/* Global state of the app
 *- Search object
 * Current recipe object
 * Shopping list object
 * Liked recipies
 */
const state = {};

const controlSearch = async () => {
    // get query from view
    // const query = 'pizza'; //TODO
    const query = searchView.getInput();
    console.log('Inside controlSearch');

    if (query) {
        console.log('Inside controlSearch if statement');
        // get new search objest and add to state
        state.search = new Search(query);
        console.log(state.search);

        // prepare UI for results

        // do the search for recipes
        await state.search.getResults();

        // render results on UI
        console.log(state.search.recipes);
    }

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log('Inside submit');
    controlSearch();
});

elements.searchButton.addEventListener('click', e => {
    e.preventDefault();
    console.log('Inside click');
    controlSearch();
});


// const search = new Search('banana bread');
// console.log(search);
// search.getResults();
