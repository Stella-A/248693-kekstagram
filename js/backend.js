'use strict';

(function () {
  var SERVER_URL_SAVE = 'https://1510.dump.academy/kekstagram';
  var SERVER_URL_LOAD = 'https://1510.dump.academy/kekstagram/data';
  var STATUS_OK = 200;
  var TIMEOUT = 30000;

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка: ' + xhr.status);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('POST', SERVER_URL_SAVE);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('GET', SERVER_URL_LOAD);
      xhr.send();
    }
  };
})();
