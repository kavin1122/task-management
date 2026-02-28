import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsRegistering(true);
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      // Wait for success animation before navigating
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setIsRegistering(false);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className={`register-container ${isRegistering ? 'register-success' : ''}`}>
      <div className="register-wrapper">
        {/* Left Welcome Panel */}
        <div className="register-welcome">
          <div>
            <h1>WELCOME!</h1>
            <p>We're delighted to have you here. If you need any assistance, feel free to reach out.</p>
          </div>
          <div className="register-welcome-button">
            <button onClick={handleLoginClick}>Login</button>
          </div>
          <div className="register-welcome-bottom">
            <p>Don't have an account? <a href="#register">Sign up</a></p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="register-form-panel">
          <h2>Register</h2>
          {error && <div className="alert">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
            <button 
              type="submit" 
              className={`register-form-submit ${isRegistering ? 'loading-state' : ''}`}
              disabled={loading || isRegistering}
            >
              {isRegistering ? '✓ Registered!' : loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <p className="register-bottom-text">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
