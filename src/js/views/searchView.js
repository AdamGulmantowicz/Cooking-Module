import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => { elements.searchInput.value = ''};

export const clearResults = () => {
    elements.searchResultsList.innerHTML = '';
    elements.searchResultsPage.innerHTML = '';
}

export const limitRecipeTitle = (title, limit=17) => {
    const newTitle = [];
    if(title.length> limit) {
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        //return new title
        return `${newTitle.join(' ')}...`;
    }
    return title;
}

export const renderRecipe = recipe => {
    const markup = `
    <li class="recipe__link">
        <figure class="likes__fig">
            <img src="${recipe.image}" alt="${recipe.label}">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${limitRecipeTitle(recipe.label)}</h4>
            <p class="likes__author">${recipe.source}</p>
        </div>
    </li>
    `;
    elements.searchResultsList.insertAdjacentHTML('beforeend', markup);
}


const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev'? page-1 : page+1}>
        <span>Page ${type === 'prev'? page-1 : page+1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type==='prev'? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;

    if(pages!==1){
        if(page === 1 && pages>1){
            //Button go to the next page
            button = createButton(page, 'next');
        }else if(page< pages){
            //Both buttons
            button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}`;
        }else if(page === pages && pages > 1) {
            //Only button to previous page
            button = createButton(page, 'prev');
        }
                
        elements.searchResultsPage.insertAdjacentHTML('afterbegin', button);
    }
}

export const renderResults = (recipes, page=1, resPerPage=5) => {
    //Render results
    const start = (page-1)*resPerPage;
    const end = page*resPerPage;
    recipes.slice(start, end).forEach(item => renderRecipe(item));
 
    //Render pagination
    renderButtons(page, recipes.length, resPerPage);
}