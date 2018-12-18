'use strict';

(function () {
  var lastTimeout;
  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function (pictureArray) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(pictureArray, DEBOUNCE_INTERVAL);
  };
})();
