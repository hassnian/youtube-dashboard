import axios from 'axios';

const get = (url, config = {}) => axios.get(url, config).then((res) => res.data);
const post = (url, data, config = {}) => axios.post(url, data, config).then((res) => res.data);
const patch = (url, data, config = {}) => axios.patch(url, data, config).then((res) => res.data);


const BACK_URL = 'http://localhost:3000/api';


export default {
  suggestions: {
    getSuggestions: (query) => get(`${BACK_URL}/suggestions?q=${query}`),
  },
  videos: {
    getAllVideos: () => get(`${BACK_URL}/videos`),
    getOneVideo: (videoId) => get(`${BACK_URL}/videos/${videoId}`),
    createOneVideo: (data) => post(`${BACK_URL}/videos`, data),
    updateVideo: (videoId, data) => patch(`${BACK_URL}/videos/${videoId}`, data),

  },
};
