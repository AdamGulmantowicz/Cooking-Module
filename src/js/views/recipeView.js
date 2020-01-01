import {elements} from './base';

export const clearRecipe = () => {
    elements.recipe.innerHTML = "";
  };

const createIngredient = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__ingredient">
            ${ingredient}
        </div>
    </li>
`;

//<div class="recipe__count">${formatCount(ingredient.count)}</div>


export const renderRecipe = (recipe, isLiked=false) => {
    const markup = `
          <figure class="recipe__fig">
              <img src="${recipe.image}" alt="${recipe.label}" class="recipe__img"/>
              <div class="recipe__background"></div>
          </figure>
          <div class="recipe__title">
            <h1 class="title-gradient--purple">
                <span>${recipe.label}</span>
            </h1>
            </div>
          <div class="recipe__details">
              <div class="recipe__info">
                  <svg class="recipe__info-icon">
                      <use href="img/icons.svg#icon-stopwatch"></use>
                  </svg>
                  <span class="recipe__info-data recipe__info-data--minutes">${
                    recipe.totalTime
                  }</span>
                  <span class="recipe__info-text"> minutes</span>
              </div>
              <div class="recipe__info">
                  <svg class="recipe__info-icon">
                      <use href="img/icons.svg#icon-man"></use>
                  </svg>
                  <span class="recipe__info-data recipe__info-data--people">${
                    recipe.yield
                  }</span>
                  <span class="recipe__info-text"> servings</span>
  
              </div>
              <button class="recipe__love btn-inline">
                  <svg class="header__likes">
                      <use href="img/icons.svg#icon-heart${isLiked? '': '-outlined'}"></use>
                  </svg>
              </button>
          </div>
  
          <div class="recipe__ingredients">
                  <ul class="recipe__ingredient-list">
                      ${recipe.ingredientLines
                        .map(el => createIngredient(el))
                        .join("")}
                  </ul>
                  <button class="btn-small btn-inline recipe__btn recipe__btn--add">
                  <svg class="search__icon">
                      <use href="img/icons.svg#icon-shopping-cart"></use>
                  </svg>
                  <span>Add to shopping list</span>
              </button>
          </div>
          <div class="recipe__directions">
              <h2 class="heading-2">How to cook it</h2>
              <p class="recipe__directions-text">
                  This recipe was carefully designed and tested by
                  <span class="recipe__by">${
                    recipe.source
                  }</span>. Please check out directions at their website.
              </p>
              <a class="btn-small btn-inline recipe__btn" href="${
                recipe.url
              }" target="_blank">
                  <span>Directions</span>
                  <svg class="search__icon">
                      <use href="img/icons.svg#icon-triangle-right"></use>
                  </svg>
  
              </a>
          </div>
      `;
  
    elements.recipe.insertAdjacentHTML("afterbegin", markup);
  };

//// Buttons for later
{/* <div class="recipe__info-buttons">
<button class="btn-tiny btn-decrease">
    <svg>
        <use href="img/icons.svg#icon-circle-with-minus"></use>
    </svg>
</button>
<button class="btn-tiny btn-increase">
    <svg>
        <use href="img/icons.svg#icon-circle-with-plus"></use>
    </svg>
</button>
</div> */}