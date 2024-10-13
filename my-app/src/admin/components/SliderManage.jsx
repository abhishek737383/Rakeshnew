import React, { useState, useEffect } from 'react';
import { uploadSliderImage, deleteSliderImage, fetchSliderImages } from '../../api/slider';
import '../adminStyle/SliderManage.css'; // Import the CSS file

const SliderManage = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadSliderImages();
  }, []);

  const loadSliderImages = async () => {
    try {
      const response = await fetchSliderImages();
      setSliderImages(response.data);
    } catch (err) {
      console.error('Error fetching images', err);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;
    try {
      await uploadSliderImage(selectedImage);
      loadSliderImages();
    } catch (err) {
      console.error('Error uploading image', err);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      await deleteSliderImage(id);
      loadSliderImages();
    } catch (err) {
      console.error('Error deleting image', err);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Slider Management</h2>
      <div className="upload-section">
        <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])} />
        <button className="upload-button" onClick={handleImageUpload}>Upload Image</button>
      </div>
      <div className="images-grid">
        {sliderImages.map((slider) => (
          <div className="image-card" key={slider._id}>
            <img src={`http://localhost:5000${slider.imageUrl}`} alt="Slider" />
            <button className="delete-button" onClick={() => handleDeleteImage(slider._id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderManage;
