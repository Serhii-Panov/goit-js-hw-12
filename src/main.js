import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import { getImagesByQuery } from './js/pixabay-api';

let currentQuery = '';
let page = 1;

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.addEventListener('click', () => {
  showLoader();
  getImagesByQuery(currentQuery, page)
    .then(data => {
      const maxPages = Math.ceil(data.totalHits / 15);
      if (page > maxPages) {
        iziToast.info({
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
        hideLoadMoreButton();
        return;
      }
      createGallery(data.hits);
      page += 1;
      window.scrollBy({
        top: gallery.firstElementChild.getBoundingClientRect().height * 2,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message:
          'An error occurred while fetching images. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });
});
form.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const query = formData.get('search-text').trim();
  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }
  page = 1;
  showLoader();
  getImagesByQuery(query, page)
    .then(data => {
      if (!data || !Array.isArray(data.hits) || data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        clearGallery();
        return;
      }
      if (query !== currentQuery) {
        clearGallery();
        currentQuery = query;
      }
      createGallery(data.hits);
      page += 1;
      showLoadMoreButton();
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message:
          'An error occurred while fetching images. Please try again later.',
        position: 'topRight',
      });
      console.error('Error fetching images:', error);
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
}
