export const elements = {
    searchForm: document.querySelector('.search__form'),
    searchInput: document.querySelector('.search__input'),
    searchResult: document.querySelector('.results'),
    searchResultsList: document.querySelector('.results__list'),
    searchResultsPage: document.querySelector('.results__page'),
    searchElements: document.querySelectorAll('.recipe__link'),
    recipe: document.querySelector('.recipe'),
}

export const elementStrings = {
    loader: 'loader'
}

export const renderLoader = (parent) => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}


export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader)loader.parentElement.removeChild(loader);
}