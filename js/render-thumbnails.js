const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();

const renderThumbnails = (photosData) => {
  photosData.forEach(({ id, url, likes, comments }) => {
    const thumbnailElement = pictureTemplate.cloneNode(true);
    const pictureElement = thumbnailElement.querySelector('.picture');
    const imgElement = thumbnailElement.querySelector('.picture__img');
    const likesElement = thumbnailElement.querySelector('.picture__likes');
    const commentsElement = thumbnailElement.querySelector('.picture__comments');

    pictureElement.dataset.id = id;
    imgElement.src = url;
    likesElement.textContent = likes;
    commentsElement.textContent = comments.length;

    fragment.appendChild(thumbnailElement);
  });

  picturesContainer.appendChild(fragment);
};

export { renderThumbnails };
