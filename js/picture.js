'use strict';

(function () {
  var filtersImg = document.querySelector('.img-filters');

  // Отрисовываем маленькие картинки
  var onSuccess = function (photos) {
    filtersImg.classList.remove('img-filters--inactive');
    window.data.sourceArray = photos;
    window.picture.data = window.data.sourceArray.slice();
    window.gallery.render();
  };

  window.backend.load(onSuccess, window.backend.onError);
  window.picture.data = [];
})();
