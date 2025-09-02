const REMOVE_MESSAGE_DELAY = 5000;

const body = document.body;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showMessage = (template, isDataError = false) => {
  const message = template.cloneNode(true);
  body.appendChild(message);

  const removeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', documentKeyDownHandler);
    document.removeEventListener('click', documentClickHandler);
  };

  function documentKeyDownHandler(evt) {
    if (evt.key === 'Escape' && !evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
      evt.preventDefault();
      removeMessage();
    }
  }

  function documentClickHandler(evt) {
    if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
      removeMessage();
    }
  }

  const messageButtonClickHandler = () => {
    removeMessage();
  };

  const button = message.querySelector('button');
  if (button) {
    button.addEventListener('click', messageButtonClickHandler);
  }

  document.addEventListener('keydown', documentKeyDownHandler);
  document.addEventListener('click', documentClickHandler);

  if (isDataError) {
    setTimeout(removeMessage, REMOVE_MESSAGE_DELAY);
  }
};

// Устранение дребезга
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const showSuccess = () => showMessage(successTemplate);
const showError = () => showMessage(errorTemplate);
const showDataError = (errorText) => {
  const message = dataErrorTemplate.cloneNode(true);
  if (errorText) {
    message.querySelector('.data-error__title').textContent = errorText;
  }
  showMessage(message, true);
};

export { showSuccess, showError, showDataError, debounce };
