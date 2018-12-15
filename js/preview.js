'use strict';

(function () {
  var socialCommentList = document.querySelector('.social__comments');
  var btnModalClose = document.querySelector('.big-picture__cancel');
  var loadMoreCommentsBtn = document.querySelector('.social__comments-loader');
  var lastIndex = 5;
  var commentsArray = [];
  var showComments = document.querySelector('.social__comment-count');
  var MAX_NUMBER_MESSAGES = 5;

  var removeChild = function (elem) {
    while (elem.firstChild) {
      elem.firstChild.remove();
    }
  };

  var createComments = function (item, count) {
    var fragment = document.createDocumentFragment();
    lastIndex = (item.length > lastIndex) ? lastIndex : item.length;

    removeChild(socialCommentList);

    for (var i = 0; i < lastIndex; i++) {
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
    showComments.innerHTML = lastIndex + ' из <span class="comments-count">' + count + '</span> комментариев';
  };

  var onLoadMoreCommentsBtnClick = function () {
    var moreCommentsArray = commentsArray.slice(0, lastIndex + 5);
    if (commentsArray.length <= lastIndex + 5) {
      loadMoreCommentsBtn.classList.add('visually-hidden');
    }
    lastIndex += MAX_NUMBER_MESSAGES;
    createComments(moreCommentsArray, commentsArray.length);
  };

  var generateBigPicture = function (item) {
    window.data.bigPicture.querySelector('.big-picture__img').querySelector('img').src = item.url;
    window.data.bigPicture.querySelector('.likes-count').textContent = item.likes;
    window.data.bigPicture.querySelector('.comments-count').textContent = item.comments;
    window.data.bigPicture.querySelector('.social__caption').textContent = item.description;
  };

  var closeModal = function () {
    document.body.classList.remove('modal-open');
    window.data.bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBtnModalCloseEscPress);
  };

  var openModal = function () {
    window.data.bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onBtnModalCloseEscPress);
  };

  var onBtnModalCloseClick = function () {
    closeModal();
  };

  var onBtnModalCloseEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closeModal();
    }
  };

  var getPicturePreviewData = function (evt) {
    var target = evt.target.closest('a');
    lastIndex = MAX_NUMBER_MESSAGES;
    loadMoreCommentsBtn.classList.remove('visually-hidden');
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
    createComments(window.picture.data[allPictures.indexOf(target)].comments, window.picture.data[allPictures.indexOf(target)].comments.length);
    commentsArray = window.picture.data[allPictures.indexOf(target)].comments;
    openModal();
  };

  loadMoreCommentsBtn.addEventListener('click', onLoadMoreCommentsBtnClick);
  window.data.blockPictures.addEventListener('click', getPicturePreviewData);
  btnModalClose.addEventListener('click', onBtnModalCloseClick);
})();
