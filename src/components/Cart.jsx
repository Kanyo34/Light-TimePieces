import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, removeFromCart, clearCart }) => {
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container text-center py-5">
        <div className="card shadow-sm p-5">
          <h2 className="text-muted mb-4">Your cart is empty</h2>
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-primary btn-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Your Cart</h2>
        <span className="badge bg-primary rounded-pill">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="row">
        {cartItems.map((item, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card shadow-sm h-100">
              <div className="card-img-top-container" style={{ height: '200px', overflow: 'hidden' }}>
                <img
                  src={`http://127.0.0.1:5000/static/images/${item.image}`}
                  alt={item.name}
                  className="img-fluid w-100 h-100 object-fit-cover"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
                  }}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-success fw-bold">KSh {item.price.toLocaleString()}.00</p>
                <div className="mt-auto">
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Order Summary</h5>
            <button 
              className="btn btn-sm btn-outline-secondary" 
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>KSh {totalPrice.toLocaleString()}.00</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Shipping:</span>
            <span className="text-success">Free</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between fw-bold fs-5">
            <span>Total:</span>
            <span>KSh {totalPrice.toLocaleString()}.00</span>
          </div>
          <button 
            className="btn btn-primary w-100 mt-3 py-2"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;