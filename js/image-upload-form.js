import { setupFormValidation } from './validator.js';
import { sendData } from './api.js';
import { initImageEditor, resetImageEditor } from './image-editor.js';
import { showSuccess, showError } from './utils.js';

const body = document.body;
const upload = body.querySelector('.img-upload');
const uploadInput = upload.querySelector('.img-upload__input');
const uploadOverlay = upload.querySelector('.img-upload__overlay');
const cancelButton = upload.querySelector('.img-upload__cancel');
const uploadForm = upload.querySelector('.img-upload__form');
const submitButton = upload.querySelector('.img-upload__submit');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');


const formValidator = setupFormValidation(uploadForm);

const uploadFormKeyDownHandler = (evt) => {
  if (evt.key === 'Escape' && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    evt.preventDefault();
    closeForm();
  }
};

const setSubmitButtonStateDisable = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = submitButton.disabled ? 'Публикую...' : 'Опубликовать';
};

const resetForm = () => {
  uploadForm.reset();
  resetImageEditor();
  uploadInput.value = '';
  submitButton.disabled = false;
};

function closeForm() {
  resetForm();
  formValidator.cleanup();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', uploadFormKeyDownHandler);
}

const onSuccess = () => {
  closeForm();
  showSuccess();
};

const onError = (error) => {
  showError(error.message);
  setSubmitButtonStateDisable(false);
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  if (formValidator.validate) {
    return;
  }

  try {
    setSubmitButtonStateDisable(true);
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
    setSubmitButtonStateDisable(false);
  });
};

cancelButton.addEventListener('click', closeForm);

export { initImageUploadForm };
