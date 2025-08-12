import { getData } from './api.js';
import { initGallery } from './init-gallery.js';
import { initImageUploadForm } from './image-upload-form.js';
import { showDataError } from './utils.js';

initImageUploadForm();

const initApp = async () => {
  try {
    const photos = await getData();
    initGallery(photos);
  } catch {
    showDataError();
  }
};

initApp();
