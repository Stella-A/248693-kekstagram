'use strict';

(function () {
  window.initializeFilters = function (evt, elem, applyFilter) {
    if (evt.target.tagName.toLowerCase() === 'input') {
      if (typeof applyFilter === 'function') {
        applyFilter(evt, elem);
      }
    }
  };
})();
