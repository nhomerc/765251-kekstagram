'use strict';

(function () {
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
  var inputHashtag = document.querySelector('.text__hashtags');
  var currentEffectClass = 'effect__preview--none';
  var formUpload = document.querySelector('.img-upload__form');
  var previewPicture = document.querySelector('.img-upload__preview img');
  var LINE_WIDTH = 453;
  var DEFAULT_PIN_POSITION = '100%';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var MAX_TAGS = 5;
  var MAX_TAG_LENGTH = 20;
  var LEFT_KEYCODE = 39;
  var RIGHT_KEYCODE = 37;
  var TAB_KEYCODE = 9;

  var setDefaultSettings = function () {
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
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewPicture.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
    effectValue.value = DEFAULT_PIN_POSITION.slice(0, -1).toString();
    sliderEffectLevel.classList.add('hidden');
    imgEditing.classList.add(currentEffectClass);
    imageEditingForm.classList.remove('hidden');
    document.addEventListener('keydown', onImgUploadEscPress);
  };

  var closeEditingImage = function () {
    imageEditingForm.classList.add('hidden');
    document.removeEventListener('keydown', onImgUploadEscPress);
    setDefaultSettings();
  };

  var onImgUploadEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE && !window.data.errorBlockShow) {
      closeEditingImage();
    }
  };

  uploadFile.addEventListener('change', showEditingImage);
  closeButton.addEventListener('click', closeEditingImage);

  var onRadioEffectBtnClick = function (evt) {
    imgEditing.className = '';
    sliderEffectLevel.classList.remove('hidden');
    currentEffectClass = 'effect__preview--' + evt.target.value;
    imgEditing.classList.add(currentEffectClass);
    if (evt.target.value === 'none') {
      sliderEffectLevel.classList.add('hidden');
    }
    effectSliderPin.style.left = DEFAULT_PIN_POSITION;
    effectLevelDepth.style.width = DEFAULT_PIN_POSITION;
    changeEffect(DEFAULT_PIN_POSITION.slice(0, -1));
  };

  document.querySelectorAll('.effects__radio').forEach(function (radioBtnEffect) {
    radioBtnEffect.addEventListener('click', onRadioEffectBtnClick);
  });

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
      var percent = Math.round((effectSliderPin.offsetLeft / LINE_WIDTH) * 100);
      effectValue.value = percent.toString();
      changeEffect(percent);
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

  var btnScaleControlSmaller = document.querySelector('.scale__control--smaller');
  var btnScaleControlBigger = document.querySelector('.scale__control--bigger');
  inputScaleControlValue.value = '100%';

  var onBtnScaleControlSmallerClick = function () {
    if (inputScaleControlValue.value.slice(0, -1) > 50) {
      inputScaleControlValue.value = inputScaleControlValue.value.slice(0, -1) - 25 + '%';
    } else {
      inputScaleControlValue.value = 25 + '%';
    }
    onScaleControlValueChange(inputScaleControlValue.value);
  };

  var onScaleControlValueChange = function (value) {
    imgUploadPreview.style.transform = 'scale(' + value.slice(0, -1) / 100 + ')';
  };

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

  var checkValidateHashtag = function (arr) {
    for (var i = 0; i < arr.length; i++) {
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

  var successUpload = function () {
    var template = document.querySelector('#success').content.querySelector('.success');
    var successBlock = template.cloneNode(true);
    var successBtn = successBlock.querySelector('.success__button');
    document.querySelector('main').appendChild(successBlock);
    document.querySelector('.success').style.zIndex = '2';

    var closeSuccessBlock = function () {
      successBlock.remove();
      successBtn.removeEventListener('click', onSuccessBtnClick);
      document.removeEventListener('click', onScreenClick);
      document.removeEventListener('keydown', onEscPress);
      closeEditingImage();
    };

    var onSuccessBtnClick = function () {
      closeSuccessBlock();
    };

    var onScreenClick = function () {
      closeSuccessBlock();
    };

    var onEscPress = function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        closeSuccessBlock();
      }
    };

    successBtn.addEventListener('click', onSuccessBtnClick);
    document.addEventListener('click', onScreenClick);
    document.addEventListener('keydown', onEscPress);
  };

  var checkValidations = function (evt) {
    evt.preventDefault();
    checkHashtag();
    window.backend.save(new FormData(formUpload), successUpload, window.backend.onError);
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
})();
