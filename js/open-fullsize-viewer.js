const body = document.body;
const bigPictureSection = document.querySelector('.big-picture');
const closeButton = bigPictureSection.querySelector('.big-picture__cancel');
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img img');
const likesCount = bigPictureSection.querySelector('.likes-count');
const commentsCount = bigPictureSection.querySelector('.social__comment-count');
const commentsTotalCount = bigPictureSection.querySelector('.social__comment-total-count');
const commentsShownCount = bigPictureSection.querySelector('.social__comment-shown-count');
const commentsLoader = bigPictureSection.querySelector('.comments-loader');
const socialCaption = bigPictureSection.querySelector('.social__caption');
const commentsList = bigPictureSection.querySelector('.social__comments');

const COMMENTS_PER_LOAD = 5; //Количество комментариев для одной загрузки
let currentComments = []; //Хранит все комментарии текущего фото
let displayedCommentsCount = 0; //Cчетчик показанных комментариев

const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  comment.innerHTML = `
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
  `;

  return comment;
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.appendChild(createComment(comment));
  });
  commentsList.appendChild(fragment);

  // Обновляем счетчики
  displayedCommentsCount += comments.length;
  commentsShownCount.textContent = displayedCommentsCount;
  commentsTotalCount.textContent = currentComments.length;

  // Скрываем кнопку, если все комментарии показаны
  commentsLoader.classList.toggle('hidden', displayedCommentsCount >= currentComments.length);
};

const commentsLoaderHandler = () => {
  const nextComments = currentComments.slice(displayedCommentsCount, displayedCommentsCount + COMMENTS_PER_LOAD);
  renderComments(nextComments);
};

const openFullsizeViewer = (photoData) => {
  bigPictureImg.src = photoData.url;
  bigPictureImg.alt = photoData.description;
  likesCount.textContent = photoData.likes;
  socialCaption.textContent = photoData.description;

  // Инициализация комментариев
  currentComments = photoData.comments;
  displayedCommentsCount = 0;
  commentsList.innerHTML = '';

  // Показываем элементы управления комментариями
  commentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  // Загружаем первую порцию комментариев
  commentsLoaderHandler();

  // Назначаем обработчики
  closeButton.addEventListener('click', closeButtonClickHandler);
  document.addEventListener('keydown', documentKeyDownHandler);
  commentsLoader.addEventListener('click', commentsLoaderHandler);

  bigPictureSection.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeFullsizeViewer = () => {
  closeButton.removeEventListener('click', closeButtonClickHandler);
  document.removeEventListener('keydown', documentKeyDownHandler);
  commentsLoader.removeEventListener('click', commentsLoaderHandler);

  bigPictureSection.classList.add('hidden');
  body.classList.remove('modal-open');
};

function closeButtonClickHandler() {
  closeFullsizeViewer();
}

function documentKeyDownHandler(evt) {
  if (evt.key === 'Escape') {
    closeFullsizeViewer();
  }
}

export { openFullsizeViewer };
