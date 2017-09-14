'use strict';

(function () {
  var INDEX_OF_STRING = 7;
  var filterElement;
  var onFilterChange;

  window.filters = {
    initialize: function (elem, cb) {
      filterElement = elem;
      onFilterChange = cb;

      var onFilterControlClick = function (evt) {
        if (evt.target.tagName.toLowerCase() === 'input') {
          var effect = evt.target.attributes['id'].nodeValue;
          effect = effect.substr(INDEX_OF_STRING);
          onFilterChange(effect);
        }
      };

      filterElement.addEventListener('click', onFilterControlClick);
    },
    setDefault: function () {
      var effectNoneElement = document.querySelector('input#upload-effect-none');

      effectNoneElement.checked = true;
      onFilterChange('effect-none');
    }
  };
})();
