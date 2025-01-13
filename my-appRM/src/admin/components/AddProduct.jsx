import React, { useState } from 'react';
import { createProduct, uploadImage } from '../../api/ProductService';  // Assuming you have these API methods
import { useNavigate } from 'react-router-dom';
import '../adminStyle/ProductForm.css'; // Import the CSS file

const AddProduct = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    description: '', 
    stock: '', 
    image: null, 
    category: '', 
    isFeatured: false 
  });

  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(''); // State for error handling
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading when submitting
    setError('');      // Clear any previous errors

    let imageUrl = formData.image; // Handle image (it might already be a URL)

    // Check if the image is a file (needs uploading to Cloudinary)
    if (formData.image && typeof formData.image !== 'string') {
      const form = new FormData();
      form.append('image', formData.image); // Append image file to formData
      try {
        // Upload image to Cloudinary
        const uploadResult = await uploadImage(form); 
        imageUrl = uploadResult.url; // Get the Cloudinary URL after upload
      } catch (error) {
        console.error('Image upload failed', error);
        setError('Image upload failed. Please try again.');
        setLoading(false); // Stop loading if upload fails
        return;
      }
    }

    // Create product data object, including the Cloudinary image URL
    const productData = { 
      ...formData, 
      image: imageUrl 
    };

    try {
      // Send product data to backend for creation
      await createProduct(productData);  
      navigate('/admin/product-manage'); // Redirect to product management page on success
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Failed to create product. Please try again.');
    }

    setLoading(false);  // Stop loading after completion
  };

  return (
    <div className="product-form-container">
      <h2>Add Product</h2>

      {/* Display loading message */}
      {loading && <div className="loading-message">Uploading image, please wait...</div>}
      
      {/* Display error message */}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          required
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="clothes">Clothes</option>
          <option value="shoes">Shoes</option>
          <option value="sunglasses">Sunglasses</option>
          <option value="watches">Watches</option>
          <option value="accessories">Accessories</option>
        </select>

        {/* Image Upload */}
        <input
          type="file"
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}  // Handle file selection
        />

        {/* Featured Product Toggle */}
        <label>
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
          />
          Featured Product
        </label>

        {/* Submit Button (disabled during loading) */}
        <button type="submit" disabled={loading}>Add Product</button>
      </form>

      {/* Back button to go to product management */}
      <button className="back-button" onClick={() => navigate('/admin/product-manage')}>
        Back
      </button>
    </div>
  );
};

export default AddProduct;
