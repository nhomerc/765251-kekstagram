'use strict';

(function () {
  // Отрисовываем маленькие картинки
  var onSuccess = function (photos) {
    window.gallery.render(photos);
    window.picture.data = photos;
  };

  window.backend.load(onSuccess, window.backend.onError);
  window.picture.data = [];
})();
