import { createMessage } from './js/notifications';
import { downloadImages } from './js/download';

const formEl = document.querySelector('.search-form');

document.querySelector('.loading-message').style.display = 'none';

formEl.addEventListener('submit', event => {
  event.preventDefault();

  let searchKey = formEl.elements.search.value.trim();
  if (!searchKey) {
    createMessage('Search must be filled!');
    return;
  }
  formEl.reset();

  downloadImages(searchKey);
});
