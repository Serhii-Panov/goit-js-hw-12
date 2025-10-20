import axios from 'axios';

const API_KEY = '52790584-b8940124ef420833efbac5129';
export function getImagesByQuery(query) {
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        q: query,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
      },
    })
    .then(response => response.data)
    .catch(err => {
      console.error('Error in getImagesByQuery:', err);
      throw err;
    });
}
