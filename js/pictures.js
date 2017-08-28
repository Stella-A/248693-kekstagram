'use strict';

var NUMBERS_OF_PHOTO = 25;
var MIN_NUMBERS_LIKE = 15;
var MAX_NUMBERS_LIKE = 200;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
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
  document.removeEventListener('keydown', onOverlayEscPress);
};

var photoTemplate = document.querySelector('#picture-template').content;
var listElement = document.querySelector('.pictures');
var galleryPhoto = document.querySelector('.gallery-overlay');
var galleryPhotoClose = document.querySelector('.gallery-overlay-close');
var galleryPhotoImage = document.querySelector('.gallery-overlay-image');

var photos = createPhotos();

document.querySelector('.upload-overlay').classList.add('hidden');

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
