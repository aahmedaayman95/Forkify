import View from './View.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(x => {
        const id = window.location.hash.slice(1);
        return `
      <li class="preview">
        <a class="preview__link ${
          x.id === id ? 'preview__link--active' : ''
        }" href="#${x.id}">
          <figure class="preview__fig">
            <img src="${x.image}" alt="${x.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${x.title}</h4>
            <p class="preview__publisher">${x.publisher}</p>
            <div class="preview__user-generated ${x.key ? '' : 'hidden'}">
              <svg>
              <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
      })
      .join('');
    // return `zlb7aaaaaaaaaa`;
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  // _generateMarkup() {
  //   console.log('Start of generate markup');
  //   console.log('Dataaaaaaa', this._data);
  //   this._data
  //     .map(data => {
  //       const id = window.location.hash.slice(1);
  //       return `
  //     <li class="preview">
  //       <a class="preview__link ${
  //         data.id === id ? 'preview__link--active' : ''
  //       }" href="#${data.id}">
  //         <figure class="preview__fig">
  //           <img src="${data.image}" alt="${data.title}" />
  //         </figure>
  //         <div class="preview__data">
  //           <h4 class="preview__title">${data.title}</h4>
  //           <p class="preview__publisher">${data.publisher}</p>
  //           <div class="preview__user-generated ${data.key ? '' : 'hidden'}">
  //             <svg>
  //             <use href="${icons}#icon-user"></use>
  //             </svg>
  //           </div>
  //         </div>
  //       </a>
  //     </li>
  //   `;
  //     })
  //     .join('');
  // }

  _generateMarkupPreview() {
    console.log('Whyyyyyyyyyyyyyy');
    console.log('Star of generate markup preview');
    const id = window.location.hash.slice(1);
    // return `zlb7aaaaaaaaaa`;
    return `
      <li class="preview">
        <a class="preview__link ${
          this._data.id === id ? 'preview__link--active' : ''
        }" href="#${this._data.id}">
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated ${
              this._data.key ? '' : 'hidden'
            }">
              <svg>
              <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
  }
}

export default new BookmarksView();
