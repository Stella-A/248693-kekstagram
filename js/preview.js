'use strict';

(function () {
  window.preview = {
    galleryPhotoElement: document.querySelector('.gallery-overlay'),
    renderGalleryPhoto: function (obj) {
      var galleryElement = window.preview.galleryPhotoElement.querySelector('.gallery-overlay-preview');

      galleryElement.querySelector('.gallery-overlay-image').setAttribute('src', obj.url);
      galleryElement.querySelector('.likes-count').textContent = obj.likes;
      galleryElement.querySelector('.comments-count').textContent = obj.comments.length;

      return galleryElement;
    },
    hide: function () {
      this.galleryPhotoElement.classList.add('hidden');
    },
    show: function () {
      this.galleryPhotoElement.classList.remove('hidden');
    }
  };
})();
