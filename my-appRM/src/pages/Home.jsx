import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { fetchProducts } from '../api/ProductService';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Slider from '../components/Slider';
import Footer from '../components/Footer';
import DownloadIcon from '@mui/icons-material/Download'; // Import the download icon

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      const featured = products.filter(product => product.isFeatured);
      setFeaturedProducts(featured);
    };
    loadProducts();
  }, []);

  const handleShopNow = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <div className="slider-container">
        <Slider />
      </div>

      <Container maxWidth="lg" className="home-container">
        <Typography variant="h4" gutterBottom className="home-title">
          Welcome to KingProduct e-Commerce Store
        </Typography>

        <div className="get-app-container">
          <a href="/apk/app-release.apk" download>
            <Button
              variant="contained"
              className="get-app-button"
              startIcon={<DownloadIcon />}
              style={{ backgroundColor: '#ff5722', color: 'white' }} // Ensure button color is set
            >
              Download App
            </Button>
          </a>
        </div>

        <Typography variant="h6" gutterBottom className="featured-title">
          Featured Products
        </Typography>

        <Grid container spacing={3}>
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Paper elevation={3} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1">₹{product.price}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleShopNow(product._id)}
                >
                  Shop Now
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default Home;
