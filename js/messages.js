const body = document.body;

const showMessage = (templateId, closeCallback) => {
  const template = document.querySelector(`#${templateId}`);
  const message = template.content.cloneNode(true);
  const messageSection = message.querySelector('section');
  const button = message.querySelector('button');

  const onDocumentKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onDocumentClick = (evt) => {
    if (!messageSection.contains(evt.target)) {
      closeMessage();
    }
  };

  function closeMessage() {
    messageSection.remove();
    document.removeEventListener('keydown', onDocumentKeyDown);
    document.removeEventListener('click', onDocumentClick);
    if (closeCallback) {
      closeCallback();
    }
  }

  button.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('click', onDocumentClick);

  body.appendChild(message);
};

const showSuccessMessage = () => showMessage('success');
const showErrorMessage = () => showMessage('error');
const showDataError = () => {
  const template = document.querySelector('#data-error');
  const message = template.content.cloneNode(true);
  body.appendChild(message);

  setTimeout(() => {
    const messageSection = document.querySelector('.data-error');
    if (messageSection) {
      messageSection.remove();
    }
  }, 5000);
};

export { showSuccessMessage, showErrorMessage, showDataError };
