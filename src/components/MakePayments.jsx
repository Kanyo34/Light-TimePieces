import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Makepayments = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const { state } = useLocation();
  const cartItems = state?.cartItems || [];
  const navigate = useNavigate();
  
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    address: ""
  });

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckoutChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setLoading("Processing payment...");
    setError("");
    
    try {
      const formData = new FormData();
      formData.append("phone", phone.startsWith("0") ? `254${phone.substring(1)}` : phone);
      formData.append("amount", calculateTotal());
      formData.append("name", checkoutForm.name);
      formData.append("email", checkoutForm.email);
      formData.append("address", checkoutForm.address);
      formData.append("description", `Payment for ${cartItems.length} item(s)`);

      // Process payment
      const response = await axios.post(
        "https://gabrielkanyo.pythonanywhere.com/api/mpesa_payment", 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      setMessage(response.data.message || "Payment initiated successfully");
      setLoading("");
      
      setTimeout(() => {
        navigate('/payment-success', { 
          state: { 
            orderDetails: checkoutForm, 
            cartItems: cartItems 
          }
        });
      }, 2000);
      
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Payment failed");
      setLoading("");
    }
  };

  return (
    <div className='row justify-content-center mt-4'>
      <div className="col-md-8">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Complete Your Payment</h2>
            
            {message && (
              <div className="alert alert-success">{message}</div>
            )}
            
            {error && (
              <div className="alert alert-danger">{error}</div>
            )}
            
            <form onSubmit={handleCheckoutSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={checkoutForm.name}
                      onChange={handleCheckoutChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={checkoutForm.email}
                      onChange={handleCheckoutChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">M-Pesa Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 0712345678"
                      required
                      maxLength="10"
                    />
                    <small className="text-muted">Enter your M-Pesa registered number</small>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Delivery Address</label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={checkoutForm.address}
                      onChange={handleCheckoutChange}
                      rows="5"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-3 mt-4">
                <h5>Order Summary</h5>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>KSh {item.price.toLocaleString()}.00</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Total</th>
                        <th>KSh {calculateTotal().toLocaleString()}.00</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div className="d-grid gap-2">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg"
                  disabled={loading || cartItems.length === 0}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Processing Payment...
                    </>
                  ) : (
                    "Pay with M-Pesa"
                  )}
                </button>
                
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={() => navigate(-1)}
                >
                  Back to Cart
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Makepayments;