import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import { getImagesByQuery } from './js/pixabay-api';
let currentQuery = '';
const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
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

  showLoader();
  getImagesByQuery(query)
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
