const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();

const renderThumbnails = (photosData) => {
  photosData.forEach(({ id, url, likes, comments }) => {
    const thumbnail = pictureTemplate.cloneNode(true);
    const picture = thumbnail.querySelector('.picture');
    const pictureImg = thumbnail.querySelector('.picture__img');
    const pictureLikes = thumbnail.querySelector('.picture__likes');
    const pictureComments = thumbnail.querySelector('.picture__comments');

    picture.dataset.id = id;
    pictureImg.src = url;
    pictureLikes.textContent = likes;
    pictureComments.textContent = comments.length;

    fragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(fragment);
};

export { renderThumbnails };
