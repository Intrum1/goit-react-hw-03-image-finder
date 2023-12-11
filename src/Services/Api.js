import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39817690-1f31b393aea19fded90cb6900';

const fetchImages = async ({ query, page, perPage = 12 }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
export default fetchImages;
