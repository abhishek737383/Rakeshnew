import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, updateProduct, uploadImage } from '../../api/ProductService';
import '../adminStyle/ProductForm.css'; // Import the CSS file

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', price: '', description: '', stock: '', image: null, category: '', isFeatured: false });

  useEffect(() => {
    const loadProduct = async () => {
      const result = await fetchProductById(id);
      setFormData(result);
    };
    loadProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = formData.image;

    if (formData.image && typeof formData.image !== 'string') {
      const form = new FormData();
      form.append('image', formData.image);
      const uploadResult = await uploadImage(form);
      imageUrl = uploadResult.url;
    }

    const updatedProductData = { ...formData, image: imageUrl };
    await updateProduct(id, updatedProductData);
    
    navigate('/admin/product-manage');
  };

  return (
    <div className="product-form-container">
      <h2>Edit Product</h2>
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
        <button type="submit">Update Product</button>
      </form>
      <button className="back-button" onClick={() => navigate('/admin/product-manage')}>Back</button>
    </div>
  );
};

export default EditProduct;
