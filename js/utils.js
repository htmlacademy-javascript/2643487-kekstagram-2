const body = document.body;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showMessage = (template, isDataError = false) => {
  const message = template.cloneNode(true);
  body.appendChild(message);

  const removeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeyDown);
    document.removeEventListener('click', onDocumentClick);
  };

  function onDocumentKeyDown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeMessage();
    }
  }

  function onDocumentClick(evt) {
    if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
      removeMessage();
    }
  }

  const button = message.querySelector('button');
  if (button) {
    button.addEventListener('click', removeMessage);
  }

  document.addEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('click', onDocumentClick);

  if (isDataError) {
    setTimeout(removeMessage, 5000);
  }
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

export { showSuccess, showError, showDataError };
