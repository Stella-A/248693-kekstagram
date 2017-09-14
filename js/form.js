'use strict';

(function () {
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
  var IMAGE_PREVIEW = 'effect-image-preview';
  var EFFECT_NONE = 'effect-none';
  var EFFECT_CHROME = 'effect-chrome';
  var EFFECT_SEPIA = 'effect-sepia';
  var EFFECT_MARVIN = 'effect-marvin';
  var EFFECT_PHOBOS = 'effect-phobos';
  var EFFECT_HEAT = 'effect-heat';

  var addOrRemoveSlider = function (effect) {
    switch (effect) {
      case IMAGE_PREVIEW:
        effectSliderPinElement.classList.add('hidden');
        break;
      case EFFECT_NONE:
        effectSliderPinElement.classList.add('hidden');
        break;
      default:
        setSliderValue(MAX_PERCENT_VALUE_SLIDER);
        effectSliderPinElement.classList.remove('hidden');
    }
  };

  var setSliderValue = function (value) {
    effectLevelSliderPinElement.style.left = value + PERCENT_SIGN;
    effectSliderValueElement.style.width = value + PERCENT_SIGN;
  };

  var setPhotoPreviewFilter = function (filter) {
    photoPreviewElement.style.filter = filter;
  };

  var setDefaultEffectLevel = function (effect) {
    switch (effect) {
      case EFFECT_CHROME:
        setPhotoPreviewFilter('grayscale(' + MAX_VALUE_GRAYSCALE + ')');
        break;
      case EFFECT_SEPIA:
        setPhotoPreviewFilter('sepia(' + MAX_VALUE_SEPIA + ')');
        break;
      case EFFECT_MARVIN:
        setPhotoPreviewFilter('invert(' + MAX_PERCENT_VALUE_SLIDER + PERCENT_SIGN + ')');
        break;
      case EFFECT_PHOBOS:
        setPhotoPreviewFilter('blur(' + MAX_VALUE_BLUR + PIXEL_SIGN + ')');
        break;
      case EFFECT_HEAT:
        setPhotoPreviewFilter('brightness(' + MAX_VALUE_BRIGHTNESS + ')');
        break;
      default:
        setPhotoPreviewFilter('none');
    }
  };

  var applyFilter = function (effect) {
    photoPreviewElement.classList.remove(photoPreviewElement.className);
    photoPreviewElement.classList.add(effect);

    addOrRemoveSlider(effect);
    setDefaultEffectLevel(effect);
  };

  var onInputValidity = function (evt) {
    var arrHashtags = formHashtagsElement.value.split(CHAR_OF_SPACE);

    if (formHashtagsElement.value.trim()) {
      if (checkCharHashtag(arrHashtags)) {
        evt.preventDefault();
        setErrorColorToField(formHashtagsElement);
      } else if (checkLengthOfString(arrHashtags)) {
        evt.preventDefault();
        setErrorColorToField(formHashtagsElement);
      } else if (checkMaxCountOfHashtags(arrHashtags)) {
        evt.preventDefault();
        setErrorColorToField(formHashtagsElement);
      } else if (checkSimilarHashtag(arrHashtags)) {
        evt.preventDefault();
        setErrorColorToField(formHashtagsElement);
      } else if (checkForSpace(arrHashtags)) {
        evt.preventDefault();
        setErrorColorToField(formHashtagsElement);
      } else {
        removeErrorColorToField(formHashtagsElement);
      }
    } else {
      removeErrorColorToField(formHashtagsElement);
    }

    if (formDescriptionElement.validity.tooLong) {
      evt.preventDefault();
      setErrorColorToField(formDescriptionElement);
    } else {
      removeErrorColorToField(formDescriptionElement);
    }
  };

  var onOverlayEscPress = function (evt) {
    window.util.isEscPress(evt, closeOverlay);
  };

  var hideBodyScroll = function () {
    document.body.style.overflow = 'hidden';
  };

  var showBodyScroll = function () {
    document.body.style.overflow = 'auto';
  };

  var closeOverlay = function () {
    if (!(formDescriptionElement === document.activeElement)) {
      uploadOverlayElement.classList.add('hidden');
      uploadPhotoInputElement.value = null;

      formSubmitElement.removeEventListener('click', onInputValidity);
      document.removeEventListener('keydown', onOverlayEscPress);

      showBodyScroll();
      resetForm();
    }
  };

  var openOverlay = function () {
    uploadOverlayElement.classList.remove('hidden');

    formSubmitElement.addEventListener('click', onInputValidity);
    document.addEventListener('keydown', onOverlayEscPress);

    addOrRemoveSlider(photoPreviewElement.classList.value);
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

  var setErrorColorToField = function (element) {
    element.classList.add('upload-message-error');
  };

  var removeErrorColorToField = function (element) {
    element.classList.remove('upload-message-error');
  };

  var adjustScale = function (value) {
    photoPreviewElement.style.transform = 'scale(' + value / window.scale.MAX_SCALE + ')';
  };

  var onError = function (message) {
    var node = document.createElement('div');
    node.classList.add('error-message');

    node.textContent = message;
    document.body.prepend(node);
  };

  var resetForm = function () {
    formHashtagsElement.value = '';
    formDescriptionElement.value = '';
    window.gallery.removeError();
    window.scale.setDefault();
    window.filters.setDefault();
  };

  var formElement = document.querySelector('#upload-select-image');
  var uploadPhotoInputElement = formElement.querySelector('#upload-file');
  var uploadOverlayElement = formElement.querySelector('.upload-overlay');
  var formCancelElement = formElement.querySelector('.upload-form-cancel');
  var formDescriptionElement = formElement.querySelector('.upload-form-description');
  var formHashtagsElement = formElement.querySelector('.upload-form-hashtags');
  var formSubmitElement = formElement.querySelector('.upload-form-submit');
  var photoPreviewElement = formElement.querySelector('.effect-image-preview');
  var scaleElement = formElement.querySelector('.upload-resize-controls');
  var filterElement = formElement.querySelector('.upload-effect-controls');
  var effectSliderPinElement = filterElement.querySelector('.upload-effect-level');
  var effectLevelSliderPinElement = effectSliderPinElement.querySelector('.upload-effect-level-pin');
  var effectSliderValueElement = effectSliderPinElement.querySelector('.upload-effect-level-val');

  effectLevelSliderPinElement.addEventListener('mousedown', function (evt) {
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

      var sliderValue = evt.target.offsetLeft - shift.x;
      var effectValue = sliderValue * MAX_PERCENT_VALUE_SLIDER / MAX_VALUE_SLIDER;

      if (sliderValue > MAX_VALUE_SLIDER) {
        effectValue = MAX_PERCENT_VALUE_SLIDER;
        setSliderValue(effectValue);
      } else if (sliderValue < MIN_VALUE_SLIDER) {
        effectValue = MIN_VALUE_SLIDER;
        setSliderValue(effectValue);
      } else {
        setSliderValue(effectValue);
      }

      var setEffectLevel = function () {
        var effect = photoPreviewElement.classList.value;

        switch (effect) {
          case EFFECT_CHROME:
            effectValue = MAX_VALUE_GRAYSCALE * effectValue / MAX_PERCENT_VALUE_SLIDER;
            setPhotoPreviewFilter('grayscale(' + effectValue + ')');
            break;
          case EFFECT_SEPIA:
            effectValue = MAX_VALUE_SEPIA * effectValue / MAX_PERCENT_VALUE_SLIDER;
            setPhotoPreviewFilter('sepia(' + effectValue + ')');
            break;
          case EFFECT_MARVIN:
            setPhotoPreviewFilter('invert(' + effectValue + PERCENT_SIGN + ')');
            break;
          case EFFECT_PHOBOS:
            effectValue = MAX_VALUE_BLUR * effectValue / MAX_PERCENT_VALUE_SLIDER;
            setPhotoPreviewFilter('blur(' + effectValue + PIXEL_SIGN + ')');
            break;
          case EFFECT_HEAT:
            effectValue = MAX_VALUE_BRIGHTNESS * effectValue / MAX_PERCENT_VALUE_SLIDER;
            setPhotoPreviewFilter('brightness(' + effectValue + ')');
            break;
          default:
            setPhotoPreviewFilter('none');
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

  uploadPhotoInputElement.addEventListener('change', function () {
    openOverlay();
  });

  formCancelElement.addEventListener('click', function () {
    closeOverlay();
  });

  window.scale.initialize(scaleElement, adjustScale);
  window.filters.initialize(filterElement, applyFilter);

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formElement), function () {
      closeOverlay();
    }, onError);
  });
})();
