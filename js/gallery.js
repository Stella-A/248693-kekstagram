'use strict';

(function () {
  var galleryPhotoClose = document.querySelector('.gallery-overlay-close');
  var galleryPhotoImage = document.querySelector('.gallery-overlay-image');

  var onOverlayEscPress = function (evt) {
    window.util.isEscPress(evt, closeOverlay);
  };

  var closeOverlay = function () {
    window.preview.galleryPhoto.classList.add('hidden');
    document.removeEventListener('keydown', onOverlayEscPress);
  };

  var photos = [];

  window.removeError = function () {
    if (document.querySelector('.error-message')) {
      document.querySelector('.error-message').classList.add('hidden');
    }
  };

  var onSuccess = function (success) {
    photos = success;
    window.pictures.fillDOM(photos);
    window.removeError();
  };

  var onError = function (message) {
    var node = document.createElement('div');
    node.classList.add('error-message');

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onSuccess, onError);

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
})();
