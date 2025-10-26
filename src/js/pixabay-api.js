import axios from 'axios';

const API_KEY = '52790584-b8940124ef420833efbac5129';
export const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        q: query,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: PER_PAGE,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
