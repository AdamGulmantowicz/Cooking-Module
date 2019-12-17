import "./../less/_module.less";
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from "./views/base";


const state = {};

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

elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
})

elements.searchResultsPage.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");
    if (btn) {
      const goToPage = parseInt(btn.dataset.goto, 10);
      searchView.clearResults();
      searchView.renderResults(state.search.results, goToPage);
    }
  });