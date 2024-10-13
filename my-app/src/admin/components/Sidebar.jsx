import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';
import { FaTachometerAlt, FaSlidersH, FaBoxOpen, FaFileInvoice, FaShoppingCart, FaShoppingBasket } from 'react-icons/fa';

const Sidebar = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`admin-sidebar ${className} ${isCollapsed ? 'collapsed' : ''}`}>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin/dashboard" activeClassName="active">
            <FaTachometerAlt className="icon" />
            <span className="text">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/slider-manage" activeClassName="active">
            <FaSlidersH className="icon" />
            <span className="text">Slider Manage</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/product-manage" activeClassName="active">
            <FaBoxOpen className="icon" />
            <span className="text">Product Manage</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/bill-manage" activeClassName="active">
            <FaFileInvoice className="icon" />
            <span className="text">Bill Manage</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/order-manage" activeClassName="active">
            <FaShoppingCart className="icon" />
            <span className="text">Order Manage</span>
          </NavLink>
        </li>
        {/* New All Cart page link */}
        <li>
          <NavLink to="/admin/cart-manage" activeClassName="active">
            <FaShoppingBasket className="icon" />
            <span className="text">All Cart</span>
          </NavLink>
        </li>
        {/* Order Management Links */}
        <li>
          <NavLink to="/admin/orders/pending" activeClassName="active">
            <FaShoppingCart className="icon" />
            <span className="text">Pending Orders</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders/accepted" activeClassName="active">
            <FaShoppingCart className="icon" />
            <span className="text">Accepted Orders</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders/delivered" activeClassName="active">
            <FaShoppingCart className="icon" />
            <span className="text">Delivered Orders</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders/rejected" activeClassName="active">
            <FaShoppingCart className="icon" />
            <span className="text">Rejected Orders</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
