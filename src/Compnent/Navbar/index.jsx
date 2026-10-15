
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBoxOpen,
} from "react-icons/fa";

import shoe from "../../assets/shoe.png";
import "./index.css";

export const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(
        localStorage.getItem("shoekart-cart") || "[]"
      );

      setCartCount(
        cart.reduce(
          (total, item) =>
            total + (Number(item.quantity) || 1),
          0
        )
      );
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo">
        <img src={shoe} alt="ShoeKart" />
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>

        <NavLink to="/Men" className="nav-link">
          Men
        </NavLink>

        <NavLink to="/Women" className="nav-link">
          Women
        </NavLink>

        <NavLink to="/New" className="nav-link">
          New Arrivals
        </NavLink>

        <NavLink to="/Sale" className="nav-link sale">
          Sale
        </NavLink>
      </div>

      <div className="nav-right">
        <NavLink
          to="/MyOrders"
          className="nav-icon order-icon"
          title="My Orders"
          aria-label="My Orders"
        >
          <FaBoxOpen />
          <span className="order-label">Orders</span>
        </NavLink>

        <NavLink
          to="/Wishlist"
          className="nav-icon"
          aria-label="Wishlist"
          title="Wishlist"
        >
          <FaHeart />
        </NavLink>

        <NavLink
          to="/Cart"
          className="nav-icon cart-icon"
          aria-label="Shopping Cart"
          title="Cart"
        >
          <FaShoppingCart />
          {/* <span>{cartCount}</span> */}
        </NavLink>

        <NavLink
          to="/Login"
          className="nav-icon"
          aria-label="Login"
          title="Login"
        >
          <FaUser />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;