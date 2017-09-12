'use strict';

(function () {
  var MIN_SCALE = 25;
  var STEP_SCALE = 25;
  var scaleElement;
  var onScaleChange;

  var setScaleValue = function (controls, value) {
    controls.value = value + '%';

    if (typeof onScaleChange === 'function') {
      onScaleChange(value);
    }
  };

  window.scale = {
    MAX_SCALE: 100,
    initialize: function (elem, cb) {
      scaleElement = elem;
      onScaleChange = cb;
      var resizeControls = scaleElement.querySelector('.upload-resize-controls-value');
      var resizeControlDec = scaleElement.querySelector('.upload-resize-controls-button-dec');
      var resizeControlInc = scaleElement.querySelector('.upload-resize-controls-button-inc');


      var onButtonResizeScaleClick = function (evt) {
        var value = parseInt(resizeControls.value, 10);
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

        setScaleValue(resizeControls, value);
      };

      scaleElement.addEventListener('click', onButtonResizeScaleClick);
    },
    setDefault: function () {
      var resizeControls = scaleElement.querySelector('.upload-resize-controls-value');
      var value = window.scale.MAX_SCALE;

      setScaleValue(resizeControls, value);
    }
  };
})();
