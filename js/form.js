'use strict';

(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var STEP_SCALE = 25;
  var INDEX_OF_STRING = 7;
  var HASHTAG_SIGN = '#';
  var MAX_LENGTH_OF_HASHTAG = 5;
  var MAX_CHAR_OF_STRING = 20;
  var CHAR_OF_SPACE = ' ';

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

  var onPhotoPreviewEffectClick = function (evt) {
    var target = evt.target;

    if (target.tagName.toLowerCase() === 'input') {
      var effect = target.attributes['id'].nodeValue;

      effect = effect.substr(INDEX_OF_STRING);
      photoPreview.classList.remove(photoPreview.className);
      photoPreview.classList.add(effect);
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

  var closeOverlay = function () {
    if (!(formDescription === document.activeElement)) {
      uploadOverlay.classList.add('hidden');
      uploadPhotoInput.value = null;
      resizeControlDec.removeEventListener('click', onResizeControlDec);
      resizeControlInc.removeEventListener('click', onResizeControlInc);
      effectControls.removeEventListener('click', onPhotoPreviewEffectClick);
      formSubmit.removeEventListener('click', onInputValidity);
      document.removeEventListener('keydown', onOverlayEscPress);
    }
  };

  var openOverlay = function () {
    uploadOverlay.classList.remove('hidden');
    resizeControlDec.addEventListener('click', onResizeControlDec);
    resizeControlInc.addEventListener('click', onResizeControlInc);
    effectControls.addEventListener('click', onPhotoPreviewEffectClick);
    formSubmit.addEventListener('click', onInputValidity);
    document.addEventListener('keydown', onOverlayEscPress);
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

  resizeControls.value = MAX_SCALE;

  uploadPhotoInput.addEventListener('change', function () {
    openOverlay();
  });

  formCancel.addEventListener('click', function () {
    closeOverlay();
  });
})();
