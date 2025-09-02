import { renderThumbnails } from './render-thumbnails.js';
import { openFullsizeViewer } from './open-fullsize-viewer.js';

const picturesContainer = document.querySelector('.pictures');
let photos = [];

const onThumbnailClick = (evt) => {
  const thumbnail = evt.target.closest('[data-id]');
  if (!thumbnail) {
    return;
  }

  evt.preventDefault();
  const photoId = parseInt(thumbnail.dataset.id, 10);
  const photoData = photos.find((item) => item.id === photoId);

  if (photoData) {
    openFullsizeViewer(photoData);
  }
};

const clickHandler = (evt) => onThumbnailClick(evt);
picturesContainer.addEventListener('click', clickHandler);

const initGallery = (photosData) => {
  photos = photosData;
  renderThumbnails(photos);
};

export { initGallery };
