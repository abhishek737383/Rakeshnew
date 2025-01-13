import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct, updateProduct } from '../../api/ProductService';
import { Link } from 'react-router-dom';
import '../adminStyle/AdminProductManagement.css';

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const result = await fetchProducts();
      setProducts(result);
    };
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    const updatedProducts = await fetchProducts();
    setProducts(updatedProducts);
  };

  const toggleFeatured = async (product) => {
    const updatedProduct = { ...product, isFeatured: !product.isFeatured };
    await updateProduct(product._id, updatedProduct);
    const updatedProducts = await fetchProducts();
    setProducts(updatedProducts);
  };

  return (
    <div className="admin-product-management-container">
      <h2 className="admin-product-management-title">Manage Products</h2>
      <Link to="/admin/products/add">
        <button className="admin-add-product-button">Add New Product</button>
      </Link>

      <div className="admin-product-card-grid">
        {products.map((product) => (
          <div key={product._id} className="admin-product-card">
            <img src={product.image} alt={product.name} />
            <h2 className="admin-product-card-title">{product.name}</h2>
            <p className="admin-product-card-price">₹{product.price}</p>
            <label>
              <input
                type="checkbox"
                checked={product.isFeatured}
                onChange={() => toggleFeatured(product)}
              />
              Featured
            </label>
            <Link to={`/admin/products/edit/${product._id}`}>
              <button className="admin-edit-button">Edit</button>
            </Link>
            <button className="admin-delete-button" onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductManagement;
