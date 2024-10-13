const useAdminAuth = () => {
  const [admin, setAdmin] = useState(() => {
    const token = localStorage.getItem('adminToken');
    return token ? JSON.parse(localStorage.getItem('admin')) : null; // Load admin state from localStorage
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const adminData = await getAdminDetails();
        setAdmin(adminData);
        localStorage.setItem('admin', JSON.stringify(adminData)); // Store admin data in localStorage
      } catch (error) {
        console.error('Failed to fetch admin:', error);
        setAdmin(null);
      }
    };

    const token = localStorage.getItem('adminToken');
    if (token) {
      fetchAdmin();
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginAdmin(email, password);
    localStorage.setItem('adminToken', data.token);
    setAdmin(data.admin);
    localStorage.setItem('admin', JSON.stringify(data.admin)); // Store admin data in localStorage
    navigate('/admin/dashboard');
  };

  const register = async (username, email, password) => {
    const data = await registerAdmin(username, email, password);
    localStorage.setItem('adminToken', data.token);
    setAdmin(data.admin);
    localStorage.setItem('admin', JSON.stringify(data.admin)); // Store admin data in localStorage
    navigate('/admin/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin'); // Remove admin data from localStorage
    setAdmin(null);
    navigate('/admin/login');
  };

  return {
    admin,
    login,
    register,
    logout,
  };
};
