import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from "./Footer";
import NavBar from "./NavBar";  // Added NavBar import
import './signin.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SignUp = () => {
  const [user_name, setUsername] = useState('');
  const [user_email, setEmail] = useState('');
  const [user_phone, setPhone] = useState('');
  const [user_password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);  // Changed to boolean
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    strength: '',
    width: '0%',
    color: 'transparent'
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    checkPasswordStrength(user_password);
  }, [user_password]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    let strengthText = '';
    let width = '0%';
    let color = 'transparent';
    
    if (password.length === 0) {
      strengthText = '';
    } else if (password.length < 8) {
      strengthText = 'Too short';
      width = '30%';
      color = '#ff4d4f';
    } else if (strength <= 2) {
      strengthText = 'Weak';
      width = '40%';
      color = '#ff4d4f';
    } else if (strength <= 4) {
      strengthText = 'Medium';
      width = '70%';
      color = '#faad14';
    } else {
      strengthText = 'Strong';
      width = '100%';
      color = '#52c41a';
    }
    
    setPasswordStrength({
      strength: strengthText,
      width: width,
      color: color
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (passwordStrength.strength === 'Weak' || passwordStrength.strength === 'Too short') {
      setError('Please choose a stronger password');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      data.append('user_name', user_name);
      data.append('user_email', user_email);
      data.append('user_phone', user_phone);
      data.append('user_password', user_password);

      const response = await axios.post(
        "https://gabrielkanyo.pythonanywhere.com/api/signup", 
        data
      );

      setSuccess(response.data.Success);
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="main">
      <NavBar />
      <div className="container">
        <div className='row justify-content-center mt-5 py-4'>
          <div className='col-md-8 col-lg-6 p-4 card shadow'>
            <h2 className='text-center mb-4'>Sign Up</h2>
      
            <form onSubmit={submit}>
              {loading && (
                <div className="text-center mb-3">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Creating your account...</p>
                </div>
              )}
              
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
      
              <div className="imgcontainer text-center mb-4">
                <img 
                  src="https://www.w3schools.com/howto/img_avatar2.png" 
                  alt="Avatar" 
                  className="avatar" 
                  style={{ width: '100px', height: '100px' }}
                />
              </div>
      
              <div className="mb-3">
                <label className="form-label"><b>Username</b></label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Username"
                  required
                  value={user_name}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label"><b>Email</b></label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  required
                  value={user_email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label"><b>Phone Number</b></label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter Phone Number"
                  required
                  value={user_phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
      
              <div className="mb-3">
                <label className="form-label"><b>Password</b></label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter Password"
                    required
                    value={user_password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <i className="bi bi-eye-slash"></i>
                    ) : (
                      <i className="bi bi-eye"></i>
                    )}
                  </button>
                </div>
                
                {user_password && (
                  <div className="mt-2">
                    <div 
                      className="password-strength-bar"
                      style={{
                        width: passwordStrength.width,
                        backgroundColor: passwordStrength.color,
                        height: '4px',
                        borderRadius: '2px',
                        transition: 'all 0.3s ease'
                      }}
                    ></div>
                    <small 
                      className="d-block mt-1"
                      style={{ color: passwordStrength.color }}
                    >
                      {passwordStrength.strength}
                    </small>
                    {passwordStrength.strength === 'Weak' && (
                      <small className="d-block text-muted">
                        Add more characters (min 8), uppercase letters, and numbers
                      </small>
                    )}
                    {passwordStrength.strength === 'Medium' && (
                      <small className="d-block text-muted">
                        Good! Add special characters to make it stronger
                      </small>
                    )}
                  </div>
                )}
              </div>
      
              <div className="d-grid gap-2 mt-4">
                <button 
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading || passwordStrength.strength === 'Weak' || passwordStrength.strength === 'Too short'}
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </div>
            </form>
      
            <p className="mt-3 text-center ">
              Already have an account? <br /> <Link to="/signin" className="text-primary">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;