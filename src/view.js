// onchange
const getFeedback = (state, i18nextInstance) => {
  const { error } = state.process;
  if (error) {
    const messageValue = error.code ?? error.message;
    const feedbackText = i18nextInstance.t(messageValue);
    return feedbackText;
  }
  return i18nextInstance.t('submit');
};

export default (elements, state, i18nextInstance, path) => {
  const {
    input, feedbackEl,
  } = elements;
  const { valid } = state;
  switch (path) {
    case 'valid': {
      input.value = '';
      input.focus();
      break;
    }
    case 'process.error': {
      const feedbackText = getFeedback(state, i18nextInstance);
      if (valid) {
        feedbackEl.classList.remove('is-invalid', 'text-danger');
        feedbackEl.classList.add('text-success');
      } else {
        feedbackEl.classList.remove('text-success');
        feedbackEl.classList.add('is-invalid', 'text-danger');
      }
      feedbackEl.textContent = feedbackText;
      break;
    }
    case 'process.value': {
      break;
    }
    default: {
      throw new Error('Unexpected changes in state!');
    }
  }
};
