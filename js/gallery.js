'use strict';

(function () {
  var COUNT_ITEM_RANDOM_ARRAY = 10;

  var removeChild = function () {
    while (window.data.blockPictures.querySelector('.picture')) {
      window.data.blockPictures.querySelector('.picture').remove();
    }
  };

  var changeActiveBtn = function (btn) {
    if (!btn.classList.contains('img-filters__button--active')) {
      var activeButton = document.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      btn.classList.add('img-filters__button--active');
    }
  };

  var renderPictures = function () {
    var array = window.picture.data;
    removeChild();
    var fragment = document.createDocumentFragment();
    array.forEach(function (item) {
      fragment.appendChild(window.data.item(item));
    });
    window.data.blockPictures.appendChild(fragment);
  };

  var popularBtn = document.querySelector('#filter-popular');
  var newBtn = document.querySelector('#filter-new');
  var discussedBtn = document.querySelector('#filter-discussed');

  var changeFilter = function (array, filter) {
    window.debounce(renderPictures);
    changeActiveBtn(filter);
    window.picture.data = array;
  };

  var onPopularBtnClick = function () {
    changeFilter(window.data.sourceArray, popularBtn);
  };

  var onNewBtnClick = function () {
    var newRandomArray = window.data.sourceArray.slice();
    newRandomArray = window.data.shake(newRandomArray);
    changeFilter(newRandomArray.slice(0, COUNT_ITEM_RANDOM_ARRAY), newBtn);
  };

  var onDiscussedBtnClick = function () {
    var discussedArray = window.data.sourceArray.slice();
    discussedArray.sort(window.data.sort);
    changeFilter(discussedArray, discussedBtn);
  };

  popularBtn.addEventListener('click', onPopularBtnClick);
  newBtn.addEventListener('click', onNewBtnClick);
  discussedBtn.addEventListener('click', onDiscussedBtnClick);


  window.gallery = {
    render: renderPictures
  };
})();
