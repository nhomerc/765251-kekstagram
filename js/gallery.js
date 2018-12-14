'use strict';

(function () {
  // Очистка миниатюр
  var removeChild = function () {
    while (window.data.blockPictures.querySelector('.picture')) {
      window.data.blockPictures.querySelector('.picture').remove();
    }
  };

  // Меняем отрисовку кнопки
  var changeActiveBtn = function (btn) {
    if (btn.classList.contains('img-filters__button--active')) {
      return;
    } else {
      var activeButton = document.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      btn.classList.add('img-filters__button--active');
    }
  };

  // Отрисовываем картинки
  var renderPictures = function () {
    var array = window.picture.data;
    removeChild();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.data.item(array[i]));
    }
    window.data.blockPictures.appendChild(fragment);
  };

  var popularBtn = document.querySelector('#filter-popular');
  var newBtn = document.querySelector('#filter-new');
  var discussedBtn = document.querySelector('#filter-discussed');

  var changeFilter = function (array, filter) {
    window.data.timeDelay(renderPictures);
    changeActiveBtn(filter);
    window.picture.data = array;
  };

  // Обработка на конпку Популярные
  var onPopularBtnClick = function () {
    changeFilter(window.data.sourceArray, popularBtn);
  };

  // Обработка на кнопку Новые
  var onNewBtnClick = function () {
    var newRandomArray = window.data.sourceArray.slice();
    newRandomArray = window.data.shake(newRandomArray);
    changeFilter(newRandomArray.slice(0, 10), newBtn);
  };

  // Обработка на кнопку Обсуждаемые
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
