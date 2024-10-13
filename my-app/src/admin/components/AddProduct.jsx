import React, { useState } from 'react';
import { createProduct, uploadImage } from '../../api/ProductService';
import { useNavigate } from 'react-router-dom';
import '../adminStyle/ProductForm.css'; // Import the CSS file

const AddProduct = () => {
  const [formData, setFormData] = useState({ name: '', price: '', description: '', stock: '', image: null, category: '', isFeatured: false });
  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    let imageUrl = formData.image;

    if (formData.image && typeof formData.image !== 'string') {
      const form = new FormData();
      form.append('image', formData.image);
      try {
        const uploadResult = await uploadImage(form);
        imageUrl = uploadResult.url;
      } catch (error) {
        console.error('Image upload failed', error);
        setLoading(false); // Stop loading if upload fails
        return;
      }
    }

    const productData = { ...formData, image: imageUrl };
    await createProduct(productData);
    
    setLoading(false); // Stop loading
    navigate('/admin/product-manage'); // Go back to product management after adding
  };

  return (
    <div className="product-form-container">
      <h2>Add Product</h2>
      {loading && <div className="loading-message">Uploading image, please wait...</div>} {/* Loading message */}
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
        <input
          type="file"
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
        />
        <label>
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
          />
          Featured Product
        </label>
        <button type="submit" disabled={loading}>Add Product</button> {/* Disable button during loading */}
      </form>
      <button className="back-button" onClick={() => navigate('/admin/product-manage')}>Back</button>
    </div>
  );
};

export default AddProduct;
