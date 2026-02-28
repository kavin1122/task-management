import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoggingIn(true);
      await login(formData);
      // Wait for success animation before navigating
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setIsLoggingIn(false);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className={`login-container ${isLoggingIn ? 'login-success' : ''}`}>
      <div className="login-wrapper">
        <div className="login-form-panel">
          <h2>Login</h2>
          {error && <div className="alert">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              className={`login-form-submit ${isLoggingIn ? 'loading-state' : ''}`}
              disabled={loading || isLoggingIn}
            >
              {isLoggingIn ? '✓ Logged In!' : loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="login-bottom-text">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>

        <div className="login-welcome">
          <div>
            <h1>HELLO AGAIN!</h1>
            <p>Log in to pick up where you left off and keep your tasks moving.</p>
          </div>
          <div className="login-welcome-button">
            <button onClick={handleRegisterClick}>Register</button>
          </div>
          <div className="login-welcome-bottom">
            <p>New here? <Link to="/register">Create an account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
