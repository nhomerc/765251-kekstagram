'use strict';

(function () {
  // Отрисовываем картинки
  var renderPictures = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.data.item(array[i]));
    }
    window.data.blockPictures.appendChild(fragment);
  };

  window.gallery = {
    render: renderPictures
  };
})();
