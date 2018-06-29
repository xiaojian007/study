import axios from 'axios';
export const requestLogin = params => {
  return axios.post(`${base}/login`, params).then(res => res.data);
};