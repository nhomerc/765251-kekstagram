'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/kekstagram';
  var SUCCESS_CODE = 200;

  var getXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    // Обработчик на событие загрузки с сервера или на сервер
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    return xhr;
  };

  // Получаем с сервера данные
  var loadPictures = function (onSuccess, onError) {
    var xhr = getXhr(onSuccess, onError);

    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  };

  // Загружаем на сервер фотографию
  var uploadPicture = function (data, onSuccess, onError) {
    var xhr = getXhr(onSuccess, onError);

    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  };

  // Ошибки
  var errorConnection = function (errorMessage) {
    var template = document.querySelector('#error').content.querySelector('.error');
    var errorBlock = template.cloneNode(true);
    var errorBtn = errorBlock.querySelectorAll('.error__button');
    errorBlock.querySelector('.error__title').innerHTML = errorMessage;
    document.querySelector('main').appendChild(errorBlock);
    window.data.errorBlockShow = true;
    document.querySelector('.error').style.zIndex = '2';

    var closeErrorBlock = function () {
      document.removeEventListener('keydown', onEcsKeyPress);
      document.body.removeEventListener('click', onScreenClick);
      document.querySelector('.error').remove();
      window.data.errorBlockShow = false;
    };

    var onErrorBtnClick = function () {
      closeErrorBlock();
    };

    var onEcsKeyPress = function (evt) {

      if (evt.keyCode === window.data.ESC_KEYCODE) {
        closeErrorBlock();
      }
    };

    var onScreenClick = function () {
      closeErrorBlock();
    };

    errorBtn.forEach(function (btn) {
      btn.addEventListener('click', onErrorBtnClick);
    });
    document.addEventListener('keydown', onEcsKeyPress);
    document.body.addEventListener('click', onScreenClick);
  };

  window.backend = {
    load: loadPictures,
    save: uploadPicture,
    onError: errorConnection
  };
})();
