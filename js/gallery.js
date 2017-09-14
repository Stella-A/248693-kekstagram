'use strict';

(function () {
  var FILTER_ITEM = 'filters-item';
  var FILTER_RECOMMEND = 'filter-recommend';
  var FILTER_POPULAR = 'filter-popular';
  var FILTER_DISCUSSED = 'filter-discussed';
  var FILTER_RANDOM = 'filter-random';
  var PICTURE_ITEM = 'picture';
  var galleryPhotoCloseElement = document.querySelector('.gallery-overlay-close');
  var galleryPhotoImageElement = document.querySelector('.gallery-overlay-image');
  var filtersElement = document.querySelector('.filters');

  var onOverlayEscPress = function (evt) {
    window.util.isEscPress(evt, closeOverlay);
  };

  var closeOverlay = function () {
    window.preview.hide();
    document.removeEventListener('keydown', onOverlayEscPress);
  };

  var photos = [];

  var onDataLoadSuccess = function (response) {
    photos = response.map(function (photo, index) {
      photo.id = index;
      return photo;
    });
    window.pictures.fillDOM(photos);
    filtersElement.classList.remove('hidden');
    window.gallery.removeError();
  };

  var onDataLoadError = function (message) {
    var nodeElement = document.createElement('div');
    nodeElement.classList.add('error-message');

    nodeElement.textContent = message;
    document.body.prepend(nodeElement);
  };

  var sortByPopular = function (arr) {
    return arr.slice().sort(function (left, right) {
      return right.likes - left.likes;
    });
  };

  var sortByDiscussed = function (arr) {
    return arr.slice().sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
  };

  var sortByRandom = function (arr) {
    return arr.slice().sort(function () {
      return 0.5 - Math.random();
    });
  };

  window.backend.load(onDataLoadSuccess, onDataLoadError);

  filtersElement.addEventListener('click', function (evt) {
    var target = evt.target;
    var current = evt.currentTarget;

    while (target !== current) {
      if (target.className === FILTER_ITEM) {
        var targetId = target.attributes['for'].nodeValue;

        switch (targetId) {
          case FILTER_RECOMMEND:
            window.debounce(function () {
              window.pictures.fillDOM(photos);
            });
            break;
          case FILTER_POPULAR:
            window.debounce(function () {
              window.pictures.fillDOM(sortByPopular(photos));
            });
            break;
          case FILTER_DISCUSSED:
            window.debounce(function () {
              window.pictures.fillDOM(sortByDiscussed(photos));
            });
            break;
          case FILTER_RANDOM:
            window.debounce(function () {
              window.pictures.fillDOM(sortByRandom(photos));
            });
            break;
        }

        return;
      }

      target = target.parentNode;
    }
  });

  window.pictures.listElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target;
    var current = evt.currentTarget;

    document.addEventListener('keydown', onOverlayEscPress);

    while (target !== current) {
      if (target.className === PICTURE_ITEM) {
        var index = target.attributes['data-id'].nodeValue;

        window.preview.show();
        window.preview.galleryPhotoElement.appendChild(window.preview.renderGalleryPhoto(photos[index]));
        galleryPhotoImageElement.focus();

        return;
      }

      target = target.parentNode;
    }
  });

  galleryPhotoCloseElement.addEventListener('click', closeOverlay);

  galleryPhotoCloseElement.addEventListener('keydown', function (evt) {
    window.util.isEnterPress(evt, closeOverlay);
  });

  window.gallery = {
    removeError: function () {
      var errorElement = document.querySelector('.error-message');
      if (errorElement) {
        errorElement.classList.add('hidden');
      }
    }
  };
})();
