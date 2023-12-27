import { createMessage } from './notifications';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');

export const gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
});

export function renderImages(images) {
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
          <ul class="property-list">
            <li class="property-item">
                <p class="property-title">Likes</p>
                <p class="property-value">${imageEl.likes}</p>
            </li>
            <li class="property-item">
                <p class="property-title">Views</p>
                <p class="property-value">${imageEl.views}</p>
            </li>
            <li class="property-item">
                <p class="property-title">Comments</p>
                <p class="property-value">${imageEl.comments}</p>
            </li>
            <li class="property-item">
                <p class="property-title">Downloads</p>
                <p class="property-value">${imageEl.downloads}</p>
            </li>
          </ul>  
          </a>`);
  }, '');

  galleryEl.insertAdjacentHTML('beforeend', galleryHTML);
  gallery.refresh();
}
