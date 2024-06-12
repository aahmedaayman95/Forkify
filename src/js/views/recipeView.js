//Recipe view
//we make different views to reduce the lines of each view
// we can do the same for model & controller
console.log('Start Of Recipe View');
import icons from 'url:../../img/icons.svg';

//third party library to convert numbers ( 0.5 => 1/2) and so on
import { Fraction } from 'fractional';
import { mark } from 'regenerator-runtime';
import View from './View.js';

// console.log(Fraction);

export class RecipeView extends View {
  //private fields.
  _parentElement = document.querySelector('.recipe');
  _errorMessage = `We couldn't find your recipe please try another one 😅😄`;
  _message = '';

  _generateMarkup() {
    return `<figure class="recipe__fig">
    <img src=${this._data.image} />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--update-servings" data-update-to="${
          this._data.servings - 1
        }">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--update-servings" data-update-to="${
          this._data.servings + 1
        }">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      
    </div>
    <button class="btn--round btn--bookmark">
     <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
          </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
     ${this._data.ingredients.map(this._generateIngredient).join('')}

    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.source}
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }
  _generateIngredient(ing) {
    // console.log(ing);
    return ` <li class="recipe__ingredient">
   <svg class="recipe__icon">
     <use href="${icons}#icon-check"></use>
   </svg>
   <div class="recipe__quantity">${
     ing.quantity ? new Fraction(ing.quantity) : ''.toString()
   }</div>
   <div class="recipe__description">
     <span class="recipe__unit">${ing.unit}</span>
     ${ing.description}
   </div>
 </li>`;
  }

  //listen to events (publisher)
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    console.log('Event is listend');
    //event delegation
    this._parentElement.addEventListener('click', function (e) {
      console.log('Update servings Click event');
      const btn = e.target.closest('.btn--tiny');
      console.log(btn);
      if (!btn) return;
      const { updateTo } = btn.dataset;
      console.log();
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerUpdateBookmark(handler) {
    console.log('Listening to bookmark event');
    //event delgation (we can add event to parent , as child elements not exist yet on the DOM)
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      console.log('Button clicked');
      console.log(btn);
      handler();
    });
  }
}

//here i export an instance from the view.
export default new RecipeView();
