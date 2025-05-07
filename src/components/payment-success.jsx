import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // Debugging: Log the entire state to see what's being passed
  console.log('Location state:', state);

  const orderDetails = state?.orderDetails || {};
  const cartItems = state?.cartItems || [];

  // Debugging: Log the cart items
  console.log('Cart items:', cartItems);

  // Calculate total from cart items with null checks
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        <div className="success-icon">✓</div>
        <h1>Thank You for Your Purchase!</h1>
        <p className="confirmation-message">
          Your payment was successful and your order is being processed.
        </p>

        {orderDetails.transactionId && (
          <p className="transaction-id">
            Transaction ID: <strong>{orderDetails.transactionId}</strong>
          </p>
        )}

        <div className="divider"></div>

        <h2>Order Summary</h2>

        {cartItems.length > 0 ? (
          <>
            <div className="order-items">
              {cartItems.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-details">
                    <span className="item-name">{item.name || 'Product Name Not Available'}</span>
                    <span className="item-quantity">Quantity: {item.quantity || 1}</span>
                  </div>
                  <div className="item-price">
                    KSh {(item?.price || 0).toLocaleString()}.00
                  </div>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            <div className="total-amount">
              <span>Total Amount:</span>
              <span className="amount">KSh {totalAmount.toLocaleString()}.00</span>
            </div>
          </>
        ) : (
          <p className="no-items-message">No items found in your order.</p>
        )}

        <p className="email-confirmation">
          {orderDetails.email ? (
            <>A confirmation email has been sent to <strong>{orderDetails.email}</strong>.</>
          ) : (
            'Thank you for your purchase.'
          )}
        </p>

        <div className="action-buttons">
          <button 
            className="home-button"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;