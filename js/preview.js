'use strict';

(function () {
  window.preview = {
    galleryPhoto: document.querySelector('.gallery-overlay'),
    renderGalleryPhoto: function (obj) {
//      var url = elem.querySelector('img').getAttribute('src');
//      var likes = elem.querySelector('.picture-likes').textContent;
//      var comments = elem.querySelector('.picture-comments').textContent;
//      var galleryElement = this.galleryPhoto.querySelector('.gallery-overlay-preview');
//
//      galleryElement.querySelector('.gallery-overlay-image').setAttribute('src', url);
//      galleryElement.querySelector('.likes-count').textContent = likes;
//      galleryElement.querySelector('.comments-count').textContent = comments;
      var galleryElement = this.galleryPhoto.querySelector('.gallery-overlay-preview');

      galleryElement.querySelector('.gallery-overlay-image').setAttribute('src', obj.url);
      galleryElement.querySelector('.likes-count').textContent = obj.likes;
      galleryElement.querySelector('.comments-count').textContent = obj.comments.length;

      return galleryElement;
    }
  };
})();
