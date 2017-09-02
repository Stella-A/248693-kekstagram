'use strict';

var NUMBERS_OF_PHOTO = 25;
var MIN_NUMBERS_LIKE = 15;
var MAX_NUMBERS_LIKE = 200;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var MIN_SCALE = 25;
var MAX_SCALE = 100;
var INDEX_OF_STRING = 7;
var HASHTAG = '#';
var MAX_NUMBER_OF_HASHTAG = 5;
var MAX_CHAR_OF_STRING = 20;
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
    if (!(formDescription === document.activeElement)) {
      closeOverlay();
    }
  }
};

var closeOverlay = function () {
  galleryPhoto.classList.add('hidden');
  uploadOverlay.classList.add('hidden');

  document.removeEventListener('keydown', onOverlayEscPress);
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
var uploadPhoto = form.querySelector('#upload-file');
var uploadOverlay = form.querySelector('.upload-overlay');
var formCancel = form.querySelector('.upload-form-cancel');
var formDescription = form.querySelector('.upload-form-description');
var formHashtags = form.querySelector('.upload-form-hashtags');
var formSubmit = form.querySelector('.upload-form-submit');
var photo = form.querySelector('.effect-image-preview');
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
    if (arr[i].slice(1).search(HASHTAG) !== -1) {
      return true;
    }
  }
  return false;
};

var checkCharHashtag = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].slice(0, 1) !== HASHTAG) {
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

var checkNumberOfHashtag = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr.length > MAX_NUMBER_OF_HASHTAG) {
      return true;
    }
  }
  return false;
};

resizeControls.value = MAX_SCALE;

uploadPhoto.addEventListener('change', function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onOverlayEscPress);
});

formCancel.addEventListener('click', function () {
  uploadOverlay.classList.add('hidden');
});

formSubmit.addEventListener('click', function (evt) {
  var arrHashtags = formHashtags.value.split(' ');
  if (formHashtags.value.trim()) {
    if (checkCharHashtag(arrHashtags)) {
      evt.preventDefault();
      formHashtags.classList.add('upload-message-error');
    } else if (checkLengthOfString(arrHashtags)) {
      evt.preventDefault();
      formHashtags.classList.add('upload-message-error');
    } else if (checkNumberOfHashtag(arrHashtags)) {
      evt.preventDefault();
      formHashtags.classList.add('upload-message-error');
    } else if (checkSimilarHashtag(arrHashtags)) {
      evt.preventDefault();
      formHashtags.classList.add('upload-message-error');
    } else if (checkForSpace(arrHashtags)) {
      evt.preventDefault();
      formHashtags.classList.add('upload-message-error');
    } else {
      formHashtags.classList.remove('upload-message-error');
    }
  } else {
    formHashtags.classList.remove('upload-message-error');
  }

  if (!formDescription.value || formDescription.validity.tooShort) {
    evt.preventDefault();
    formDescription.classList.add('upload-message-error');
  } else {
    formDescription.classList.remove('upload-message-error');
  }
});

resizeControlDec.addEventListener('click', function () {
  if (resizeControls.value > MIN_SCALE) {
    resizeControls.value = resizeControls.value - MIN_SCALE;
    photo.style.transform = 'scale(' + resizeControls.value / MAX_SCALE + ')';
  }
});

resizeControlInc.addEventListener('click', function () {
  if (resizeControls.value < MAX_SCALE) {
    resizeControls.value = +resizeControls.value + MIN_SCALE;
    photo.style.transform = 'scale(' + resizeControls.value / MAX_SCALE + ')';
  }
});

effectControls.addEventListener('click', function (evt) {
  var target = evt.target;

  if (target.tagName.toLowerCase() === 'input') {
    var effect = target.attributes['id'].nodeValue;

    effect = effect.substr(INDEX_OF_STRING);
    photo.classList.remove(photo.className);
    photo.classList.add(effect);
  }
});
