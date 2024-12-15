import React, { useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import ill from '../../assets/illustration.png';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // Adding loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Prevent form submission if already loading

    setLoading(true); // Set loading state to true
    try {
      await login(input);
      //toast.success('Login successful!');
      setInput({ email: '', password: '' });
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.message);
      //toast.error(`Login failed: ${error.message}`);
    } finally {
      setLoading(false); // Reset loading state after the process completes
    }
  };

  return (
    <div className="login-page">
      <div className="image-container">
        <img src={ill} alt="Login" className="login-image" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
          <h2>Welcome Back</h2>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="footer-links">
            <div className="footer-left">
              <Link to="/forgot-password" className="footer-link">Forgot Password</Link>
            </div>
            <div className="footer-right">
              <Link to="/register" className="footer-link">Don't have an Account?</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;