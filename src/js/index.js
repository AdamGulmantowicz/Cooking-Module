import "./../less/_module.less";
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements } from "./views/base";


const state = {};

/// Search controller
const controlSearch = async () => {
    // 1) Get query from the view
    const query = searchView.getInput();

    if (query) {
        // 2) New state object
        state.search = new Search(query);

        try{

            // 3) Prepare UI for results
            searchView.clearInput();
            // searchView.clearResults();
            console.log('pending');

            // 4) Search for recepies
            await state.search.getResults();
            console.log(state.search.results);

            // 5) Render results
            searchView.renderResults(state.search.results);

        }catch(err){
            alert('Something went wrong!');
            console.log(err);
        }
    }
};

/// Recipe controller
const controlRecipe = (recipe) => {
    // Get recipe from hash
    const label = decodeURI(window.location.hash.replace('#', ''));
    console.log(label);

    if(label){
        // Prepare UI for changes
        recipeView.clearRecipe();

        console.log(state.search.results.find(el => searchView.getHashFromURL(el.uri))===label);
        state.recipe = new Recipe(state.search.results.find(el => label===searchView.getHashFromURL(el.uri)));
        console.log(state.recipe);

        recipeView.renderRecipe(state.recipe.recipe);
    }
}


/// Control of search form
elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
})

/// Pagination control
elements.searchResultsPage.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");
    if (btn) {
      const goToPage = parseInt(btn.dataset.goto, 10);
      searchView.clearResults();
      searchView.renderResults(state.search.results, goToPage);
    }
});

/// Recipe set control

["hashchange"].forEach(event => window.addEventListener(event, controlRecipe))