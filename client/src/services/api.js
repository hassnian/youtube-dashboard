import axios from 'axios';

const get = (url, config = {}) => axios.get(url, config).then((res) => res.data);


export default {
  youtube: {
    autcomplete: (search = '') => get(`https://www.google.com/complete/search?client=youtube&hl=en&q=${search}`),
  },
};
