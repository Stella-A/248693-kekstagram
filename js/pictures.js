'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);

  return rand;
}

var getRandomComment = function (arr) {
  var comments = [];

  for (var i = 0; i < getRandomInteger(1, 2); i++) {
    comments[i] = arr[getRandomInteger(0, arr.length - 1)];
  }

  return comments.length;
}

var getURL = function (min, max) {
  for (var i = 0; min <= max; i++, min++) {
    photos[i] = 'photos/' + min + '.jpg';
  }

  return photos;
}

var createPhotos = function (arr) {
  for (var j = 0; j < 25; j++) {
    photoUsers[j] = {
      url: arr[j],
      likes: getRandomInteger(15, 200),
      comments: getRandomComment(COMMENTS)
    }
  }

  return photoUsers;
}

var renderPhoto = function (obj) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('img').setAttribute('src', obj.url);
  photoElement.querySelector('.picture-likes').textContent = obj.likes;
  photoElement.querySelector('.picture-comments').textContent = obj.comments;

  return photoElement;
};

var showPhoto = function (obj) {
  var photoElement = overlayPhoto.querySelector('.gallery-overlay-preview');
  obj = obj[0];

  photoElement.querySelector('.gallery-overlay-image').setAttribute('src', obj.url);
  photoElement.querySelector('.likes-count').textContent = obj.likes;
  photoElement.querySelector('.comments-count').textContent = obj.comments;

  return photoElement;
}

var fillDOM = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPhoto(arr[i]));
  }

  listElement.appendChild(fragment);
};

var photoTemplate = document.querySelector('#picture-template').content;

var listElement = document.querySelector('.pictures');

var photos = [];
var photoUsers = [];

getURL(1, 25);

document.querySelector('.upload-overlay').classList.add('hidden');

createPhotos(photos);

fillDOM(photoUsers);

var overlayPhoto = document.querySelector('.gallery-overlay');
overlayPhoto.classList.remove('hidden');

overlayPhoto.appendChild(showPhoto(photoUsers));
