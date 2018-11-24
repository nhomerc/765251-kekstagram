'use strict';

var picture = {
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
  DEFAULT_BIG_PICTURE_INDEX: 1
};
var AVATAR_COUNT = 6;
var mockPicturesArray = [];

var template = document.querySelector('#picture').content.querySelector('a');
var blockPictures = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var socialCommentList = document.querySelector('.social__comments');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

var getRandomArray = function (array, length) {
  return shakeArray(array).slice(0, getRandomNumber(1, length));
};

var createUrl = function () {
  var urlArray = [];
  for (var i = 0; i < picture.MOCK_COUNT; i++) {
    urlArray[i] = 'photos/' + (i + 1) + '.jpg';
  }

  return shakeArray(urlArray);
};

var createRandomPicturesArray = function (length) {

  var urlArray = createUrl();
  for (var i = 0; i < length; i++) {
    mockPicturesArray[i] = {
      url: urlArray[i],
      likes: getRandomNumber(picture.LIKES_MIN, picture.LIKES_MAX),
      comments: getRandomArray(picture.COMMENTS_ARRAY, picture.COMMENTS_COUNT_MAX),
      description: picture.DESCRIPTION_ARRAY[getRandomNumber(0, picture.DESCRIPTION_ARRAY.length - 1)]
    };
  }

  return mockPicturesArray;
};

var createItem = function (item) {
  var photo = template.cloneNode(true);
  photo.querySelector('img').src = item.url;
  photo.querySelector('.picture__comments').textContent = item.comments;
  photo.querySelector('.picture__likes').textContent = item.likes;

  return photo;
};

var renderPictures = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createItem(array[i]));
  }
  blockPictures.appendChild(fragment);
};

renderPictures(createRandomPicturesArray(picture.MOCK_COUNT));
bigPicture.classList.remove('hidden');

var getRandomAvatar = function () {
  return 'img/avatar-' + getRandomNumber(1, AVATAR_COUNT) + '.svg';
};

var removeChild = function (elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
};

var createComments = function (item, count) {
  var fragment = document.createDocumentFragment();
  removeChild(socialCommentList);

  for (var i = 0; i < count; i++) {
    var commentBlock = document.createElement('li');
    commentBlock.className = 'social__comment social__comment--text';

    var avatar = document.createElement('img');
    avatar.className = 'social__picture';
    avatar.src = getRandomAvatar();
    avatar.width = 35;
    avatar.height = 35;
    commentBlock.appendChild(avatar);

    var text = document.createElement('p');
    text.className = 'social__text';
    text.textContent = item.comments[i];
    commentBlock.appendChild(text);

    fragment.appendChild(commentBlock);
  }

  socialCommentList.appendChild(fragment);
};

var generateBigPicture = function (item) {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = item.url;
  bigPicture.querySelector('.likes-count').textContent = item.likes;
  bigPicture.querySelector('.comments-count').textContent = item.comments.length;
  bigPicture.querySelector('.social__caption').textContent = item.description;
  createComments(item, item.comments.length);
};

generateBigPicture(mockPicturesArray[1]);
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comments-loader').classList.add('visually-hidden');
