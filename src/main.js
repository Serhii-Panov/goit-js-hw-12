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
import { getImagesByQuery, PER_PAGE } from './js/pixabay-api';

let currentQuery = '';
let page = 1;
let totalPages = 0;

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.addEventListener('click', async () => {
  loadMoreBtn.disabled = true;
  showLoader();

  if (totalPages && page > totalPages) {
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
    hideLoadMoreButton();
    hideLoader();
    loadMoreBtn.disabled = false;
    return;
  }

  try {
    const data = await getImagesByQuery(currentQuery, page);

    createGallery(data.hits);

    page += 1;

    if (data.totalHits != null) {
      totalPages = Math.ceil(data.totalHits / PER_PAGE);
    }

    if (gallery.firstElementChild && gallery.firstElementChild.getBoundingClientRect) {
      const scrollTop =
        gallery.firstElementChild.getBoundingClientRect().height * 2;
      window.scrollBy({ top: scrollTop, behavior: 'smooth' });
    }

    if (page > totalPages) {
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message:
        'An error occurred while fetching images. Please try again later.',
      position: 'topRight',
    });
    console.error('Error fetching more images:', error);
  } finally {
    hideLoader();
    loadMoreBtn.disabled = false;
  }
});
form.addEventListener('submit', onSearch);

async function onSearch(event) {
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

  currentQuery = query;
  page = 1;
  totalPages = 0;

  showLoader();
  clearGallery();

  try {
    const data = await getImagesByQuery(currentQuery, page);

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

    createGallery(data.hits);

    page += 1;

    if (data.totalHits != null) {
      totalPages = Math.ceil(data.totalHits / PER_PAGE);
    }

    if (page <= totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message:
        'An error occurred while fetching images. Please try again later.',
      position: 'topRight',
    });
    console.error('Error fetching images:', error);
  } finally {
    hideLoader();
    form.reset();
  }
}
