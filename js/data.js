'use strict';

(function () {
  var template = document.querySelector('#picture').content.querySelector('a');

  // Рандомайзер
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Создаем описание картнинок в миниатюре
  var createItem = function (item) {
    var photo = template.cloneNode(true);
    photo.querySelector('img').src = item.url;
    photo.querySelector('.picture__comments').textContent = item.comments.length;
    photo.querySelector('.picture__likes').textContent = item.likes;

    return photo;
  };

  window.data = {
    ESC_KEYCODE: 27,
    blockPictures: document.querySelector('.pictures'),
    bigPicture: document.querySelector('.big-picture'),
    // Рандомайзер
    randomizer: getRandomNumber,
    // Создаем описание картнинок в миниатюре
    item: createItem,
    errorBlockShow: false
  };
})();
