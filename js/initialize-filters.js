'use strict';

(function () {
  window.initializeFilters = function (elem, applyFilter) {
    var INDEX_OF_STRING = 7;

    var onPhotoPreviewEffectClick = function (evt) {
      if (evt.target.tagName.toLowerCase() === 'input') {
        if (typeof applyFilter === 'function') {
          var effect = evt.target.attributes['id'].nodeValue;
          effect = effect.substr(INDEX_OF_STRING);
          applyFilter(effect);
        }
      }
    };

    elem.addEventListener('click', onPhotoPreviewEffectClick);
  };
})();
