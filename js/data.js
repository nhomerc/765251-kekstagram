'use strict';

(function () {
  var template = document.querySelector('#picture').content.querySelector('a');
  // Рандомайзер
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Создаем массив картинок и наполняем данными
  var createRandomPicturesArray = function (length) {
    var urlArray = createUrl();
    for (var i = 0; i < length; i++) {
      window.data.mockPicturesArray[i] = {
        url: urlArray[i],
        likes: getRandomNumber(window.data.picture.LIKES_MIN, window.data.picture.LIKES_MAX),
        comments: getRandomCommentsArray(),
        description: window.data.picture.DESCRIPTION_ARRAY[getRandomNumber(0, window.data.picture.DESCRIPTION_ARRAY.length - 1)]
      };
    }

    return window.data.mockPicturesArray;
  };

  // Создаем описание картнинок в миниатюре
  var createItem = function (item) {
    var photo = template.cloneNode(true);
    photo.querySelector('img').src = item.url;
    photo.querySelector('.picture__comments').textContent = item.comments.length;
    photo.querySelector('.picture__likes').textContent = item.likes;

    return photo;
  };

  // Перемешиваем массив
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

  // Создаем массив случайных комментариев
  var getRandomCommentsArray = function () {
    var commentsArray = [];
    for (var i = 0; i < getRandomNumber(5, 100); i++) {
      commentsArray[i] = shakeArray(window.data.picture.COMMENTS_ARRAY).slice(0, getRandomNumber(1, 2)).join(' ');
    }

    return commentsArray;
  };

  //  Создаем адреса на картинки
  var createUrl = function () {
    var urlArray = [];
    for (var i = 0; i < window.data.picture.MOCK_COUNT; i++) {
      urlArray[i] = 'photos/' + (i + 1) + '.jpg';
    }

    return shakeArray(urlArray);
  };

  window.data = {
    ESC_KEYCODE: 27,
    bigPicture: document.querySelector('.big-picture'),
    picture: {
      LIKES_MIN: 15,
      LIKES_MAX: 200,
      COMMENTS_ARRAY: ['Всё отлично!',
        'В целом всё неплохо. Но не всё.',
        'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
        'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
        'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
        'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
      ],
      DESCRIPTION_ARRAY: ['Тестим новую камеру!',
        'Затусили с друзьями на море',
        'Как же круто тут кормят',
        'Отдыхаем...',
        'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
        'Вот это тачка!'
      ],
      MOCK_COUNT: 25,
      COMMENTS_COUNT_MAX: 2,
      DEFAULT_BIG_PICTURE_INDEX: 1,
    },
    mockPicturesArray: [],
    // Рандомайзер
    randomizer: getRandomNumber,
    // Создаем массив картинок и наполняем данными
    randomArray: createRandomPicturesArray,
    // Создаем описание картнинок в миниатюре
    item: createItem
  };
})();
