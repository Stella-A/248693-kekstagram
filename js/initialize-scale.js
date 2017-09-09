'use strict';

(function () {
  window.initializeScale = function (evt, elem, adjustScale) {
    window.MAX_SCALE = 100;
    var MIN_SCALE = 25;
    var STEP_SCALE = 25;
    var resizeControlDec = elem.querySelector('.upload-resize-controls-button-dec');
    var resizeControlInc = elem.querySelector('.upload-resize-controls-button-inc');
    var resizeControls = elem.querySelector('.upload-resize-controls-value');
    var value = parseInt(resizeControls.value, 10);

    switch (evt.target) {
      case resizeControlDec:
        value -= STEP_SCALE;
        value = (value < MIN_SCALE) ? MIN_SCALE : value;
        break;
      case resizeControlInc:
        value += STEP_SCALE;
        value = (value > window.MAX_SCALE) ? window.MAX_SCALE : value;
        break;
    }

    resizeControls.value = value + '%';

    if (typeof adjustScale === 'function') {
      adjustScale(value);
    }
  };
})();
