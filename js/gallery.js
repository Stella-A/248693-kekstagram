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

  var photos = window.data.createPhotos();

  window.pictures.fillDOM(photos);

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
