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
  commentsList.innerHTML = '';
  comments.forEach((comment) => {
    commentsList.appendChild(createComment(comment));
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

  closeButton.addEventListener('click', closeButtonClickHandler);
  document.addEventListener('keydown', documentKeyDownHandler);

  bigPictureSection.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeFullsizeViewer = () => {
  closeButton.removeEventListener('click', closeButtonClickHandler);
  document.removeEventListener('keydown', documentKeyDownHandler);

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
