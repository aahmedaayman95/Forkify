//any data taken or added to dom should be in a seperate class

class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    console.log('We are inside handler');
    //we use submit , so we can hit enter or left click on submit(search) button
    this._parentElement.addEventListener('submit', function (e) {
      //to stop page from reload , as it's a form
      e.preventDefault();
      handler();
    });
  }

  //   constructor() {
  //     console.log('Search view constructor');
  //     console.log(this._parantElement);
  //   }
}

export default new SearchView();
