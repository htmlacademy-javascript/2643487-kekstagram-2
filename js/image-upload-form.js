import { setupFormValidation } from './validator.js';
import { initImageEditor, resetImageEditor } from './image-editor.js';

const body = document.body;
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');


const formValidator = setupFormValidation(uploadForm);

const uploadFormKeyDownHandler = (evt) => {
  if (evt.key === 'Escape' && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    evt.preventDefault();
    window.console.log(formValidator);
    closeForm();
  }
};

const initImageUploadForm = () => {
  initImageEditor();

  uploadInput.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', uploadFormKeyDownHandler);
    body.classList.add('modal-open');
  });
};

cancelButton.addEventListener('click', closeForm);

function closeForm() {
  uploadForm.reset();
  resetImageEditor();
  formValidator.cleanup();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', uploadFormKeyDownHandler);
}

export { initImageUploadForm };
