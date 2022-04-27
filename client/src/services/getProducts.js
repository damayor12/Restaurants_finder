import axios from 'axios';
import { toast } from 'react-toastify';

export const getProducts = async (params = '') => {
  

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (params === '') {
    try {
      const { data } = await axios.post('/api/restaurants/all');
      return data;
    } catch (error) {
      toast.error('failed to fetch DEFAULT');
    }
  } else {
    try {
      const { data } = await axios.post('/api/restaurants/all', params, config);
      return data;
    } catch (error) {
      toast.error('failed to fetch ----');
    }
  }
};
