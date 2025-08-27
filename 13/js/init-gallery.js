import { renderThumbnails } from './render-thumbnails.js';
import { openFullsizeViewer } from './open-fullsize-viewer.js';

const picturesContainer = document.querySelector('.pictures');

const onThumbnailClick = (evt, photosData) => {
  const thumbnail = evt.target.closest('[data-id]');
  if (!thumbnail) {
    return;
  }

  evt.preventDefault();
  const photoId = parseInt(thumbnail.dataset.id, 10);
  const photoData = photosData.find((item) => item.id === photoId);

  if (photoData) {
    openFullsizeViewer(photoData);
  }
};

const initGallery = (photosData) => {
  renderThumbnails(photosData);

  // Удаляем старый обработчик, если он есть
  const oldHandler = picturesContainer.onclick;
  if (oldHandler) {
    picturesContainer.removeEventListener('click', oldHandler);
  }

  // Добавляем новый обработчик
  const clickHandler = (evt) => onThumbnailClick(evt, photosData);
  picturesContainer.addEventListener('click', clickHandler);
  picturesContainer.onclick = clickHandler;
};

export { initGallery };

