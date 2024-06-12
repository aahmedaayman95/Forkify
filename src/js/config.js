//we will put variables that are used in many modules and may be changed in the future
//so instead of changing the variable value in multiple modules, we change it in this config file then export it to other modules

export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';

//here we can define the value in seconds , after it the api call will throw an error
export const TIMEOUT_SECONDS = 1;

// export const ERROR_RECIPE_MESSAGE =
//   "We couldn't find your recipe please try another one 😅😄";

export const RESULTS_PER_PAGE = 10;

export const KEY = 'e3309474-a234-42ec-b32b-2fc590cdaccc';

export const MODAL_CLOSE_SEC = 2.5;
