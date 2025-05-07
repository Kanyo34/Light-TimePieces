import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from "./Footer";
import './signin.css';
import NavBar from "./NavBar";

const SignIn = () => {
  const [user_name, setUsername] = useState('');
  const [user_password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!user_name.trim() || !user_password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      data.append('user_name', user_name);
      data.append('user_password', user_password);

      const response = await axios.post(
        "https://gabrielkanyo.pythonanywhere.com/api/signin",
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setSuccess(response.data.Message);

      if (response.data.user) {
        navigate('/');
      } else {
        setError(response.data.Message || 'Login failed');
      }

    } catch (error) {
      setError(error.response?.data?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <NavBar />
      <div className="container-fluid">
        <div className='row justify-content-center mt-5 pt-4'>
          <div className='col-md-6 col-lg-4 p-4 card shadow'>
            <h2 className='text-center mb-4'>Sign In</h2>

            <form onSubmit={submit} className="modal-content animate">
              {loading && (
                <div className="text-center mb-3">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Please wait as we log you in</p>
                </div>
              )}
              
              {success && !loading && <div className="alert alert-success">{success}</div>}
              {error && !loading && <div className="alert alert-danger">{error}</div>}

              <div className="imgcontainer text-center mb-4">
                <img 
                  src="https://www.w3schools.com/howto/img_avatar2.png" 
                  alt="Avatar" 
                  className="avatar" 
                  style={{ width: '100px', height: '100px' }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="uname" className="form-label"><b>Username</b></label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Username"
                  name="uname"
                  required
                  value={user_name}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="psw" className="form-label"><b>Password</b></label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter Password"
                    name="psw"
                    value={user_password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="d-grid gap-2 mt-4">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>

            <p className="mt-3 text-center">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;