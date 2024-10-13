import axios from 'axios';

const API_URL = 'https://newsite-1caa.onrender.com/api/slider';

export const uploadSliderImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('sliderImage', imageFile);
  return await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteSliderImage = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const fetchSliderImages = async () => {
  return await axios.get(API_URL);
};
