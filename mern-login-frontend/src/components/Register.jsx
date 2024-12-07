import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // To navigate between pages

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://login-registration-eight.vercel.app/api/users/register', formData);
      setMessage({ text: res.data.message, type: 'success' });
    } catch (error) {
      setMessage({ text: error.response?.data?.message || 'Registration failed', type: 'error' });
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
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
        <button type="submit">Register</button>
        {message && <p className={message.type}>{message.text}</p>}
      </form>
      <div>
        <p>Already have an account?</p>
        <button onClick={handleLoginRedirect}>Login Here</button>
      </div>
    </div>
  );
};

export default Register;
