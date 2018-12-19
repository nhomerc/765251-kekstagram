'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/kekstagram';
  var SUCCESS_CODE = 200;
  var TIMEOUT = 10000;

  var errorConnection = function (errorMessage) {
    var template = document.querySelector('#error').content.querySelector('.error');
    var errorBlock = template.cloneNode(true);
    var errorBtn = errorBlock.querySelectorAll('.error__button');
    errorBlock.querySelector('.error__title').innerHTML = errorMessage;
    document.querySelector('main').appendChild(errorBlock);
    document.querySelector('.error').style.zIndex = '2';

    var closeErrorBlock = function () {
      document.removeEventListener('keydown', onEcsKeyPress);
      document.body.removeEventListener('click', onScreenClick);
      document.querySelector('.error').remove();
    };

    var onErrorBtnClick = function () {
      closeErrorBlock();
    };

    var onEcsKeyPress = function (evt) {

      if (evt.keyCode === window.data.escKeyCode) {
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

  var getXhr = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        errorConnection('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      errorConnection('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorConnection('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  var loadPictures = function (onSuccess) {
    var xhr = getXhr(onSuccess);

    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  };

  var uploadPicture = function (data, onSuccess) {
    var xhr = getXhr(onSuccess);

    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  };

  window.backend = {
    load: loadPictures,
    save: uploadPicture
  };
})();
