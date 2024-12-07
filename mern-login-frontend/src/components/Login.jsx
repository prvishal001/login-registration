import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // To handle redirection

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://login-registration-psi.vercel.app/api/users/login', formData);
      setMessage({ text: `Login successful!`, type: 'success' });
      
      // Store the actual token received from the server
      localStorage.setItem('token', res.data.token);  // Use the token from response
  
      // Redirect user to Dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      setMessage({ text: error.response?.data?.message || 'Login failed', type: 'error' });
    }
  };
  
  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirect to the registration page
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Login</button>
        {message && <p className={message.type}>{message.text}</p>}
      </form>
      <div>
        <p>Don't have an account?</p>
        <button onClick={handleRegisterRedirect}>Register Here</button>
      </div>
    </div>
  );
};

export default Login;
