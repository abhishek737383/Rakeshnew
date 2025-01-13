import axios from 'axios';

const API_URL = 'https://newsite-1caa.onrender.com/api/slider';

// Function to upload a slider image
export const uploadSliderImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('sliderImage', imageFile); // Directly append the file

  // Debugging: Log FormData contents for further inspection
  console.log('FormData contents:');
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1] instanceof File ? pair[1].name : pair[1]}`);
  }

  try {
    return await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // Rethrow error for error handling in the component
  }
};

// Function to delete a slider image
export const deleteSliderImage = async (id) => {
  try {
    return await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error; // Rethrow error for error handling in the component
  }
};

// Function to fetch all slider images
export const fetchSliderImages = async () => {
  try {
    return await axios.get(API_URL);
  } catch (error) {
    console.error('Error fetching slider images:', error);
    throw error; // Rethrow error for error handling in the component
  }
};
