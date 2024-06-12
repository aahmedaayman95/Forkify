import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2
console.log('Recipe View is imported');
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  //all methods inside constructor will be called if the class imported to main module.
  constructor() {
    super();
    console.log('We are inside addRecipeView Constructor');
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    console.log('Event is listend');
    this._parentElement.addEventListener('submit', function (e) {
      console.log('Handler function is called ');
      e.preventDefault();
      //to convert data from from to an object
      const dataArr = [...new FormData(this)];
      console.log(dataArr);
      const data = Object.fromEntries(dataArr);
      //to convert data from from to an object

      console.log(data);
      //here we send the data from view to the controller
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
