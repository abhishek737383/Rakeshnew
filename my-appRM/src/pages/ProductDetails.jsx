import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../api/ProductService';
import { addItemToCart } from '../api/CartService';
import '../styles/ProductDetails.css';
import ImageZoom from 'react-image-zoom'; // Import the react-image-zoom package
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { user } = useAuth();
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

    if (!user) {
      alert('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }

    try {
      const response = await addItemToCart({
        userId: user.id,
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });

      if (response && response.success) {
        dispatch({
          type: 'ADD_TO_CART',
          payload: {
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
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

  if (!product) {
    return <div className="error">Product not found.</div>;
  }

  // Configuration for react-image-zoom
  const zoomProps = {
    width: 400,
    height: 500,
    zoomWidth: 500,
    img: product.image, // Set product image as the zoomable image
  };

  return (
    <div className="product-details">
      <div className="product-details-left">
        {product.image ? (
          <ImageZoom {...zoomProps} />
        ) : (
          <p>No image available</p>
        )}
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
