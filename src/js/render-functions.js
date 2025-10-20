import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;

  const markup = images
    .map(
      image => `
      <li class="gallery-item">
        <a class="gallery-link" href="${image.largeImageURL}" title="${image.tags}">
          <img
            class="gallery-image"
            src="${image.webformatURL}"
            alt="${image.tags}"
            loading="lazy"
          />
        </a>
        <ul class="stats">
          <li class="stats-item"><b>Likes</b> ${image.likes}</li>
          <li class="stats-item"><b>Views</b> ${image.views}</li>
          <li class="stats-item"><b>Comments</b> ${image.comments}</li>
          <li class="stats-item"><b>Downloads</b> ${image.downloads}</li>
        </ul>
      </li>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  if (gallery) gallery.innerHTML = '';
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.style.display = 'block';
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.style.display = 'none';
}
