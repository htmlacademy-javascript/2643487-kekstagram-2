import { setupFormValidation } from './validator.js';
import { sendData } from './api.js';
import { initImageEditor, resetImageEditor } from './image-editor.js';
import { showSuccess, showError } from './utils.js';

const body = document.body;
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');


const formValidator = setupFormValidation(uploadForm);

const uploadFormKeyDownHandler = (evt) => {
  if (evt.key === 'Escape' && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    evt.preventDefault();
    closeForm();
  }
};

const resetForm = () => {
  uploadForm.reset();
  resetImageEditor();
  uploadInput.value = '';
};

function closeForm() {
  resetForm();
  formValidator.cleanup();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', uploadFormKeyDownHandler);
}

const setSubmitButtonState = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? 'Публикую...' : 'Опубликовать';
};

const onSuccess = () => {
  closeForm();
  showSuccess();
};

const onError = (error) => {
  showError(error.message);
  setSubmitButtonState(false);
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  if (formValidator.test) {
    return;
  }

  try {
    setSubmitButtonState(true);
    await sendData(new FormData(uploadForm));
    onSuccess();
  } catch (error) {
    onError(error);
  }
};

const initImageUploadForm = () => {
  initImageEditor();

  uploadForm.addEventListener('submit', onFormSubmit);

  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      previewImage.src = imageUrl;
      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${imageUrl})`;
      });
    }
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', uploadFormKeyDownHandler);
    body.classList.add('modal-open');
  });
};

cancelButton.addEventListener('click', closeForm);


// cancelButton.addEventListener('click', closeForm);

// function closeForm() {
//   uploadForm.reset();
//   resetImageEditor();
//   formValidator.cleanup();
//   uploadOverlay.classList.add('hidden');
//   body.classList.remove('modal-open');
//   document.removeEventListener('keydown', uploadFormKeyDownHandler);
// }

export { initImageUploadForm };
