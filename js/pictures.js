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

var getRandomCommentsArray = function () {
  var commentsArray = [];
  for (var i = 0; i < getRandomNumber(5, 100); i++) {
    commentsArray[i] = shakeArray(picture.COMMENTS_ARRAY).slice(0, getRandomNumber(1, 2)).join(' ');
  }

  return commentsArray;
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
      comments: getRandomCommentsArray(),
      description: picture.DESCRIPTION_ARRAY[getRandomNumber(0, picture.DESCRIPTION_ARRAY.length - 1)]
    };
  }

  return mockPicturesArray;
};

var createItem = function (item) {
  var photo = template.cloneNode(true);
  photo.querySelector('img').src = item.url;
  photo.querySelector('.picture__comments').textContent = item.comments.length;
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
  bigPicture.querySelector('.comments-count').textContent = item.comments;
  createComments(mockPicturesArray[0], 2);
};

// События
// Редактирование изображения
// Откртыие и закрытие окна редактирования
var uploadFile = document.querySelector('#upload-file');
var imageEditingForm = document.querySelector('.img-upload__overlay');
var closeButton = document.querySelector('#upload-cancel');
var comments = document.querySelector('.text__description');
var inputScaleControlValue = document.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var imgEditing = imgUploadPreview.querySelector('img');
var effectSliderPin = document.querySelector('.effect-level__pin');
var effectValue = document.querySelector('.effect-level__value');
var sliderEffectLevel = document.querySelector('.img-upload__effect-level');
var effectLevelDepth = document.querySelector('.effect-level__depth');
var radioBtnEffect = document.querySelectorAll('.effects__radio');
var inputHashtag = document.querySelector('.text__hashtags');
var currentEffectClass;
var ESC_KEYCODE = 27;
var LINE_WIDTH = 453;
var DEFAULT_PIN_POSITION = '100%';

var defaultSettings = function () {
  effectSliderPin.style.left = DEFAULT_PIN_POSITION;
  effectLevelDepth.style.width = DEFAULT_PIN_POSITION;
  inputScaleControlValue.value = 100 + '%';
  imgUploadPreview.style.transform = 'scale(' + 1 + ')';
  imgUploadPreview.style.filter = '';
  imgEditing.className = '';
  inputHashtag.value = '';
  comments.value = '';
  uploadFile.value = '';
};

var showEditingImage = function () {
  sliderEffectLevel.classList.add('hidden');
  imageEditingForm.classList.remove('hidden');
  document.addEventListener('keydown', onImgUploadEscPress);
};

var closeEditingImage = function () {
  imageEditingForm.classList.add('hidden');
  document.removeEventListener('keydown', onImgUploadEscPress);
  defaultSettings();
};

var onImgUploadEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeEditingImage();
  }
};

uploadFile.addEventListener('change', showEditingImage);
closeButton.addEventListener('click', closeEditingImage);

// Наложение эффектов
// Функция наложения эффекта
var onRadioEffectBtnClick = function (evt) {
  defaultSettings();
  sliderEffectLevel.classList.remove('hidden');
  currentEffectClass = 'effect__preview--' + evt.target.value;
  imgEditing.classList.add(currentEffectClass);
  if (evt.target.value === 'none') {
    sliderEffectLevel.classList.add('hidden');
  }
  changeEffect(DEFAULT_PIN_POSITION.slice(0, -1));
};

for (var j = 0; j < radioBtnEffect.length; j++) {
  radioBtnEffect[j].addEventListener('click', onRadioEffectBtnClick);
}

