import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear token from localStorage to log the user out
    localStorage.removeItem('token');  // Make sure the correct key is used here
    // Redirect to login page after logout
    navigate('/login');
  };
  
  useEffect(() => {
    // Check if user is logged in (by checking for a token)
    const token = localStorage.getItem('token'); // Use 'token' instead of 'authToken'
    if (!token) {
      // Redirect to login page if no token is found (i.e., user is not logged in)
      navigate('/login');
    } else {
      // Fetch user details from the backend (MongoDB data)
      axios
        .get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUserData(res.data); // Store user data (name, email) in state
        })
        .catch((error) => {
          console.error('Error fetching user data', error);
          setUserData(null); // Handle error, e.g., invalid token or session expired
        });
    }
  }, [navigate]);
  

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      {userData ? (
        <div>
          <h2>Hello, {userData.name}!</h2>
          <p>Email: {userData.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading your dashboard...</p>
      )}
    </div>
  );
};

export default Dashboard;
