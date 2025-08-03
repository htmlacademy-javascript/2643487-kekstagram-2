const MAX_COMMENT_LENGTH = 4; //Максимальная длина комментария
const MAX_HASHTAGS_COUNT = 5; //Максимальное число комментариев
const MAX_HASHTAGS_LENGTH = 20; //Максимальная длина хэштхга

const ERROR_MESSAGES = {
  HASHTAG_ONLY_HASH: 'Хэштег не может состоять только из решётки',
  HASHTAG_INVALID: 'Неправильный формат хэштега. Допустимы только буквы и цифры',
  HASHTAG_MAX_LENGTH: `Максимальная длина хэштега - ${MAX_HASHTAGS_LENGTH} символов`,
  HASHTAG_MAX_COUNT: `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэштегов`,
  HASHTAG_DUPLICATE: 'Хэштеги не должны повторяться',
  COMMENT_MAX_LENGTH: `Комментарий не может быть длиннее ${MAX_COMMENT_LENGTH} символов`
};

//const initValidation = () => {
const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'pristine-error'
});

// Проверка формата отдельного хэштега
const checkHashtagFormat = (tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag);

// Проверка количества хэштегов
const checkHashtagsCount = (hashtags) => hashtags.length <= MAX_HASHTAGS_COUNT;

// Проверка уникальности хэштегов
const checkHashtagsUniqueness = (hashtags) => {
  const lowerCaseHashtags = hashtags.map((tag)=> tag.toLowerCase());
  return new Set(lowerCaseHashtags).size === lowerCaseHashtags.length;
};

// Основная проверка хэштегов
const checkHashtags = (value) => {
  const input = value.trim();
  if (input === '') {
    return true;
  }

  const hashtags = input.split(/\s+/).filter((tag) => tag !== '');

  if (!checkHashtagsCount(hashtags)) {
    pristine.addError(hashtagsInput, ERROR_MESSAGES.HASHTAG_MAX_COUNT);
    return false;
  }

  for (const tag of hashtags) {
    if (!checkHashtagFormat(tag)) {
      const errorMsg = tag === '#'
        ? ERROR_MESSAGES.HASHTAG_ONLY_HASH
        : ERROR_MESSAGES.HASHTAG_INVALID;
      pristine.addError(hashtagsInput, errorMsg);
      return false;
    }

    if (tag.length > MAX_HASHTAGS_LENGTH) {
      pristine.addError(hashtagsInput, ERROR_MESSAGES.HASHTAG_MAX_LENGTH);
      return false;
    }
  }

  if (!checkHashtagsUniqueness(hashtags)) {
    pristine.addError(hashtagsInput, ERROR_MESSAGES.HASHTAG_DUPLICATE);
    return false;
  }

  return true;
};

// Проверка длины комментария
const checkCommentLength = (value) => {
  if (value.length > MAX_COMMENT_LENGTH) {
    pristine.addError(descriptionInput, 'error'); //ERROR_MESSAGES.COMMENT_MAX_LENGTH;
    return false;
  }
  return true;
};

// Добавление валидаторов
const initValidation = () => {
  pristine.addValidator(
    hashtagsInput,
    checkHashtags,
    '',
    false
  );

  pristine.addValidator(
    descriptionInput,
    checkCommentLength,
    //ERROR_MESSAGES.COMMENT_MAX_LENGTH,
  );
};

// Обработчик отправки формы
const handleFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

// Запрет закрытия формы по Esc при фокусе на полях ввода
const preventEscClosing = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

// Навешивание обработчиков
uploadForm.addEventListener('submit', handleFormSubmit);
hashtagsInput.addEventListener('keydown', preventEscClosing);
descriptionInput.addEventListener('keydown', preventEscClosing);

//return pristine;
//};

const resetPristine = () => {
  uploadForm.reset();
  pristine.reset();
};

// Инициализация при загрузке страницы
//document.addEventListener('DOMContentLoaded', initPristine);

export { initValidation, resetPristine };
