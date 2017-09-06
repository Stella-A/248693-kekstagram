'use strict';

(function () {
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

  var getRandomComments = function () {
    var comments = [];

    for (var i = 0; i < window.util.getRandomInteger(1, 2); i++) {
      comments[i] = COMMENTS[window.util.getRandomInteger(0, COMMENTS.length - 1)];
    }

    return comments;
  };

  var getUrl = function (index) {
    return 'photos/' + index + '.jpg';
  };

  window.data = {
    createPhotos: function () {
      var arr = [];

      for (var i = 1; i <= NUMBERS_OF_PHOTO; i++) {
        arr.push({
          url: getUrl(i),
          likes: window.util.getRandomInteger(MIN_NUMBERS_LIKE, MAX_NUMBERS_LIKE),
          comments: getRandomComments()
        });
      }

      return arr;
    }
  };
})();
