'use strict';

var NUMBERS_OF_PHOTO = 25;
var MIN_NUMBERS_LIKE = 15;
var MAX_NUMBERS_LIKE = 200;
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

var getURL = function (index) {
  return 'photos/' + index + '.jpg';
};

var createPhotos = function (arr) {
  arr = [];

  for (var i = 1; i <= NUMBERS_OF_PHOTO; i++) {
    arr.push({
      url: getURL(i),
      likes: getRandomInteger(MIN_NUMBERS_LIKE, MAX_NUMBERS_LIKE),
      comments: getRandomComments()
    });
  }

  return arr;
};

var renderPhoto = function (obj) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('img').setAttribute('src', obj.url);
  photoElement.querySelector('.picture-likes').textContent = obj.likes;
  photoElement.querySelector('.picture-comments').textContent = obj.comments.length;

  return photoElement;
};

var renderGalleryPhoto = function (obj) {
  var photoElement = overlayPhoto.querySelector('.gallery-overlay-preview');

  photoElement.querySelector('.gallery-overlay-image').setAttribute('src', obj.url);
  photoElement.querySelector('.likes-count').textContent = obj.likes;
  photoElement.querySelector('.comments-count').textContent = obj.comments.length;

  return photoElement;
};

var fillDOM = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPhoto(arr[i]));
  }

  listElement.appendChild(fragment);
};

var photoTemplate = document.querySelector('#picture-template').content;
var listElement = document.querySelector('.pictures');
var overlayPhoto = document.querySelector('.gallery-overlay');

var photos = createPhotos();

document.querySelector('.upload-overlay').classList.add('hidden');

fillDOM(photos);

overlayPhoto.classList.remove('hidden');

overlayPhoto.appendChild(renderGalleryPhoto(photos[0]));
