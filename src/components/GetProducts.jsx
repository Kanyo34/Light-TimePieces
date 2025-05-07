import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Carousel from "./Carousel";
import Footer from "./Footer";
import 'boxicons/css/boxicons.min.css';

const Getproducts = () => {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const img_url = "https://gabrielkanyo.pythonanywhere.com/static/images/";

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const buyNow = (product) => {
    setCartItems([{
      id: product.product_id,
      name: product.product_name,
      price: product.product_cost,
      image: product.Product_photo,
    }]);
    setShowCart(true);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const proceedToCheckout = () => {
    navigate('/MakePayments', { state: { cartItems } });
  };

  const get_products = async () => {
    setLoading("Please Wait as we load the products...");
    try {
      const response = await axios.get("https://gabrielkanyo.pythonanywhere.com/api/get_products_details");
      setLoading("");
      setProducts(response.data);
    } catch (error) {
      setLoading("");
      setError(error.response?.data?.message || error.message || "An error occurred");
    }
  };

  useEffect(() => {
    get_products();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    if (!products) return;
    const filtered = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const Cart = ({ cartItems, removeFromCart, clearCart }) => {
    if (!cartItems || cartItems.length === 0) {
      return <div className="alert alert-info text-center">Your cart is empty.</div>;
    }

    return (
      <div className="container">
        <h2>Your Cart</h2>
        <ul className="list-group mb-3">
          {cartItems.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <img
                src={img_url + item.image}
                alt={item.name}
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              <span>{item.name}</span>
              <span>KSh {item.price}.00</span>
              <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-between align-items-center">
          <h4>Total: KSh {calculateTotal()}.00</h4>
          <div>
            <button className="btn btn-warning me-2" onClick={clearCart}>Clear Cart</button>
            <button className="btn btn-success" onClick={proceedToCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <NavBar />
      <br />
      <Carousel />
      <br />

      <div className="row mb-3">
        <div className="col-md-6">
          <h1>{showCart ? "Shopping Cart" : "Available Products"}</h1>
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-outline-primary" onClick={() => setShowCart(!showCart)}>
            {showCart ? "Back to Products" : `View Cart (${cartItems.length})`}
          </button>
        </div>
      </div>

      {!showCart && (
        <input
          type="text"
          className="form-control shadow-sm p-2 mb-4"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      )}

      {loading && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}

      {showCart ? (
        <Cart cartItems={cartItems} removeFromCart={removeFromCart} clearCart={clearCart} />
      ) : (
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div className="col-md-2 mb-4" key={index}>
                <div className="card shadow h-100">
                  <Link to={`/product/${product.product_id}`} style={{ textDecoration: "none" }}>
                    <img
                      src={img_url + product.Product_photo}
                      alt={product.product_name}
                      className="card-img-top product_img"
                    />
                    <div className="card-body">
                      <p className="card-title text-dark text-start" style={{ fontSize: "17px" }}>
                        {product.product_name}
                      </p>
                      <p className="text-start" style={{ color: "gray" }}>
                        KSh {product.product_cost}.00
                      </p>
                    </div>
                  </Link>
                  <div className="text-center mb-2 d-flex justify-content-around">
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() =>
                        addToCart({
                          id: product.product_id,
                          name: product.product_name,
                          price: product.product_cost,
                          image: product.Product_photo,
                        })
                      }
                    >
                      <i className='bx bx-cart'></i> Add
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => buyNow(product)}
                    >
                      <i className='bx bx-purchase-tag'></i> Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No products found.</p>
            </div>
          )}
        </div>
      )}
      <br />
      <Footer />
    </div>
  );
};

export default Getproducts;