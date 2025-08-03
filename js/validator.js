const MAX_COMMENT_LENGTH = 140; //Максимальная длина комментария
const MAX_HASHTAGS_COUNT = 5; //Максимальное число комментариев

// Инициализация Pristine
const uploadForm = document.querySelector('.img-upload__form');
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});


const resetPristine = () => {
  uploadForm.reset();
  pristine.reset();
};

// Валидация хэштегов
const validateHashtags = (value) => {
  // Хэштеги не обязательны
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.toLowerCase().split(' ').filter((tag) => tag);

  // Проверка на максимальное количество хэштегов
  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    return false;
  }

  // Проверка каждого хэштега
  const regex = /^#[a-zа-яё0-9]{1,19}$/i;
  for (const tag of hashtags) {
    if (!regex.test(tag)) {
      return false;
    }

    if (hashtags.indexOf(tag) !== hashtags.lastIndexOf(tag)) {
      return false;
    }
  }

  return true;
};

// Валидация комментария
const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const initValidation = () => {
  // Добавление валидаторов
  pristine.addValidator(
    document.querySelector('.text__hashtags'),
    validateHashtags,
    'Некорректные хэштеги'
  );

  pristine.addValidator(
    document.querySelector('.text__description'),
    validateComment,
    'Комментарий не может быть длиннее 140 символов'
  );

  // Обработка отправки формы
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      uploadForm.submit();
    }
  });
};


export { initValidation, resetPristine };
