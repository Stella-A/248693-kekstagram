'use strict';

(function () {
  var MIN_SCALE = 25;
  var STEP_SCALE = 25;
  var scaleElement;
  var onScaleChange;
  var resizeControlsElement;

  var setScaleValue = function (controls, value) {
    controls.value = value + '%';

    onScaleChange(value);
  };

  window.scale = {
    MAX_SCALE: 100,
    initialize: function (elem, cb) {
      scaleElement = elem;
      onScaleChange = cb;
      resizeControlsElement = scaleElement.querySelector('.upload-resize-controls-value');
      var resizeControlDecElement = scaleElement.querySelector('.upload-resize-controls-button-dec');
      var resizeControlIncElement = scaleElement.querySelector('.upload-resize-controls-button-inc');


      var onButtonResizeScaleClick = function (evt) {
        var value = parseInt(resizeControlsElement.value, 10);
        switch (evt.target) {
          case resizeControlDecElement:
            value -= STEP_SCALE;
            value = (value < MIN_SCALE) ? MIN_SCALE : value;
            break;
          case resizeControlIncElement:
            value += STEP_SCALE;
            value = (value > window.scale.MAX_SCALE) ? window.scale.MAX_SCALE : value;
            break;
        }

        setScaleValue(resizeControlsElement, value);
      };

      scaleElement.addEventListener('click', onButtonResizeScaleClick);
    },
    setDefault: function () {
      var value = window.scale.MAX_SCALE;

      setScaleValue(resizeControlsElement, value);
    }
  };
})();
