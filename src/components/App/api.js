import axios from 'axios';

export const API_BASE_URL = 'https://www.anapioficeandfire.com/api';

// Function to search for characters, books, or houses
export const searchItems = (query, searchType) => {
  let apiUrl = '';

  switch (searchType) {
    case 'books':
      apiUrl = `${API_BASE_URL}/books`;
      break;
    case 'characters':
      apiUrl = `${API_BASE_URL}/characters`;
      break;
    case 'houses':
      apiUrl = `${API_BASE_URL}/houses`;
      break;
    default:
      throw new Error('Invalid search type');
  }

  return axios.get(apiUrl, {
    params: {
      name: query,
    },
  });
};


