import React from 'react';
import './AdminDashboard.css'
const Dashboard = () => {
  console.log("Dashboard component rendered"); // Debugging

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff' }}>
      <h1>Dashboard</h1>
      <p>This is the dashboard content.</p>
    </div>
  );
};

export default Dashboard;
