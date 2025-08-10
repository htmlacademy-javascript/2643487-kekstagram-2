
const ValidationRules = {
  MAX_HASHTAGS: 5,
  HASHTAG_MAX_LENGTH: 20,
  COMMENT_MAX_LENGTH: 140,
  HASHTAG_PATTERN: /^#[a-zа-яё0-9]{1,19}$/i,
};

const ErrorMessages = {
  INVALID_FORMAT: 'Неправильный хэштег',
  TOO_LONG: `Максимальная длина хэштега ${ValidationRules.HASHTAG_MAX_LENGTH} символов`,
  TOO_MANY: `Нельзя указать больше ${ValidationRules.MAX_HASHTAGS} хэштегов`,
  DUPLICATES: 'Хэштеги не должны повторяться',
  COMMENT_TOO_LONG: `Длина комментария не может быть больше ${ValidationRules.COMMENT_MAX_LENGTH} символов`,
};

// Общая функция для парсинга хэштегов
const parseHashtags = (input) => {
  const trimmedValue = input.trim();
  return trimmedValue ? trimmedValue.split(/\s+/) : [];
};

const isValidTag = (tag) => {
  if ((tag === '#') || (tag.length > ValidationRules.HASHTAG_MAX_LENGTH)) {
    return false;
  }
  return ValidationRules.HASHTAG_PATTERN.test(tag);
};

const checkTagCount = (tags) => tags.length <= ValidationRules.MAX_HASHTAGS;

const checkUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return new Set(lowerCaseTags).size === tags.length;
};

// Универсальная функция валидации
const validateTags = (inputValue) => {
  const tags = parseHashtags(inputValue);
  if (!tags.length) {
    return true;
  }

  return checkTagCount(tags) &&
         tags.every(isValidTag) &&
         checkUniqueTags(tags);
};

// Универсальная функция получения ошибки
const getTagValidationError = (inputValue) => {
  const tags = parseHashtags(inputValue);
  if (!tags.length) {
    return '';
  }

  if (!checkTagCount(tags)) {
    return ErrorMessages.TOO_MANY;
  }

  const invalidTag = tags.find((tag) => !isValidTag(tag));
  if (invalidTag) {
    return invalidTag.length > ValidationRules.HASHTAG_MAX_LENGTH
      ? ErrorMessages.TOO_LONG
      : ErrorMessages.INVALID_FORMAT;
  }

  if (!checkUniqueTags(tags)) {
    return ErrorMessages.DUPLICATES;
  }

  return '';
};

const validateCommentText = (text) => text.length <= ValidationRules.COMMENT_MAX_LENGTH;

const getCommentError = (text) =>
  !validateCommentText(text) ? ErrorMessages.COMMENT_TOO_LONG : '';

// Функция для добавления валидаторов
const addFormValidator = (validator, element, validationFn, errorFn) => {
  validator.addValidator(
    element,
    validationFn,
    () => errorFn(element.value)
  );
};

const setupFormValidation = (form) => {
  const validator = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'pristine-error',
  });

  const tagsInput = form.querySelector('.text__hashtags');
  const commentInput = form.querySelector('.text__description');

  addFormValidator(validator, tagsInput, validateTags, getTagValidationError);
  addFormValidator(validator, commentInput, validateCommentText, getCommentError);

  const submitHandler = (event) => {
    window.console.log(validator.validate());
    if (!validator.validate()) {
      event.preventDefault();
    }
  };

  form.addEventListener('submit', submitHandler);

  return {
    cleanup: () => {
      validator.reset();
    },
  };
};

export { setupFormValidation };
