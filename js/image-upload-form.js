// Обработчик изменения поля загрузки файла
const body = document.body;
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');


const initImageUploadForm = () => {
  uploadInput.addEventListener('change', () => {
  // Показываем форму редактирования
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

function closeForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadInput.value = ''; // Сбрасываем значение поля загрузки файла
  // Сбрасываем другие поля формы
  document.querySelector('.scale__control--value').value = '100%';
  document.querySelector('#effect-none').checked = true;
  document.querySelector('.text__hashtags').value = '';
  document.querySelector('.text__description').value = '';
}

export { initImageUploadForm };
