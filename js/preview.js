'use strict';

(function () {
  var socialCommentList = document.querySelector('.social__comments');
  var btnModalClose = document.querySelector('.big-picture__cancel');

  var removeChild = function (elem) {
    while (elem.firstChild) {
      elem.firstChild.remove();
    }
  };

  // Создаем комментарии
  var createComments = function (item) {
    var fragment = document.createDocumentFragment();
    var showMessages = (item.length > 5) ? 5 : item.length;

    removeChild(socialCommentList);

    for (var i = 0; i < showMessages; i++) {
      var commentBlock = document.createElement('li');
      commentBlock.className = 'social__comment social__comment--text';

      var avatar = document.createElement('img');
      avatar.className = 'social__picture';
      avatar.src = item[i].avatar;
      avatar.width = 35;
      avatar.height = 35;
      commentBlock.appendChild(avatar);

      var text = document.createElement('p');
      text.className = 'social__text';
      text.textContent = item[i].message;
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
    window.data.bigPicture.querySelector('.social__caption').textContent = item.description;
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

  // Заполняем данные большой картинки
  var getPicturePreviewData = function (evt) {
    var target = evt.target.closest('a');
    var allPictures = [].slice.apply(document.querySelectorAll('.picture'));
    if (!target) {
      return;
    }
    var imgPreviewData = {
      url: target.querySelector('img').src,
      likes: target.querySelector('.picture__likes').textContent,
      comments: target.querySelector('.picture__comments').textContent,
      description: window.picture.data[allPictures.indexOf(target)].description
    };
    generateBigPicture(imgPreviewData);
    createComments(window.picture.data[allPictures.indexOf(target)].comments);
    openModal();
  };

  window.data.blockPictures.addEventListener('click', getPicturePreviewData);
  btnModalClose.addEventListener('click', onBtnModalCloseClick);
})();
