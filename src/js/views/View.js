import icons from 'url:../../img/icons.svg';

//we write export default class (Name of the class) when we use it as a parent element
// this class , we will not create instances from it so we don't write (export default new View())

//# means that method is actually private (# isn't working with inheritance with parcel)
//_ is a convention means that method or field is protected !
export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  //creating DOM algorith to render changes only (this is alraedy implemented in React)
  update(data) {
    console.log('Update render is called');
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    // console.log(data);
    const newMarkup = this._generateMarkup();
    //to convert the new markup from a string to a virtual dom opject so that we can compare between old DOM & new DOM
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    //this will return a node list for all elements , but we need to convert it to an array
    // const newElement = newDOM.querySelectorAll('*');
    const newElement = Array.from(newDOM.querySelectorAll('*'));
    const CurrentElement = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElement.forEach((newEl, i) => {
      const curEl = CurrentElement[i];

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
    console.log('Update render is finished');
  }

  renderSpinner() {
    // console.log(this._parentElement);
    const markUp = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div> `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
