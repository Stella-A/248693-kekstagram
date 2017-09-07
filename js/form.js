'use strict';

(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var STEP_SCALE = 25;
  var INDEX_OF_STRING = 7;
  var HASHTAG_SIGN = '#';
  var PERCENT_SIGN = '%';
  var PIXEL_SIGN = 'px';
  var MAX_LENGTH_OF_HASHTAG = 5;
  var MAX_CHAR_OF_STRING = 20;
  var CHAR_OF_SPACE = ' ';
  var MAX_VALUE_SLIDER = 455;
  var MIN_VALUE_SLIDER = 0;
  var MAX_PERCENT_VALUE_SLIDER = 100;
  var MAX_VALUE_GRAYSCALE = 1;
  var MAX_VALUE_SEPIA = 1;
  var MAX_VALUE_BLUR = 3;
  var MAX_VALUE_BRIGHTNESS = 3;

  var onResizeControlDec = function (evt) {
    if (resizeControls.value > MIN_SCALE) {
      setResizeControls(evt);
    }
  };

  var onResizeControlInc = function (evt) {
    if (resizeControls.value < MAX_SCALE) {
      setResizeControls(evt);
    }
  };

  var addSlider = function () {
    if (photoPreview.classList.contains('effect-none')) {
      effectSlider.classList.add('hidden');
    } else {
      effectSlider.classList.remove('hidden');
    }
  };

  var setDefaultValueSlider = function () {
    effectLevelSlider.style.left = MAX_PERCENT_VALUE_SLIDER + PERCENT_SIGN;
    effectLevelValueSlider.style.width = MAX_PERCENT_VALUE_SLIDER + PERCENT_SIGN;
  };

  var setDefaultEffectLevel = function () {
    if (photoPreview.classList.contains('effect-chrome')) {
      photoPreview.style.filter = 'grayscale(' + MAX_VALUE_GRAYSCALE + ')';
    } else if (photoPreview.classList.contains('effect-sepia')) {
      photoPreview.style.filter = 'sepia(' + MAX_VALUE_SEPIA + ')';
    } else if (photoPreview.classList.contains('effect-marvin')) {
      photoPreview.style.filter = 'invert(' + MAX_PERCENT_VALUE_SLIDER + PERCENT_SIGN + ')';
    } else if (photoPreview.classList.contains('effect-phobos')) {
      photoPreview.style.filter = 'blur(' + MAX_VALUE_BLUR + PIXEL_SIGN + ')';
    } else if (photoPreview.classList.contains('effect-heat')) {
      photoPreview.style.filter = 'brightness(' + MAX_VALUE_BRIGHTNESS + ')';
    } else {
      photoPreview.style.filter = 'none';
    }
  }

  var onPhotoPreviewEffectClick = function (evt) {
    var target = evt.target;

    if (target.tagName.toLowerCase() === 'input') {
      var effect = target.attributes['id'].nodeValue;

      effect = effect.substr(INDEX_OF_STRING);
      photoPreview.classList.remove(photoPreview.className);
      photoPreview.classList.add(effect);

      addSlider();
      setDefaultValueSlider();
      setDefaultEffectLevel();
    }
  };

  var onInputValidity = function (evt) {
    var arrHashtags = formHashtags.value.split(CHAR_OF_SPACE);

    if (formHashtags.value.trim()) {
      if (checkCharHashtag(arrHashtags)) {
        evt.preventDefault();
        setErrorColorTpField(formHashtags);
      } else if (checkLengthOfString(arrHashtags)) {
        evt.preventDefault();
        setErrorColorTpField(formHashtags);
      } else if (checkMaxCountOfHashtags(arrHashtags)) {
        evt.preventDefault();
        setErrorColorTpField(formHashtags);
      } else if (checkSimilarHashtag(arrHashtags)) {
        evt.preventDefault();
        setErrorColorTpField(formHashtags);
      } else if (checkForSpace(arrHashtags)) {
        evt.preventDefault();
        setErrorColorTpField(formHashtags);
      } else {
        removeErrorColorToField(formHashtags);
      }
    } else {
      removeErrorColorToField(formHashtags);
    }

    if (!formDescription.value || formDescription.validity.tooShort) {
      evt.preventDefault();
      setErrorColorTpField(formDescription);
    } else {
      removeErrorColorToField(formDescription);
    }
  };

  var onOverlayEscPress = function (evt) {
    window.util.isEscPress(evt, closeOverlay);
  };

  var hideBodyScroll = function () {
    document.body.style.overflow = 'hidden';
  }

  var showBodyScroll = function () {
    document.body.style.overflow = 'auto';
  };

  var closeOverlay = function () {
    if (!(formDescription === document.activeElement)) {
      uploadOverlay.classList.add('hidden');
      uploadPhotoInput.value = null;
      resizeControlDec.removeEventListener('click', onResizeControlDec);
      resizeControlInc.removeEventListener('click', onResizeControlInc);
      effectControls.removeEventListener('click', onPhotoPreviewEffectClick);
      formSubmit.removeEventListener('click', onInputValidity);
      document.removeEventListener('keydown', onOverlayEscPress);
      showBodyScroll();
    }
  };

  var openOverlay = function () {
    uploadOverlay.classList.remove('hidden');
    resizeControlDec.addEventListener('click', onResizeControlDec);
    resizeControlInc.addEventListener('click', onResizeControlInc);
    effectControls.addEventListener('click', onPhotoPreviewEffectClick);
    formSubmit.addEventListener('click', onInputValidity);
    document.addEventListener('keydown', onOverlayEscPress);

    if (photoPreview.classList.contains('effect-image-preview')) {
      effectSlider.classList.add('hidden');
    }

    hideBodyScroll();
  };

  var checkSimilarHashtag = function (arr) {
    var obj = {};

    for (var i = 0; i < arr.length; i++) {
      if (obj[arr[i]]) {
        return true;
      }
      obj[arr[i]] = true;
    }
    return false;
  };

  var checkForSpace = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].slice(1).search(HASHTAG_SIGN) !== -1) {
        return true;
      }
    }
    return false;
  };

  var checkCharHashtag = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].slice(0, 1) !== HASHTAG_SIGN) {
        return true;
      }
    }
    return false;
  };

  var checkLengthOfString = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length > MAX_CHAR_OF_STRING) {
        return true;
      }
    }
    return false;
  };

  var checkMaxCountOfHashtags = function (arr) {
    return arr.length > MAX_LENGTH_OF_HASHTAG;
  };

  var setErrorColorTpField = function (element) {
    element.classList.add('upload-message-error');
  };

  var removeErrorColorToField = function (element) {
    element.classList.remove('upload-message-error');
  };

  var setResizeControls = function (evt) {
    var target = evt.target;

    if (target === resizeControlDec) {
      resizeControls.value = +resizeControls.value - STEP_SCALE;
    } else if (target === resizeControlInc) {
      resizeControls.value = +resizeControls.value + STEP_SCALE;
    }

    photoPreview.style.transform = 'scale(' + resizeControls.value / MAX_SCALE + ')';
  };

  var form = document.querySelector('#upload-select-image');
  var uploadPhotoInput = form.querySelector('#upload-file');
  var uploadOverlay = form.querySelector('.upload-overlay');
  var formCancel = form.querySelector('.upload-form-cancel');
  var formDescription = form.querySelector('.upload-form-description');
  var formHashtags = form.querySelector('.upload-form-hashtags');
  var formSubmit = form.querySelector('.upload-form-submit');
  var photoPreview = form.querySelector('.effect-image-preview');
  var resizeControls = form.querySelector('.upload-resize-controls-value');
  var resizeControlDec = form.querySelector('.upload-resize-controls-button-dec');
  var resizeControlInc = form.querySelector('.upload-resize-controls-button-inc');
  var effectControls = form.querySelector('.upload-effect-controls');
  var effectSlider = effectControls.querySelector('.upload-effect-level');
  var effectLevelSlider = effectSlider.querySelector('.upload-effect-level-pin');
  var effectLevelValueSlider = effectSlider.querySelector('.upload-effect-level-val');

  effectLevelSlider.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var sliderValue = effectLevelSlider.offsetLeft - shift.x;
      var effectValue = sliderValue * MAX_PERCENT_VALUE_SLIDER / MAX_VALUE_SLIDER;

      if (sliderValue > MAX_VALUE_SLIDER) {
        effectValue = MAX_PERCENT_VALUE_SLIDER;
        effectLevelSlider.style.left = effectValue + PERCENT_SIGN;
        effectLevelValueSlider.style.width = effectValue + PERCENT_SIGN;
      } else if (sliderValue < MIN_VALUE_SLIDER) {
        effectValue = MIN_VALUE_SLIDER;
        effectLevelSlider.style.left = effectValue + PERCENT_SIGN;
        effectLevelValueSlider.style.width = effectValue + PERCENT_SIGN;
      } else {
        effectLevelSlider.style.left = effectValue + PERCENT_SIGN;
        effectLevelValueSlider.style.width = effectValue + PERCENT_SIGN;
      }

      var setEffectLevel = function () {
        if (photoPreview.classList.contains('effect-chrome')) {
          effectValue = MAX_VALUE_GRAYSCALE * effectValue / MAX_PERCENT_VALUE_SLIDER;
          photoPreview.style.filter = 'grayscale(' + effectValue + ')';
        } else if (photoPreview.classList.contains('effect-sepia')) {
          effectValue = MAX_VALUE_SEPIA * effectValue / MAX_PERCENT_VALUE_SLIDER;
          photoPreview.style.filter = 'sepia(' + effectValue + ')';
        } else if (photoPreview.classList.contains('effect-marvin')) {
          photoPreview.style.filter = 'invert(' + effectValue + PERCENT_SIGN + ')';
        } else if (photoPreview.classList.contains('effect-phobos')) {
          effectValue = MAX_VALUE_BLUR * effectValue / MAX_PERCENT_VALUE_SLIDER;
          photoPreview.style.filter = 'blur(' + effectValue + PIXEL_SIGN + ')';
        } else if (photoPreview.classList.contains('effect-heat')) {
          effectValue = MAX_VALUE_BRIGHTNESS * effectValue / MAX_PERCENT_VALUE_SLIDER;
          photoPreview.style.filter = 'brightness(' + effectValue + ')';
        } else {
          photoPreview.style.filter = 'none';
        }
      };

      setEffectLevel();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  resizeControls.value = MAX_SCALE;

  uploadPhotoInput.addEventListener('change', function () {
    openOverlay();
  });

  formCancel.addEventListener('click', function () {
    closeOverlay();
  });
})();
