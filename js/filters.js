'use strict';

(function () {
  window.filters = {
    initialize: function (elem, onFilterChange) {
      var INDEX_OF_STRING = 7;

      var onFilterControlClick = function (evt) {
        if (evt.target.tagName.toLowerCase() === 'input') {
          if (typeof onFilterChange === 'function') {
            var effect = evt.target.attributes['id'].nodeValue;
            effect = effect.substr(INDEX_OF_STRING);
            onFilterChange(effect);
          }
        }
      };

      elem.addEventListener('click', onFilterControlClick);
    },
    setDefault: function (elem, onFilterChange) {
      var effectNone = elem.querySelector('input#upload-effect-none');

      effectNone.checked = true;
      onFilterChange('effect-none');
    }
  };
})();
