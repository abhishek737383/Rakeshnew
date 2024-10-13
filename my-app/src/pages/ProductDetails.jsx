// src/pages/ProductDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../api/ProductService';
import { addItemToCart } from '../api/CartService';
import '../styles/ProductDetails.css';
import ReactImageMagnify from 'react-image-magnify';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { user } = useAuth(); // Get user from AuthContext
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const result = await fetchProductById(id);
        setProduct(result);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    // Check if user is logged in
    if (!user) {
      alert('Please log in to add items to your cart.');
      navigate('/login'); // Redirect to login if not logged in
      return;
    }

    try {
      const response = await addItemToCart({
        userId: user.id, // Include userId
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image, // Ensure the image is included here
      });

      if (response && response.success) {
        dispatch({
          type: 'ADD_TO_CART',
          payload: {
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image, // Include the image in the payload
          },
        });
        alert('Product added to cart!');
      } else {
        throw new Error('Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Error adding product to cart. Please try again.');
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate('/checkout');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="product-details">
      <div className="product-details-left">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: product.name,
              isFluidWidth: true,
              src: product.image,
            },
            largeImage: {
              src: product.image,
              width: 1200,
              height: 1800,
            },
            enlargedImageContainerStyle: { background: '#fff', zIndex: '1500' },
          }}
        />
      </div>
      <div className="product-details-right">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <div className="product-price">₹{product.price}</div>
        <div className="product-stock">Stock: {product.stock}</div>
        <div className="sticky-buttons">
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="buy-now-button" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
