'use strict';

(function () {
  window.preview = {
    galleryPhoto: document.querySelector('.gallery-overlay'),
    renderGalleryPhoto: function (obj) {
      var galleryElement = this.galleryPhoto.querySelector('.gallery-overlay-preview');

      galleryElement.querySelector('.gallery-overlay-image').setAttribute('src', obj.url);
      galleryElement.querySelector('.likes-count').textContent = obj.likes;
      galleryElement.querySelector('.comments-count').textContent = obj.comments.length;

      return galleryElement;
    }
  };
})();
