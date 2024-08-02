import axios from 'axios';
import Notiflix from 'notiflix';

const pixabayApi = axios.create({
  baseURL: 'https://pixabay.com/api/',
  timeout: 1000,
});

export const pixabayApiLuncher = async url => {
  const response = await pixabayApi.get(url).catch(error => {
    if (error.response.status === 400) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results.",
      );
    } else if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
  return response;
};
