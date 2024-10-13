import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../adminStyle/AdminPanel.css'; // Ensure you link the updated CSS file

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async (page) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:5000/api/admin/users?page=${page}&limit=10`);
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      setError('Error fetching users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyAllUserData = () => {
    const allUserData = users.map(user => `Name: ${user.name}, Email: ${user.email}, Phone: ${user.phone}`).join('\n');
    navigator.clipboard.writeText(allUserData);
    alert('All user data copied to clipboard');
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  return (
    <div className="admin-panel">
      <h1 className="admin-panel__title">Admin Panel - Users</h1>
      <button className="admin-panel__copy-all-btn" onClick={copyAllUserData}>
        Copy All User Data
      </button>
      {loading && <p className="admin-panel__loading">Loading users...</p>}
      {error && <p className="admin-panel__error">{error}</p>}
      {!loading && !error && (
        <>
          <table className="admin-panel__table">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{(currentPage - 1) * 10 + index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="admin-panel__pagination">
            <button
              className="admin-panel__pagination-btn"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="admin-panel__pagination-btn"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <p className="admin-panel__page-info">Page {currentPage} of {totalPages}</p>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
