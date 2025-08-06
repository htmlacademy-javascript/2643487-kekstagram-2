const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 10;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorMessage = {
  INVALID_HASHTAG: 'Неправильный хэштег',
  HASHTAG_TOO_LONG: `Максимальная длина хэштега ${MAX_COMMENT_LENGTH} символов`,
  HASHTAG_MAX_COUNT: `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэштегов`,
  DUPLICATE_HASHTAG: 'Хэштеги не должны повторяться',
  COMMENT_TOO_LONG: `Длина комментария не может быть больше ${MAX_COMMENT_LENGTH} символов`
};

const validateHashtag = (hashtag) => {
  // Проверка длины хэштега
  if (hashtag.length > MAX_HASHTAG_LENGTH) {
    return false;
  }

  if (hashtag === '#') {
    return false;
  }
  return HASHTAG_REGEX.test(hashtag);
};

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    return false;
  }

  for (const hashtag of hashtags) {
    if (!validateHashtag(hashtag)) {
      return false;
    }
  }

  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  return true;
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const getHashtagErrorMessage = (value) => {
  if (!value.trim()) {
    return '';
  }

  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    return ErrorMessage.HASHTAG_MAX_COUNT;
  }

  for (const hashtag of hashtags) {
    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      return ErrorMessage.HASHTAG_TOO_LONG;
    }
    if (!validateHashtag(hashtag)) {
      return ErrorMessage.INVALID_HASHTAG;
    }
  }

  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return ErrorMessage.DUPLICATE_HASHTAG;
  }

  return '';
};

const getCommentErrorMessage = (value) => value.length > MAX_COMMENT_LENGTH ? ErrorMessage.COMMENT_TOO_LONG : '';

const validateUploadForm = (formElement) => {
  const pristine = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'pristine-error'
  });

  const hashtagInput = formElement.querySelector('.text__hashtags');
  const commentInput = formElement.querySelector('.text__description');

  pristine.addValidator(
    hashtagInput,
    validateHashtags,
    () => getHashtagErrorMessage(hashtagInput.value)
  );

  pristine.addValidator(
    commentInput,
    validateComment,
    () => getCommentErrorMessage(commentInput.value)
  );

  formElement.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });

  return pristine;
};

export { validateUploadForm };
