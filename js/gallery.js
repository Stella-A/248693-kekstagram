'use strict';

(function () {
  var galleryPhotoClose = document.querySelector('.gallery-overlay-close');
  var galleryPhotoImage = document.querySelector('.gallery-overlay-image');
  var filters = document.querySelector('.filters');

  var onOverlayEscPress = function (evt) {
    window.util.isEscPress(evt, closeOverlay);
  };

  var closeOverlay = function () {
    window.preview.galleryPhoto.classList.add('hidden');
    document.removeEventListener('keydown', onOverlayEscPress);
  };

  var photos = [];

  var onSuccess = function (response) {
    photos = response;
    window.pictures.fillDOM(photos);
    filters.classList.remove('hidden');
    window.gallery.removeError();
  };

  var onError = function (message) {
    var node = document.createElement('div');
    node.classList.add('error-message');

    node.textContent = message;
    document.body.prepend(node);
  };

  var getPopularSorted = function (arr) {
    return arr.slice(0).sort(function (left, right) {
      return right.likes - left.likes;
    });
  };

  var getDiscussedSorted = function (arr) {
    return arr.slice(0).sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
  };

  var getRandomSorted = function (arr) {
    var uniqueWizards;
    var sortedArray = [];

    for (var i = 0; i < arr.length; i++) {
      var randomIndex = window.util.getRandomInteger(0, arr.length - 1);
      sortedArray.push(arr[randomIndex]);
      var uniqueWizards = sortedArray.filter(function (it, i) {
        return sortedArray.indexOf(it) === i;
      });
    }

    return uniqueWizards;
  };

  window.backend.load(onSuccess, onError);

  filters.addEventListener('click', function (evt) {
    var target = evt.target;
    var current = evt.currentTarget;

    while (target !== current) {
      if (target.className === 'filters-item') {
        var targetId = target.attributes['for'].nodeValue;

        switch(targetId) {
          case 'filter-recommend':
            window.debounce(function () {
              window.pictures.fillDOM(photos);
            });
            break;
          case 'filter-popular':
            window.debounce(function () {
              window.pictures.fillDOM(getPopularSorted(photos));
            });
            break;
          case 'filter-discussed':
            window.debounce(function () {
              window.pictures.fillDOM(getDiscussedSorted(photos))
            });
            break;
          case 'filter-random':
            window.debounce(function () {
              window.pictures.fillDOM(getRandomSorted(photos))
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
      if (target.className === 'picture') {
        var index = target.attributes['data-id'].nodeValue;

        window.preview.galleryPhoto.classList.remove('hidden');
        window.preview.galleryPhoto.appendChild(window.preview.renderGalleryPhoto(photos[index]));
        galleryPhotoImage.focus();

        return;
      }

      target = target.parentNode;
    }
  });

  galleryPhotoClose.addEventListener('click', closeOverlay);

  galleryPhotoClose.addEventListener('keydown', function (evt) {
    window.util.isEnterPress(evt, closeOverlay);
  });

  window.gallery = {
    removeError: function () {
      if (document.querySelector('.error-message')) {
        document.querySelector('.error-message').classList.add('hidden');
      }
    }
  };
})();
