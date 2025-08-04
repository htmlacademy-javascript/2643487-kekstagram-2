import { validateUploadForm } from './validator.js';

const body = document.body;
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');


const initImageUploadForm = () => {
  uploadInput.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
  });
};

cancelButton.addEventListener('click', closeForm);
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    evt.preventDefault();
    closeForm();
  }
});

const uploadFormValidator = validateUploadForm(uploadForm);

function closeForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
  uploadFormValidator.reset();
}

export { initImageUploadForm };
