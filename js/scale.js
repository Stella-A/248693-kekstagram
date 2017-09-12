'use strict';

(function () {
  var MIN_SCALE = 25;
  var STEP_SCALE = 25;

  window.scale = {
    MAX_SCALE: 100,
    initialize: function (elem, onScaleChange) {
      var resizeControlDec = elem.querySelector('.upload-resize-controls-button-dec');
      var resizeControlInc = elem.querySelector('.upload-resize-controls-button-inc');
      var resizeControls = elem.querySelector('.upload-resize-controls-value');
      var value = parseInt(resizeControls.value, 10);

      var onButtonResizeScaleClick = function (evt) {
        switch (evt.target) {
          case resizeControlDec:
            value -= STEP_SCALE;
            value = (value < MIN_SCALE) ? MIN_SCALE : value;
            break;
          case resizeControlInc:
            value += STEP_SCALE;
            value = (value > window.scale.MAX_SCALE) ? window.scale.MAX_SCALE : value;
            break;
        }

        resizeControls.value = value + '%';

        if (typeof onScaleChange === 'function') {
          onScaleChange(value);
        }
      };

      elem.addEventListener('click', onButtonResizeScaleClick);
    },
    setDefault: function (elem, onScaleChange) {
      var resizeControls = elem.querySelector('.upload-resize-controls-value');
      var value = parseInt(resizeControls.value, 10);

      value = window.scale.MAX_SCALE;
      resizeControls.value = value + '%';
      if (typeof onScaleChange === 'function') {
        onScaleChange(value);
      }
    }
  };
})();
