import { getData } from './api.js';
import { initGallery } from './init-gallery.js';
import { initImageUploadForm } from './image-upload-form.js';
import { showDataError } from './utils.js';
import { initFilters } from './filters.js';

let photosData = [];

// Функция для отрисовки отфильтрованных фотографий
const renderFilteredPhotos = (filteredPhotos) => {
  const gallery = document.querySelector('.pictures');
  const existingPictures = gallery.querySelectorAll('.picture');

  // Удаляем предыдущие фотографии
  existingPictures.forEach((picture) => picture.remove());

  // Отрисовываем новые
  initGallery(filteredPhotos);
};

initImageUploadForm();

const initApp = async () => {
  try {
    photosData = await getData();

    // Инициализируем галерею с исходными данными
    initGallery(photosData);

    // Инициализируем фильтры
    initFilters(photosData, renderFilteredPhotos);

  } catch {
    showDataError();
  }
};

initApp();

//бла0бла-бла