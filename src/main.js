import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import simpleLightbox from 'simplelightbox';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const octagonIconUrl = new URL('./img/octagon.svg', import.meta.url).href;
const closeIconUrl = new URL('./img/x.svg', import.meta.url).href;

const searchParamsObject = {
  key: '41460845-2ab95350f4581127087fd5faf',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

const formEl = document.querySelector('.search-form');
const buttonEl = document.querySelector('.search-btn');
const loadingTextEl = document.querySelector('.loading-message');
const galleryEl = document.querySelector('.gallery');

const searchInput = formEl.elements.search;

loadingTextEl.style.display = 'none';

let gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
});

formEl.addEventListener('submit', event => {
  event.preventDefault();

  let searchKey = searchInput.value.trim();
  if (!searchKey) {
    createMessage('Search must be filled!');
    return;
  }
  searchInput.value = '';

  fetchImages(searchKey)
    .then(images => renderImages(images))
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      loadingTextEl.style.display = 'none';
      buttonEl.disabled = false;
    });
});

function fetchImages(searchText) {
  loadingTextEl.style.display = 'block';
  buttonEl.disabled = true;

  searchParamsObject.q = searchText;
  const searchParams = new URLSearchParams(searchParamsObject);

  return fetch(`https://pixabay.com/api/?${searchParams.toString()}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => createMessage(error));
}

function renderImages(images) {
  if (images.hits.length === 0) {
    createMessage(
      'Sorry, there are no images matching your search query. Please try again!'
    );
    return;
  }

  galleryEl.innerHTML = '';
  const galleryHTML = images.hits.reduce((acc, imageEl) => {
    return (acc += `
        <a class="gallery-link" href="${imageEl.largeImageURL}">
          <img
              class="gallery-image"
              src="${imageEl.webformatURL}"
              alt="${imageEl.tags}"
          />
          <ul>
            <li>
                <span>Likes</span>
                <span>${imageEl.likes}</span>
            </li>
            <li>
                <span>Views</span>
                <span>${imageEl.views}</span>
            </li>
            <li>
                <span>Comments</span>
                <span>${imageEl.comments}</span>
            </li>
            <li>
                <span>Downloads</span>
                <span>${imageEl.downloads}</span>
            </li>
          </ul>  
          </a>`);
  }, '');

  galleryEl.insertAdjacentHTML('beforeend', galleryHTML);
  gallery.refresh();
}

function createMessage(textMessage) {
  iziToast.show({
    // title: 'Error',
    titleColor: '#FFF',
    titleSize: '16px',
    message: textMessage,
    messageColor: '#FFF',
    messageSize: '16px',
    maxWidth: '462px',
    position: 'topRight',
    backgroundColor: '#EF4040',
    iconUrl: octagonIconUrl,
    progressBarColor: '#FFBEBE',
    timeout: 500000,
    targetFirst: false,
    close: false,
    buttons: [
      [
        `<button type="button" id="izi-close-button">
                 <img src="${closeIconUrl}" alt="" width="16px" height="16px" />
              </button>`,
        function (instance, toast) {
          instance.hide({}, toast, 'buttonName');
        },
      ],
    ],
  });

  // div самого вікна
  let messageElement = document.querySelector('.iziToast.fadeInUp');
  messageElement.style.paddingTop = '20px';
  messageElement.style.paddingBottom = '20px';

  // текст помилки
  messageElement = document.querySelector(
    '.iziToast>.iziToast-body .iziToast-texts'
  );
  messageElement.style.maxWidth = '322px';
}
