import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";

// Create a stable version of the component
const StableNavBar = ({ cartItems = [], user = null, onSignOut }) => {
  // Memoize cart items to prevent unnecessary re-renders
  const cartBadge = React.useMemo(() => (
    cartItems.length > 0 ? (
      <Badge bg="danger" pill className="ms-1">
        {cartItems.length}
      </Badge>
    ) : null
  ), [cartItems.length]);

  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      fixed="top" 
      className="px-4" 
      style={{ marginBottom: '500px' }}
      collapseOnSelect
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/home">
          Light <span style={{ color: "gold" }}>Timepieces</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-navbar" />
        
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            {[ 'AboutUs', 'SignUp', 'AddProducts', 'SignIn',''].map((path) => (
              <Nav.Link 
                key={path} 
                as={Link} 
                to={`/${path}`}
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Nav.Link>
            ))}
          </Nav>

          <Nav className="ms-auto align-items-center">
            <CartDropdown cartItems={cartItems} cartBadge={cartBadge} />
            
            <Nav.Link as={Link} to="/FAQ">
              <i className="bx bx-question-mark" style={{ fontSize: "22px" }}></i>
            </Nav.Link>

            <UserDropdown user={user} onSignOut={onSignOut} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Extracted components for better hook isolation
const CartDropdown = ({ cartItems, cartBadge }) => (
  <NavDropdown
    title={
      <span>
        <i className="bx bx-cart" style={{ fontSize: "22px" }}></i>
        {cartBadge}
      </span>
    }
    id="cart-dropdown"
    align="end"
    renderMenuOnMount
  >
    {cartItems.length === 0 ? (
      <NavDropdown.Item disabled>Cart is empty</NavDropdown.Item>
    ) : (
      <>
        {cartItems.slice(0, 3).map((item) => (
          <CartItem key={`cart-${item.id}`} item={item} />
        ))}
        {cartItems.length > 3 && (
          <NavDropdown.ItemText className="text-muted text-center">
            + {cartItems.length - 3} more
          </NavDropdown.ItemText>
        )}
        <NavDropdown.Divider />
        <NavDropdown.Item as={Link} to="/cart" className="text-center">
          Go to Cart
        </NavDropdown.Item>
      </>
    )}
  </NavDropdown>
);

const CartItem = ({ item }) => (
  <NavDropdown.Item className="d-flex align-items-center">
    <img
      src={`http://127.0.0.1:5000/static/images/${item.image}`}
      alt={item.name}
      style={{
        width: "40px",
        height: "40px",
        objectFit: "cover",
        marginRight: "10px",
      }}
      onError={(e) => {
        e.target.src = '/placeholder-image.png';
      }}
    />
    <div>
      <div style={{ fontSize: "0.9rem" }}>{item.name}</div>
      <div style={{ fontSize: "0.8rem", color: "#888" }}>KSh {item.price}</div>
    </div>
  </NavDropdown.Item>
);

const UserDropdown = ({ user, onSignOut }) => (
  <NavDropdown
    title={<i className="bx bx-user" style={{ fontSize: "22px" }}></i>}
    id="account-dropdown"
    align="end"
    renderMenuOnMount
  >
    {user ? (
      <>
        <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
        <NavDropdown.Item onClick={onSignOut}>Sign Out</NavDropdown.Item>
      </>
    ) : (
      <>
        <NavDropdown.Item as={Link} to="/signin">Sign In</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/signup">Sign Up</NavDropdown.Item>
      </>
    )}
  </NavDropdown>
);

export default React.memo(StableNavBar);