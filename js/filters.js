'use strict';

(function () {
  var filterElement;
  var onFilterChange;

  window.filters = {
    initialize: function (elem, cb) {
      filterElement = elem;
      onFilterChange = cb;
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

      filterElement.addEventListener('click', onFilterControlClick);
    },
    setDefault: function () {
      var effectNone = document.querySelector('input#upload-effect-none');

      effectNone.checked = true;
      onFilterChange('effect-none');
    }
  };
})();
