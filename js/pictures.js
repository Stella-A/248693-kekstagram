'use strict';

var NUMBERS_OF_PHOTO = 25;
var MIN_NUMBERS_LIKE = 15;
var MAX_NUMBERS_LIKE = 200;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var MIN_SCALE = 25;
var MAX_SCALE = 100;
var STEP_SCALE = 25;
var INDEX_OF_STRING = 7;
var HASHTAG_SIGN = '#';
var MAX_LENGTH_OF_HASHTAG = 5;
var MAX_CHAR_OF_STRING = 20;
var CHAR_OF_SPACE = ' ';
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);

  return rand;
};

var getRandomComments = function () {
  var comments = [];

  for (var i = 0; i < getRandomInteger(1, 2); i++) {
    comments[i] = COMMENTS[getRandomInteger(0, COMMENTS.length - 1)];
  }

  return comments;
};

var getUrl = function (index) {
  return 'photos/' + index + '.jpg';
};

var createPhotos = function () {
  var arr = [];

  for (var i = 1; i <= NUMBERS_OF_PHOTO; i++) {
    arr.push({
      url: getUrl(i),
      likes: getRandomInteger(MIN_NUMBERS_LIKE, MAX_NUMBERS_LIKE),
      comments: getRandomComments()
    });
  }

  return arr;
};

var renderPhoto = function (obj, index) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture').setAttribute('data-id', index);
  photoElement.querySelector('img').setAttribute('src', obj.url);
  photoElement.querySelector('.picture-likes').textContent = obj.likes;
  photoElement.querySelector('.picture-comments').textContent = obj.comments.length;

  return photoElement;
};

var renderGalleryPhoto = function (obj) {
  var galleryElement = galleryPhoto.querySelector('.gallery-overlay-preview');

  galleryElement.querySelector('.gallery-overlay-image').setAttribute('src', obj.url);
  galleryElement.querySelector('.likes-count').textContent = obj.likes;
  galleryElement.querySelector('.comments-count').textContent = obj.comments.length;

  return galleryElement;
};

var fillDOM = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPhoto(arr[i], i));
  }

  listElement.appendChild(fragment);
};

var onOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeOverlay();
  }
};

var closeOverlay = function () {
  galleryPhoto.classList.add('hidden');

  if (!(formDescription === document.activeElement)) {
    uploadOverlay.classList.add('hidden');
    uploadPhotoInput.value = null;
  }

  resizeControlDec.removeEventListener('click', onResizeControlDec);
  resizeControlInc.removeEventListener('click', onResizeControlInc);
  effectControls.removeEventListener('click', onPhotoPreviewEffectClick);
  formSubmit.removeEventListener('click', onInputValidity);
  document.removeEventListener('keydown', onOverlayEscPress);
};

var openOverlay = function () {
  uploadOverlay.classList.remove('hidden');
  resizeControlDec.addEventListener('click', onResizeControlDec);
  resizeControlInc.addEventListener('click', onResizeControlInc);
  effectControls.addEventListener('click', onPhotoPreviewEffectClick);
  formSubmit.addEventListener('click', onInputValidity);
  document.addEventListener('keydown', onOverlayEscPress);
};

var photoTemplate = document.querySelector('#picture-template').content;
var listElement = document.querySelector('.pictures');
var galleryPhoto = document.querySelector('.gallery-overlay');
var galleryPhotoClose = document.querySelector('.gallery-overlay-close');
var galleryPhotoImage = document.querySelector('.gallery-overlay-image');

var photos = createPhotos();

fillDOM(photos);

listElement.addEventListener('click', function (evt) {
  evt.preventDefault();
  var target = evt.target;
  var current = evt.currentTarget;

  document.addEventListener('keydown', onOverlayEscPress);

  while (target !== current) {
    if (target.className === 'picture') {
      var index = target.attributes['data-id'].nodeValue;

      galleryPhoto.classList.remove('hidden');
      galleryPhoto.appendChild(renderGalleryPhoto(photos[index]));
      galleryPhotoImage.focus();

      return;
    }

    target = target.parentNode;
  }
});

galleryPhotoClose.addEventListener('click', closeOverlay);

galleryPhotoClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeOverlay();
  }
});

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

var onPhotoPreviewEffectClick = function (evt) {
  var target = evt.target;

  if (target.tagName.toLowerCase() === 'input') {
    var effect = target.attributes['id'].nodeValue;

    effect = effect.substr(INDEX_OF_STRING);
    photoPreview.classList.remove(photoPreview.className);
    photoPreview.classList.add(effect);
  }
};

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

resizeControls.value = MAX_SCALE;


uploadPhotoInput.addEventListener('change', function () {
  openOverlay();
});

formCancel.addEventListener('click', function () {
  closeOverlay();
});
