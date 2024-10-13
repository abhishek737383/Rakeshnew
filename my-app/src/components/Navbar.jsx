import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, Divider, TextField, Badge, Box } from '@mui/material';
import { Home, ShoppingCart, Info, PersonAdd, ExitToApp, Login, Menu, Search, Person } from '@mui/icons-material';
import '../styles/Navbar.css';
import { useAuth } from '../context/AuthContext'; 
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, logout } = useAuth();
  const { state: cartState, dispatch } = useCart(); // Get cart state and dispatch
  
  // Calculate total items in the cart
  const cartItemCount = cartState?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleLogout = () => {
    // Dispatch CLEAR_CART action to reset the cart
    dispatch({ type: 'CLEAR_CART' });

    // Remove cart from localStorage
    localStorage.removeItem('cart');

    // Perform logout action
    logout();

    // Navigate to homepage after logout
    navigate('/');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const renderMobileMenu = () => (
    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
      <List className="mobile-menu">
        <ListItem button component={Link} to="/" onClick={toggleDrawer}>
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/products" onClick={toggleDrawer}>
          <ListItemIcon><ShoppingCart /></ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/cart" onClick={toggleDrawer}> 
          <ListItemIcon>
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Cart" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/about-us" onClick={toggleDrawer}>
          <ListItemIcon><Info /></ListItemIcon>
          <ListItemText primary="About Us" />
        </ListItem>
        <Divider />
        {isAuthenticated ? (
          <>
            <ListItem button component={Link} to="/profile" onClick={toggleDrawer}>
              <ListItemIcon><Person /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/my-orders" onClick={toggleDrawer}>
              <ListItemIcon><ShoppingCart /></ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => { handleLogout(); toggleDrawer(); }}>
              <ListItemIcon><ExitToApp /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/login" onClick={toggleDrawer}>
              <ListItemIcon><Login /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/signup" onClick={toggleDrawer}>
              <ListItemIcon><PersonAdd /></ListItemIcon>
              <ListItemText primary="Signup" />
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );

  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <Typography variant="h6" className="t-title">
          King Product
        </Typography>
        <Box component="form" className="search-form" onSubmit={handleSearchSubmit} sx={{ display: 'right', flexGrow: 1, justifyContent: 'center' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <IconButton type="submit" color="inherit">
                  <Search />
                </IconButton>
              ),
            }}
            className="search-input"
          />
        </Box>
        {isMobile ? (
          <>
            <IconButton edge="end" color="inherit" onClick={toggleDrawer}>
              <Menu />
            </IconButton>
            {renderMobileMenu()}
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" className="nav-link">
              <IconButton color="inherit">
                <Home />
              </IconButton>
              <Typography variant="body1">Home</Typography>
            </Link>
            <Link to="/products" className="nav-link">
              <IconButton color="inherit">
                <ShoppingCart />
              </IconButton>
              <Typography variant="body1">Products</Typography>
            </Link>
            <Link to="/cart" className="nav-link">
              <Badge badgeContent={cartItemCount} color="secondary">
                <IconButton color="inherit">
                  <ShoppingCart />
                </IconButton>
              </Badge>
              <Typography variant="body1">Cart</Typography>
            </Link>
            <Link to="/about-us" className="nav-link">
              <IconButton color="inherit">
                <Info />
              </IconButton>
              <Typography variant="body1">About Us</Typography>
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/profile" className="nav-link">
                  <IconButton color="inherit">
                    <Person />
                  </IconButton>
                  <Typography variant="body1">Profile</Typography>
                </Link>
                <Link to="/my-orders" className="nav-link">
                  <IconButton color="inherit">
                    <ShoppingCart />
                  </IconButton>
                  <Typography variant="body1">My Orders</Typography>
                </Link>
                <Box className="auth-button" onClick={handleLogout}>
                  <IconButton color="inherit">
                    <ExitToApp />
                  </IconButton>
                  <Typography variant="body1">Logout</Typography>
                </Box>
              </>
            )}
            {!isAuthenticated && (
              <Box className="auth-buttons" sx={{ display: 'flex', ml: 2 }}>
                <Link to="/login" className="nav-link">
                  <IconButton color="inherit">
                    <Login />
                  </IconButton>
                  <Typography variant="body1">Login</Typography>
                </Link>
                <Link to="/signup" className="nav-link">
                  <IconButton color="inherit">
                    <PersonAdd />
                  </IconButton>
                  <Typography variant="body1">Signup</Typography>
                </Link>
              </Box>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
