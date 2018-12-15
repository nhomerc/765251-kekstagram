'use strict';

(function () {
  var template = document.querySelector('#picture').content.querySelector('a');
  var lastTimeout;
  var DEBOUNCE_INTERVAL = 500;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var createItem = function (item) {
    var photo = template.cloneNode(true);
    photo.querySelector('img').src = item.url;
    photo.querySelector('.picture__comments').textContent = item.comments.length;
    photo.querySelector('.picture__likes').textContent = item.likes;

    return photo;
  };

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

  var sortArray = function (first, second) {
    return second.comments.length - first.comments.length;
  };

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
    randomizer: getRandomNumber,
    item: createItem,
    shake: shakeArray,
    sourceArray: [],
    sort: sortArray,
    timeDelay: debounce
  };
})();
