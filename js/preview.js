'use strict';

(function () {
  var socialCommentList = document.querySelector('.social__comments');
  var AVATAR_COUNT = 6;
  var imgPreviewList = document.querySelectorAll('.picture');
  var btnModalClose = document.querySelector('.big-picture__cancel');

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

  // Создаем случайную аватарку
  var getRandomAvatar = function () {
    return 'img/avatar-' + window.data.randomizer(1, AVATAR_COUNT) + '.svg';
  };

  var removeChild = function (elem) {
    while (elem.firstChild) {
      elem.firstChild.remove();
    }
  };

  // Создаем комментарии
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

  // Создаем большую картинку
  var generateBigPicture = function (item) {
    window.data.bigPicture.querySelector('.big-picture__img').querySelector('img').src = item.url;
    window.data.bigPicture.querySelector('.likes-count').textContent = item.likes;
    window.data.bigPicture.querySelector('.comments-count').textContent = item.comments;
    createComments(window.data.mockPicturesArray[0], 5);
  };

  // Закрытие модального окна
  var closeModal = function () {
    document.body.classList.remove('modal-open');
    window.data.bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBtnModalCloseEscPress);
  };

  // Открытие модального окна
  var openModal = function () {
    window.data.bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onBtnModalCloseEscPress);
  };

  // Функции закрытия модального окна
  var onBtnModalCloseClick = function () {
    closeModal();
  };

  var onBtnModalCloseEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closeModal();
    }
  };

  // Обработчки события нажатия на превью картинку
  var onImagePreviewClick = function (evt) {
    evt.preventDefault();
    generateBigPicture(getPicturePreviewData(evt));
    openModal();
  };

  // Добавляем обработчкик 'click' на превью картинки
  for (var i = 0; i < imgPreviewList.length; i++) {
    imgPreviewList[i].addEventListener('click', onImagePreviewClick);
  }

  btnModalClose.addEventListener('click', onBtnModalCloseClick);
})();
