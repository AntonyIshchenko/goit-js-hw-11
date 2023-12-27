import { renderImages } from './render-html';
import { createMessage } from './notifications';

const searchParamsObject = {
  key: '41460845-2ab95350f4581127087fd5faf',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

const buttonEl = document.querySelector('.search-btn');
const loadingTextEl = document.querySelector('.loading-message');

export function downloadImages(searchKey) {
  loadingTextEl.style.display = 'block';
  buttonEl.disabled = true;
  buttonEl.blur();

  // add this timeout to demostate css-loader
  setTimeout(() => {
    fetchImages(searchKey)
      .then(images => renderImages(images))
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        loadingTextEl.style.display = 'none';
        buttonEl.disabled = false;
      });
  }, 2500);
}

function fetchImages(searchText) {
  searchParamsObject.q = searchText;
  const searchParams = new URLSearchParams(searchParamsObject);

  setTimeout(() => {}, 5000);
  return fetch(`https://pixabay.com/api/?${searchParams.toString()}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => createMessage(error));
}
