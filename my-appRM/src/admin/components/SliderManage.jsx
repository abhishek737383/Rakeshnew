import React, { useState, useEffect } from 'react';
import { uploadSliderImage, deleteSliderImage, fetchSliderImages } from '../../api/slider';
import '../adminStyle/SliderManage.css';

const SliderManage = () => {
  const [sliderImages, setSliderImages] = useState([]); // Initialize as an empty array
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false); // State for handling loading
  const [error, setError] = useState(null); // State for handling errors

  // Fetch slider images when component mounts
  useEffect(() => {
    loadSliderImages();
  }, []);

  // Load slider images from the server
  const loadSliderImages = async () => {
    setLoading(true);
    try {
      const response = await fetchSliderImages();
      console.log('Fetched slider images:', response.data); // Debugging: Log fetched images
      setSliderImages(response.data); // Update state with fetched images
      setLoading(false);
    } catch (err) {
      console.error('Error fetching images', err);
      setError('Error fetching images'); // Set error state
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!selectedImage) return;
    setLoading(true);
    try {
      await uploadSliderImage(selectedImage); // Pass the selected image
      loadSliderImages(); // Reload images after upload
      setSelectedImage(null); // Clear the selected image after upload
      setLoading(false);
    } catch (err) {
      console.error('Error uploading image', err);
      setError('Error uploading image'); // Set error state
      setLoading(false);
    }
  };

  // Handle image deletion
  const handleDeleteImage = async (id) => {
    setLoading(true);
    try {
      await deleteSliderImage(id);
      loadSliderImages(); // Reload images after deletion
      setLoading(false);
    } catch (err) {
      console.error('Error deleting image', err);
      setError('Error deleting image'); // Set error state
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Slider Management</h2>

      {/* Upload section */}
      <div className="upload-section">
        <input 
          type="file" 
          onChange={(e) => setSelectedImage(e.target.files[0])} 
          accept="image/*" // Accept image files only
        />
        <button className="upload-button" onClick={handleImageUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>

      {/* Error message */}
      {error && <p className="error">{error}</p>}

      {/* Display images */}
      <div className="images-grid">
        {loading ? (
          <p>Loading images...</p> // Show loading message while fetching data
        ) : sliderImages && sliderImages.length > 0 ? (
          sliderImages.map((slider) => (
            <div className="image-card" key={slider._id}>
              <img src={slider.imageUrl} alt="Slider" />
              <button className="delete-button" onClick={() => handleDeleteImage(slider._id)}>
                X
              </button>
            </div>
          ))
        ) : (
          <p>No images available</p> // Fallback message if no images exist
        )}
      </div>
    </div>
  );
};

export default SliderManage;
