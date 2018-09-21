import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

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

        // do the search for recipes
        await state.search.getResults();

        // render results on UI
        clearLoader();
        // console.log(state.search.recipes);
        searchView.renderResults(state.search.recipes);
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
