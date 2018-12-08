'use strict';

(function () {
  window.gallery = {
    // Отрисовываем картинки
    renderPictures: function (array) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(window.data.createItem(array[i]));
      }
      window.data.blockPictures.appendChild(fragment);
    },
    // Создаем большую картинку
    generateBigPicture: function (item) {
      window.data.bigPicture.querySelector('.big-picture__img').querySelector('img').src = item.url;
      window.data.bigPicture.querySelector('.likes-count').textContent = item.likes;
      window.data.bigPicture.querySelector('.comments-count').textContent = item.comments;
      createComments(window.data.mockPicturesArray[0], 2);
    }
  };

  // Создаем случайную аватарку
  var getRandomAvatar = function () {
    return 'img/avatar-' + window.data.getRandomNumber(1, window.data.AVATAR_COUNT) + '.svg';
  };

  var removeChild = function (elem) {
    while (elem.firstChild) {
      elem.firstChild.remove();
    }
  };

  // Создаем комментарии
  var createComments = function (item, count) {
    var fragment = document.createDocumentFragment();
    removeChild(window.data.socialCommentList);

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

    window.data.socialCommentList.appendChild(fragment);
  };
})();
