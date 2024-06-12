import View from './View.js';
import icons from 'url:../../img/icons.svg';

// console.log(Fraction);

export class PaginationView extends View {
  //private fields.
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const currentPage = this._data.page;
    // console.log('Pagination Viwe generating markup');
    // console.log(this);
    // console.log(this._data);
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //we are on page 1 and there are  other pages
    if (currentPage === 1 && numberOfPages > 1) {
      return `
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    //we are on page 1 and there are no other pages
    if (
      currentPage === 1 &&
      this._data.results.length <= this._data.resultsPerPage
    ) {
      return ``;
    }

    //last page
    if (currentPage === numberOfPages) {
      return `<button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
      `;
    }

    //other pages
    if (currentPage < numberOfPages) {
      return `<button data-goto="${
        currentPage - 1
      }"class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
  }

  //revise event delegation , to add event to the parent instead of all children.
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      //   console.log('We are inside Pagination View , Pagination Click');
      //   console.log(e);
      //   console.log(this);
      //   console.log(e.currentTarget);
      //   console.log(e.target);

      //to select the clicked button using closest method (it goes up otherwise queryselector it goes down)
      const clickedBtn = e.target.closest('.btn--inline');
      if (!clickedBtn) return;
      //   console.log(clickedBtn);
      //+clickedBtn.dataset.goto to get next or previous page number
      //here we send data from view to controller using the handler fn which already passed from controller !
      handler(+clickedBtn.dataset.goto);
    });
  }
}

export default new PaginationView();