var onEffectSliderPinMouseDown = function (evt) {
  var onEffectSliderPinMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: moveEvt.clientX - coords.x
    };

    coords = {
      x: moveEvt.clientX
    };

    if ((effectSliderPin.offsetLeft + shift.x) > 0 && (effectSliderPin.offsetLeft + shift.x) < LINE_WIDTH) {
      effectSliderPin.style.left = (effectSliderPin.offsetLeft + shift.x) + 'px';
    } else if ((effectSliderPin.offsetLeft + shift.x) < 0) {
      effectSliderPin.style.left = 0 + 'px';
    } else if ((effectSliderPin.offsetLeft + shift.x) > LINE_WIDTH) {
      effectSliderPin.style.left = LINE_WIDTH + 'px';
    }
    effectLevelDepth.style.width = effectSliderPin.style.left;
    effectValue.value = (effectSliderPin.offsetLeft / LINE_WIDTH) * 100;
    changeEffect(effectValue.value);
  };

  var onEffectSliderPinMouseUp = function () {
    evt.preventDefault();
    document.removeEventListener('mousemove', onEffectSliderPinMove);
    document.removeEventListener('mouseup', onEffectSliderPinMouseUp);
  };

  evt.preventDefault();
  var coords = {
    x: evt.clientX
  };

  document.addEventListener('mousemove', onEffectSliderPinMove);
  document.addEventListener('mouseup', onEffectSliderPinMouseUp);
};

// Обработчик отпускания кнопки мыши и наложение эффектов
var changeEffect = function (percent) {
  switch (currentEffectClass) {
    case 'effect__preview--none':
      imgUploadPreview.style.filter = '';
      break;
    case 'effect__preview--chrome':
      imgUploadPreview.style.filter = 'grayscale(' + percent / 100 + ')';
      break;
    case 'effect__preview--sepia':
      imgUploadPreview.style.filter = 'sepia(' + percent / 100 + ')';
      break;
    case 'effect__preview--marvin':
      imgUploadPreview.style.filter = 'invert(' + percent + '%' + ')';
      break;
    case 'effect__preview--phobos':
      imgUploadPreview.style.filter = 'blur(' + (percent / 100) * 3 + 'px' + ')';
      break;
    case 'effect__preview--heat':
      imgUploadPreview.style.filter = 'brightness(' + ((percent / 100) * 2 + 1) + ')';
      break;
  }
};


var onEffectSliderPinKeydown = function (evt) {
  evt.preventDefault();
  var LEFT_KEYCODE = 39;
  var RIGHT_KEYCODE = 37;
  var TAB_KEYCODE = 9;
  var jump;

  if (evt.keyCode === RIGHT_KEYCODE) {
    jump = 5;
  } else if (evt.keyCode === LEFT_KEYCODE) {
    jump = -5;
  } else if (evt.keyCode === TAB_KEYCODE) {
    effectSliderPin.removeEventListener('keydown', onEffectSliderPinKeydown);
  }
  if ((effectSliderPin.offsetLeft - jump) > 0 && (effectSliderPin.offsetLeft - jump) < LINE_WIDTH) {
    effectSliderPin.style.left = (effectSliderPin.offsetLeft - jump) + 'px';
  } else if ((effectSliderPin.offsetLeft - jump) < 0) {
    effectSliderPin.style.left = 0 + 'px';
  } else if ((effectSliderPin.offsetLeft - jump) > LINE_WIDTH) {
    effectSliderPin.style.left = LINE_WIDTH + 'px';
  }
  effectLevelDepth.style.width = effectSliderPin.style.left;
  effectValue.value = (effectSliderPin.offsetLeft / LINE_WIDTH) * 100;
  changeEffect(effectValue.value);
};

var onEffectSliderPinFocus = function () {
  effectSliderPin.addEventListener('keydown', onEffectSliderPinKeydown);
};

effectSliderPin.addEventListener('focus', onEffectSliderPinFocus);
effectSliderPin.addEventListener('mousedown', onEffectSliderPinMouseDown);

// Показ изображения в  полноэкранном режиме
var btnModalClose = document.querySelector('.big-picture__cancel');

// Закрытие модального окна
var closeModal = function () {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBtnModalCloseEscPress);
};

// Открытие модального окна
var openModal = function () {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBtnModalCloseEscPress);
};

// Функции закрытия модального окна
var onbtnModalCloseClick = function () {
  closeModal();
};

var onBtnModalCloseEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeModal();
  }
};

// Заполняем данные большой картинки
var getPicturePreviewData = function (evt) {
  var target = evt.currentTarget;
  var imgPreviewData = {
    url: target.querySelector('img').src,
    likes: target.querySelector('.picture__likes').textContent,
    comments: target.querySelector('.picture__comments').textContent,
  };

  return imgPreviewData;
};

