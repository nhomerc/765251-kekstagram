'use strict';

(function () {
  var template = document.querySelector('#picture').content.querySelector('a');
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

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

  // Перемешивание массива
  var shakeArray = function (array) {
    var j;
    var temp;
    for (var i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }

    return array;
  };

  // Сортировка массива по убыванию
  var sortArray = function (first, second) {
    return second.comments.length - first.comments.length;
  };

  // Устраняем "дребезг"
  var debounce = function (pictureArray) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(pictureArray, DEBOUNCE_INTERVAL);
  };

  window.data = {
    ESC_KEYCODE: 27,
    blockPictures: document.querySelector('.pictures'),
    bigPicture: document.querySelector('.big-picture'),
    // Рандомайзер
    randomizer: getRandomNumber,
    // Создаем описание картнинок в миниатюре
    item: createItem,
    shake: shakeArray,
    sourceArray: [],
    sort: sortArray,
    timeDelay: debounce
  };
})();
