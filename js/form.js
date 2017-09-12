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

  var addOrRemoveSlider = function (effect) {
    switch (effect) {
      case 'effect-image-preview':
        effectSliderPin.classList.add('hidden');
        break;
      case 'effect-none':
        effectSliderPin.classList.add('hidden');
        break;
      default:
        setSliderValue(MAX_PERCENT_VALUE_SLIDER);
        effectSliderPin.classList.remove('hidden');
    }
  };

  var setSliderValue = function (value) {
    effectLevelSliderPin.style.left = value + PERCENT_SIGN;
    effectSliderValue.style.width = value + PERCENT_SIGN;
  };

  var setPhotoPreviewFilter = function (filter) {
    photoPreview.style.filter = filter;
  };

  var setDefaultEffectLevel = function (effect) {
    switch (effect) {
      case 'effect-chrome':
        setPhotoPreviewFilter('grayscale(' + MAX_VALUE_GRAYSCALE + ')');
        break;
      case 'effect-sepia':
        setPhotoPreviewFilter('sepia(' + MAX_VALUE_SEPIA + ')');
        break;
      case 'effect-marvin':
        setPhotoPreviewFilter('invert(' + MAX_PERCENT_VALUE_SLIDER + PERCENT_SIGN + ')');
        break;
      case 'effect-phobos':
        setPhotoPreviewFilter('blur(' + MAX_VALUE_BLUR + PIXEL_SIGN + ')');
        break;
      case 'effect-heat':
        setPhotoPreviewFilter('brightness(' + MAX_VALUE_BRIGHTNESS + ')');
        break;
      default:
        setPhotoPreviewFilter('none');
    }
  };

  var applyFilter = function (effect) {
    photoPreview.classList.remove(photoPreview.className);
    photoPreview.classList.add(effect);

    addOrRemoveSlider(effect);
    setDefaultEffectLevel(effect);
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
  };

  var showBodyScroll = function () {
    document.body.style.overflow = 'auto';
  };

  var closeOverlay = function () {
    if (!(formDescription === document.activeElement)) {
      uploadOverlay.classList.add('hidden');
      uploadPhotoInput.value = null;

      formSubmit.removeEventListener('click', onInputValidity);
      document.removeEventListener('keydown', onOverlayEscPress);

      showBodyScroll();
      resetForm();
    }
  };

  var openOverlay = function () {
    uploadOverlay.classList.remove('hidden');

    formSubmit.addEventListener('click', onInputValidity);
    document.addEventListener('keydown', onOverlayEscPress);

    addOrRemoveSlider(photoPreview.classList.value);
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

  var adjustScale = function (value) {
    photoPreview.style.transform = 'scale(' + value / window.scale.MAX_SCALE + ')';
  };

  var onError = function (message) {
    var node = document.createElement('div');
    node.classList.add('error-message');

    node.textContent = message;
    document.body.prepend(node);
  };

  var resetForm = function () {
    formHashtags.value = '';
    formDescription.value = '';
    window.gallery.removeError();
    window.scale.setDefault(scaleElement, adjustScale);
    window.filters.setDefault(form, applyFilter);
  };

  var form = document.querySelector('#upload-select-image');
  var uploadPhotoInput = form.querySelector('#upload-file');
  var uploadOverlay = form.querySelector('.upload-overlay');
  var formCancel = form.querySelector('.upload-form-cancel');
  var formDescription = form.querySelector('.upload-form-description');
  var formHashtags = form.querySelector('.upload-form-hashtags');
  var formSubmit = form.querySelector('.upload-form-submit');
  var photoPreview = form.querySelector('.effect-image-preview');
  var scaleElement = form.querySelector('.upload-resize-controls');
  var filterElement = form.querySelector('.upload-effect-controls');
  var effectSliderPin = filterElement.querySelector('.upload-effect-level');
  var effectLevelSliderPin = effectSliderPin.querySelector('.upload-effect-level-pin');
  var effectSliderValue = effectSliderPin.querySelector('.upload-effect-level-val');

  effectLevelSliderPin.addEventListener('mousedown', function (evt) {
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
        var effect = photoPreview.classList.value.slice(7);

        switch (effect) {
          case 'chrome':
            effectValue = MAX_VALUE_GRAYSCALE * effectValue / MAX_PERCENT_VALUE_SLIDER;
            setPhotoPreviewFilter('grayscale(' + effectValue + ')');
            break;
          case 'sepia':
            effectValue = MAX_VALUE_SEPIA * effectValue / MAX_PERCENT_VALUE_SLIDER;
            setPhotoPreviewFilter('sepia(' + effectValue + ')');
            break;
          case 'marvin':
            setPhotoPreviewFilter('invert(' + effectValue + PERCENT_SIGN + ')');
            break;
          case 'phobos':
            effectValue = MAX_VALUE_BLUR * effectValue / MAX_PERCENT_VALUE_SLIDER;
            setPhotoPreviewFilter('blur(' + effectValue + PIXEL_SIGN + ')');
            break;
          case 'heat':
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

  uploadPhotoInput.addEventListener('change', function () {
    openOverlay();
  });

  formCancel.addEventListener('click', function () {
    closeOverlay();
  });

  window.scale.initialize(scaleElement, adjustScale);
  window.filters.initialize(filterElement, applyFilter);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      closeOverlay();
    }, onError);
  });
})();
