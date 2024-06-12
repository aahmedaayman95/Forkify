//this file will contain the State , business logic and api calls

//import config.js
import { API_URL, RESULTS_PER_PAGE, KEY } from './config';
//there is always a live connection between import and export

//import helper file
import { getJson, sendJSON } from './helper';

console.log('Start Of Model');
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

//here i will load the recipe and store it inside the state.recipe
export const loadRecipe = async function (id) {
  try {
    // 01- Start of Loading the recipe
    const data = await getJson(`${API_URL}/${id}`);
    const { recipe } = data.data;
    // console.log(recipe);
    //here i created the object with new keys names but same values
    state.recipe = {
      id: recipe.id,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      publisher: recipe.publisher,
      ingredients: recipe.ingredients,
      title: recipe.title,
      source: recipe.source_url,
      servings: recipe.servings,
    };

    //check if selected recipe on the bookmark array, because when we call the API , the bookmarked property not exist.
    if (state.bookmarks.some(bookmark => bookmark.id === state.recipe.id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
    // console.log(recipe);
  } catch (err) {
    console.log('Error inside Model');
    console.error(err);
    // alert(err);
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    // 01- Start of Loading the search results
    const data = await getJson(`${API_URL}?search=${query}`);
    // console.log(data);
    const { recipes } = data.data;
    // console.log(recipes);
    state.search.results = recipes.map(recipe => {
      return {
        id: recipe.id,
        publisher: recipe.publisher,
        title: recipe.title,
        image: recipe.image_url,
      };
    });

    //reset page number to 1 :)
    state.search.page = 1;
  } catch (err) {
    console.log('Error inside Model');
    console.error(err);
    // alert(err);
    throw err;
  }
};

//to return 10 results for each page (Pagination)
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  console.log(state.search.results.slice(start, end));

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
  });

  state.recipe.servings = newServings;
};

//GEneral concept (when we add we send entire data to the model)
export const addBookmark = function (recipe) {
  console.log('add Bookmark model is started');

  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();

  console.log('add Bookmark model is finished');
};

//General concept (when we delete we send only the id to the mode)
export const deleteBookmark = function (id) {
  console.log('delete Bookmark model is started');
  state.bookmarks = state.bookmarks.filter(rec => rec.id != id);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
  console.log('delete Bookmark model is ended');
};

const persistBookmarks = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient fromat! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    console.log('data inside model');
    console.log(data);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

const init = function () {
  const storage = localStorage.getItem('bookmark');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
