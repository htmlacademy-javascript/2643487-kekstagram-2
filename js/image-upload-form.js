import { setupFormValidation } from './validator.js';
import { sendData } from './api.js';
import { initImageEditor, resetImageEditor } from './image-editor.js';
import { showSuccess, showError, showDataError } from './utils.js';

const VALID_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
];

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

const isImageFile = (file) => file && VALID_IMAGE_TYPES.includes(file.type);

const uploadFormKeyDownHandler = (evt) => {
  if (evt.key === 'Escape' && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description') && !document.body.contains(body.querySelector('.error'))) {
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

const formSubmitHandler = async (evt) => {
  evt.preventDefault();

  if (!formValidator.validate()) {
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

  uploadForm.addEventListener('submit', formSubmitHandler);
  uploadInput.addEventListener('change', () => {
    uploadInput.blur();
    const file = uploadInput.files[0];

    if (!isImageFile(file)) {
      showDataError('Можно загружать только изображения (JPEG, PNG, GIF, WebP)');
      uploadInput.value = '';
      return;
    }

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
