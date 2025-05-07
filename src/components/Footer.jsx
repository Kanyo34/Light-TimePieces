import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import './footer.css'; 
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container">
      <div className="text-center mb-4">
            <h4>Light <span className="text-warning">TimePieces</span></h4>
            <p>
              Your one-stop shop for the best timepieces in Kenya.
            </p>
          </div>
        <div className="row">
          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h5 style={{color:'gold'}}>Quick Links</h5>
            <ul >
              <li><a href="/" className="text-light">Home</a></li>
              <li><a href="/" className="text-light">Shop</a></li>
              <li><a href="/about" className="text-light">About</a></li>
              <li><a href="/" className="text-light">Products</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 mb-4">
            <h5 style={{color:'gold'}}>Contact Us</h5>
            <p><i className='bx bx-envelope' ></i> <a href="mailto:Light.com" className="text-light">Light.com</a></p>
            <p><i className='bx bx-phone'></i> +254 712 345 678</p>
          </div>

          {/* Social & Newsletter */}
          <div className="col-md-3 mb-4">
            <h5 style={{color:'gold'}}>Follow Us</h5>
            <div className="d-flex gap-3 mb-3">
            <div className="home-sci">
                <a href="https://www.instagram.com/voidking_69/"><i className='bx bxl-instagram-alt bx-tada'></i></a>
                <a href="https://github.com/Kanyo34"><i className='bx bxl-github bx-tada'></i></a>
            </div>
            </div>
       
          </div>

        </div>

        <hr className="bg-light" />
        <div className="text-center">
          <small>© 2025 Light TimePieces. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
