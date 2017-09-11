'use strict';

(function () {
  window.initializeScale = function (elem, onScaleChange) {
    window.MAX_SCALE = 100;
    var MIN_SCALE = 25;
    var STEP_SCALE = 25;
    var resizeControlDec = elem.querySelector('.upload-resize-controls-button-dec');
    var resizeControlInc = elem.querySelector('.upload-resize-controls-button-inc');
    var resizeControls = elem.querySelector('.upload-resize-controls-value');
    var value = parseInt(resizeControls.value, 10);

    var resetScale = function () {
      value = window.MAX_SCALE;
      resizeControls.value = value + '%';
      if (typeof onScaleChange === 'function') {
        onScaleChange(value);
      }
    };

    var onButtonResizeScaleClick = function (evt) {
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

      if (typeof onScaleChange === 'function') {
        onScaleChange(value);
      }
    };

    window.form.addEventListener('submit', function () {
      setTimeout( function () {
        value = window.MAX_SCALE;
        resizeControls.value = value + '%';
        if (typeof onScaleChange === 'function') {
          onScaleChange(value);
        }
      }, 10000);
    });

    elem.addEventListener('click', onButtonResizeScaleClick);
  };
})();
