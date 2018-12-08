'use strict';

(function () {
  // Показ изображения в  полноэкранном режиме
  var btnModalClose = document.querySelector('.big-picture__cancel');

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
  var onbtnModalCloseClick = function () {
    closeModal();
  };

  var onBtnModalCloseEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
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
    window.gallery.generateBigPicture(getPicturePreviewData(evt));
    openModal();
  };

  // Добавляем обработчкик 'click' на превью картинки
  var imgPreviewList = document.querySelectorAll('.picture');
  for (var i = 0; i < imgPreviewList.length; i++) {
    imgPreviewList[i].addEventListener('click', onImagePreviewClick);
  }
  btnModalClose.addEventListener('click', onbtnModalCloseClick);
})();