// Обработчки события нажатия на превью картинку
var onImagePreviewClick = function (evt) {
  evt.preventDefault();
  generateBigPicture(getPicturePreviewData(evt));
  openModal();
};

// Добавляем обработчкик 'click' на превью картинки
var imgPreviewList = document.querySelectorAll('.picture');
for (var i = 0; i < imgPreviewList.length; i++) {
  imgPreviewList[i].addEventListener('click', onImagePreviewClick);
}
btnModalClose.addEventListener('click', onbtnModalCloseClick);

// Масштаб

var btnScaleControlSmaller = document.querySelector('.scale__control--smaller');
var btnScaleControlBigger = document.querySelector('.scale__control--bigger');
inputScaleControlValue.value = '100%';

// Фунцкия уменьшения масштаба
var onBtnScaleControlSmallerClick = function () {
  if (inputScaleControlValue.value.slice(0, -1) > 50) {
    inputScaleControlValue.value = inputScaleControlValue.value.slice(0, -1) - 25 + '%';
  } else {
    inputScaleControlValue.value = 25 + '%';
  }
  onScaleControlValueChange(inputScaleControlValue.value);
};

// Добавление стиля transform scale
var onScaleControlValueChange = function (value) {
  imgUploadPreview.style.transform = 'scale(' + value.slice(0, -1) / 100 + ')';
};

// Функция увеличение масштаба
var onBtnScaleControlBiggerClick = function () {
  if (inputScaleControlValue.value.slice(0, -1) < 76) {
    inputScaleControlValue.value = +inputScaleControlValue.value.slice(0, -1) + 25 + '%';
  } else {
    inputScaleControlValue.value = 100 + '%';
  }
  onScaleControlValueChange(inputScaleControlValue.value);
};

btnScaleControlSmaller.addEventListener('click', onBtnScaleControlSmallerClick);
btnScaleControlBigger.addEventListener('click', onBtnScaleControlBiggerClick);

// Работа с комментариями


// Работа с хэштегами и отправкой формы
var formUpload = document.querySelector('.img-upload__form');

var MAX_TAGS = 5;
var MAX_TAG_LENGTH = 20;

var checkValidateHashtag = function (arr) {
  for (i = 0; i < arr.length; i++) {
    if (arr[i][0] !== '#') {
      return 'Хеш-тег должен начинаться с #';
    }
    if (arr[i][0] === '#' && arr[i].length < 2) {
      return 'Хеш-тег не может состоять только из одной решётки';
    }
    if (arr[i].length > MAX_TAG_LENGTH) {
      return 'Длина одного хэш-тега не может быть больше 20 символов';
    }
    if (arr.length > MAX_TAGS) {
      return 'Нельзя указать больше 5 хэш-тегов';
    }
    for (var z = i + 1; z < arr.length; z++) {
      if (arr[i].toLowerCase() === arr[z].toLowerCase()) {
        return 'Хэш-теги не должны повторяться. ' +
          'Теги не чувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом';
      }
    }
  }
  inputHashtag.style.outline = '';
  inputHashtag.setCustomValidity('');
  return true;
};

var checkHashtag = function () {
  var hashtagString = inputHashtag.value;
  hashtagString = hashtagString.trim().replace(/\s{2,}/g, ' ');

  if (hashtagString === '') {
    return;
  }
  var messageValidation = checkValidateHashtag(hashtagString.split(' '));
  if (messageValidation !== true) {
    inputHashtag.style.outline = '3px solid red';
    inputHashtag.setCustomValidity(messageValidation);
  }
};

var checkValidations = function (evt) {
  evt.preventDefault();
  checkHashtag();
  formUpload.submit();
};

inputHashtag.addEventListener('input', checkHashtag);
inputHashtag.addEventListener('focus', function () {
  document.removeEventListener('keydown', onImgUploadEscPress);
});
inputHashtag.addEventListener('blur', function () {
  document.addEventListener('keydown', onImgUploadEscPress);
});
formUpload.addEventListener('submit', checkValidations);
comments.addEventListener('focus', function () {
  document.removeEventListener('keydown', onImgUploadEscPress);
});
comments.addEventListener('blur', function () {
  document.addEventListener('keydown', onImgUploadEscPress);
});
