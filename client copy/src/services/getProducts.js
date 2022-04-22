import axios from 'axios';

let newdata;
export const getProducts = async () => {
  const { data } = await axios.get(`/api/restaurants`);

  newdata = data;
  return newdata
};
