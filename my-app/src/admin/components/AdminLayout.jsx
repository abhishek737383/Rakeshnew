import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './AdminLayout.css';

const AdminLayout = ({ children, onLogout }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isMobileSidebarVisible, setMobileSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarVisible(!isMobileSidebarVisible);
  };

  return (
    <div className={`admin-layout ${isSidebarVisible ? '' : 'sidebar-collapsed'} ${isMobileSidebarVisible ? 'mobile-sidebar-open' : ''}`}>
      {isMobileSidebarVisible && <div className="sidebar-overlay" onClick={toggleMobileSidebar}></div>}
      
      <Sidebar className={isSidebarVisible ? '' : 'collapsed'} />

      <div className="admin-body">
        <Navbar toggleSidebar={toggleSidebar} onLogout={onLogout} />
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
