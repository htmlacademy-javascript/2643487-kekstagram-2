// Утилиты
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length - 1)];
const generateUniqueId = () => {
  let lastId = 0;
  return () => ++lastId;
};

// Константы для генерации
const DESCRIPTIONS = [
  'Прекрасный закат на пляже',
  'Моя кошка спит на диване',
  'Вкусный ужин в ресторане',
  'Горный пейзаж ранним утром',
  'Прогулка по осеннему лесу',
  'Мои новые кроссовки',
  'Отдых у костра с друзьями',
  'Фото с концерта любимой группы',
  'Селфи в зеркале спортзала',
  'Цветущий сад весной'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван', 'Мария', 'Алексей', 'Ольга', 'Дмитрий',
  'Анна', 'Сергей', 'Елена', 'Артём', 'Наталья'
];

const PHOTOS_COUNT = 25;
const COMMENTS_COUNT = 30;
const AVATARS_RANGE = {
  MIN: 1,
  MAX: 6
};

const LIKES_RANGE = {
  MIN: 5,
  MAX: 200
};

// Генерация комментария
const generateComment = (commentIdGenerator) => () => ({
  id: commentIdGenerator(),
  avatar: `img/avatar-${getRandomInteger(AVATARS_RANGE.MIN, AVATARS_RANGE.MAX)}.svg`,
  message: Array.from({ length: getRandomInteger(1, 2) }, () => getRandomArrayItem(MESSAGES)).join(' '),
  name: getRandomArrayItem(NAMES)
});

// Генерация фотографии
const generatePhoto = (photoIdGenerator, commentIdGenerator) => () => {
  const photoId = photoIdGenerator();

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayItem(DESCRIPTIONS),
    likes: getRandomInteger(LIKES_RANGE.MIN, LIKES_RANGE.MAX),
    comments: Array.from(
      { length: getRandomInteger(0, COMMENTS_COUNT) },
      generateComment(commentIdGenerator)
    )
  };
};

// Создание массива фотографий
const createPhotosArray = () => {
  const generatePhotoId = generateUniqueId();
  const generateCommentId = generateUniqueId();

  return Array.from(
    { length: PHOTOS_COUNT },
    generatePhoto(generatePhotoId, generateCommentId)
  );
};

export { createPhotosArray };
