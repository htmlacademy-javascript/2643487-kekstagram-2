import { createPhotosArray } from './mock-generator.js';
import { initGallery } from './init-gallery.js';
import { initImageUploadForm } from './image-upload-form.js';

initGallery(createPhotosArray());
initImageUploadForm();

