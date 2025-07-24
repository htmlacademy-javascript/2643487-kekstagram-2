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

const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = `
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
  `;

  return commentElement;
};

const renderComments = (comments) => {
  commentsList.innerHTML = '';
  comments.forEach((comment) => {
    commentsList.appendChild(createCommentElement(comment));
  });
};

const openFullsizeViewer = (photoData) => {
  bigPictureImg.src = photoData.url;
  bigPictureImg.alt = photoData.description;
  likesCount.textContent = photoData.likes;
  commentsTotalCount.textContent = photoData.comments.length;
  commentsShownCount.textContent = photoData.comments.length;
  socialCaption.textContent = photoData.description;

  renderComments(photoData.comments);

  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  closeButton.addEventListener('click', handleCloseClick);
  document.addEventListener('keydown', handleKeyDown);

  bigPictureSection.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeFullsizeViewer = () => {
  closeButton.removeEventListener('click', handleCloseClick);
  document.removeEventListener('keydown', handleKeyDown);

  bigPictureSection.classList.add('hidden');
  body.classList.remove('modal-open');
};

function handleCloseClick() {
  closeFullsizeViewer();
}

function handleKeyDown(evt) {
  if (evt.key === 'Escape') {
    closeFullsizeViewer();
  }
}

export { openFullsizeViewer };
