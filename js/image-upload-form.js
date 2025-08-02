// Обработчик изменения поля загрузки файла
const body = document.body;
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');

const initImageUploadForm = () => {
  uploadInput.addEventListener('change', () => {
  // Показываем форму редактирования
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
  });
};

export { initImageUploadForm };
