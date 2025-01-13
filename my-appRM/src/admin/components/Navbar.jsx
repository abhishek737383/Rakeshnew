import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

const Navbar = ({ toggleSidebar, onLogout }) => {
  return (
    <nav className="admin-navbar">
      <button className="navbar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      {/* <div className="navbar-left">
        <input type="text" placeholder="Search..." className="search-input" />
      </div> */}
      <div className="navbar-right">
        {/* <Link to="/admin/profile">Profile</Link> */}
        <Link to="/admin/login">Sign In</Link>
        <Link to="/admin/sign-up">Sign Up</Link>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
