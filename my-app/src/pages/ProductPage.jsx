import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/ProductService'; // API connection
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import '../styles/Productpaage.css'; // CSS for styling

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    const loadProducts = async () => {
      const result = await fetchProducts();
      setProducts(result);
      setFilteredProducts(result); // Initially, all products are shown
    };
    loadProducts();
  }, []);

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(category, searchTerm);
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterProducts(selectedCategory, term);
  };

  // Filter products based on category and search term
  const filterProducts = (category, term) => {
    let filtered = products;

    if (category !== '') {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (term !== '') {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleShopNow = (id) => {
    navigate(`/product/${id}`); // Navigate to product details page
  };

  return (
    <div className="product-page">
   
     
      {/* Category Filter */}
      <div className="category-filter">
        <button onClick={() => handleCategoryChange('')}>All</button>
        <button onClick={() => handleCategoryChange('clothes')}>Clothes</button>
        <button onClick={() => handleCategoryChange('shoes')}>Shoes</button>
        <button onClick={() => handleCategoryChange('sunglasses')}>Sunglasses</button>
        <button onClick={() => handleCategoryChange('watches')}>Watches</button>
        <button onClick={() => handleCategoryChange('accessories')}>Accessories</button>
      </div>
        {/* Search Box */}
       <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>₹{product.price}</p>
              <button onClick={() => handleShopNow(product._id)}>Shop Now</button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
