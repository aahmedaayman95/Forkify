//controller acts like a bridge between model and view.

'use stric';
// we need to import the images from parced files not original ones
//polyfilling ES6 features
import 'core-js/stable';
// polyfilling async await
import 'regenerator-runtime/runtime';
// console.log(icons);

//import from model to controller , we use * to import every thing from the model to the controller
import * as model from './model.js';

//recipe view import
import recipeView from './views/recipeView.js';

//Search query view import
import searchView from './views/searchView.js';

import resultsView from './views/resultVIew.js';

import paginationView from './views/paginationView.Js';

import bookmarksView from './views/bookmarksView.js';

import addRecipeView from './views/addRecipeView.js';
//config imports
import { MODAL_CLOSE_SEC } from './config.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
console.log('Start Of Recipe Controller');

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    //00-Show Spinner
    recipeView.renderSpinner();

    //01-updating recipe based on bookmarks
    bookmarksView.update(model.state.bookmarks);
    //01-Load recipe (it's async function so we need to await)
    //this function only manipulate the state and has no return
    await model.loadRecipe(id);
    // const { recipe } = model.state;
    // 02-Rendering Recipe
    console.log('Before Render');
    recipeView.render(model.state.recipe);
    console.log('After Render');
    console.log(model.state.recipe);
  } catch (err) {
    console.log('Error inside controller');
    console.error(err);
    // console.log(err);
    // alert(err);
    // R.renderError(`${err} 😥😥😣`);
    //we can add our own message when error occur , otherwise default value will be used , check R class.
    recipeView.renderError();
  }
};

//Search for recipes & display results
const controlSearchReuslts = async function () {
  try {
    //01-Get search query
    const query = searchView.getQuery();
    // console.log(query);
    if (!query) return;

    //00-Render the spinner
    resultsView.renderSpinner();

    //02-Load search results (it's async function so we need to await)
    //this function only manipulate the state and has no return
    await model.loadSearchResult(query);
    // console.log('Final results');

    //03-Render search results
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    //to load only 10 results per page
    //WHYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYc
    resultsView.render(model.getSearchResultsPage());

    //04-Render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log('Error inside Search Results controller');
    console.error(err);
    // console.log(err);
    // alert(err);
    // recipeView.renderError(`${err} 😥😥😣`);
    //we can add our own message when error occur , otherwise default value will be used , check recipeView class.
    resultsView.renderError();
  }
};

//display next or previous page
const controlPagination = function (page) {
  //render new results based on page number
  resultsView.render(model.getSearchResultsPage(page));

  //04-Render new pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  console.log('Control Servings');
  console.log(newServings);
  model.updateServings(newServings);

  // Update the recipe view(entire view will be updated)
  // recipeView.render(model.state.recipe);
  //only updating the changes not the entire view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  console.log('Bookmark controller is stared');

  //01-Add or remove bookmark icon
  if (!model.state.recipe.bookmarked) {
    //General concept (when we add we send all data)
    model.addBookmark(model.state.recipe);
  } else {
    //General concept (when we delete we send only the id)
    model.deleteBookmark(model.state.recipe.id);
  }

  //02-Update recipe view
  recipeView.update(model.state.recipe);

  //03-Update bookmars view
  bookmarksView.render(model.state.bookmarks);
  console.log('add Bookmark controller is finished');
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    console.log('Start of control add recipe');
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

    console.log('end of control add recipe');
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};
//the subscriber
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchReuslts);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerUpdateBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

//here we send a function from the controller to the view as an argument
init();
