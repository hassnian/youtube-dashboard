import axios from 'axios';

const get = (url, config = {}) => axios.get(url, config).then((res) => res.data);
const post = (url, data, config = {}) => axios.post(url, data, config).then((res) => res.data);

const BACK_URL = 'http://localhost:3000/api';


export default {
  youtube: {
    autcomplete: (search = '') => get('https://www.google.com/complete/search?client=youtube&hl=en&q=where%20%20asdasd&cp=6&callback=fnaqj9h51e1i'),
  },

  videos: {
    getAllVideos: () => get(`${BACK_URL}/videos`),
    getOneVideo: (videoId) => get(`${BACK_URL}/videos/${videoId}`),
    createOneVideo: (data) => post(`${BACK_URL}/videos`, data),
  },
};
