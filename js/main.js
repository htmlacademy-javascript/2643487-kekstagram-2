//import { createPhotosArray } from './mock-generator.js';
import { getData } from './api.js';
import { initGallery } from './init-gallery.js';
import { initImageUploadForm } from './image-upload-form.js';

const initApp = async () => {
  try {
    const photos = await getData();
    initGallery(photos);
  } catch {
    window.console.log('error');
    //showDataError();
  }
};

initApp();

//initGallery(createPhotosArray());
initImageUploadForm();

