'use strict';

(function () {
  window.preview = {
    galleryPhoto: document.querySelector('.gallery-overlay'),
    renderGalleryPhoto: function (elem) {
      var url = elem.querySelector('img').getAttribute('src');
      var likes = elem.querySelector('.picture-likes').textContent;
      var comments = elem.querySelector('.picture-comments').textContent;
      var galleryElement = this.galleryPhoto.querySelector('.gallery-overlay-preview');

      galleryElement.querySelector('.gallery-overlay-image').setAttribute('src', url);
      galleryElement.querySelector('.likes-count').textContent = likes;
      galleryElement.querySelector('.comments-count').textContent = comments;

      return galleryElement;
    }
  };
})();
