
import { Link } from "react-router-dom";
import {
  FaShoePrints,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import "./index.css";

const Footer = () => {
  return (
    <footer className="shoekart-footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <FaShoePrints />
            <span>ShoeKart</span>
          </Link>

          <p>
            Step into comfort and style. Discover your
            favourite footwear and find the perfect pair
            for every step of your journey.
          </p>

          <div className="footer-socials">
            <a href="https://www.instagram.com/"
               target="_blank" rel="noreferrer"
               aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="https://www.facebook.com/"
               target="_blank" rel="noreferrer"
               aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="https://x.com/"
               target="_blank" rel="noreferrer"
               aria-label="X">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Shopping Links */}
        <div className="footer-column">
          <h3>Shop</h3>
          <Link to="/Men">Men's Shoes</Link>
          <Link to="/Women">Women's Shoes</Link>
          {/* <Link to="/Kids">Kids' Shoes</Link> */}
          <Link to="/New">New Arrivals</Link>
          <Link to="/Sale">Sale & Offers</Link>
        </div>

        {/* Customer Support */}
        <div className="footer-column">
          <h3>Customer Care</h3>
          <Link to="/About">About Us</Link>
          <Link to="/MyOrders">My Orders</Link>
          <Link to="/Login">My Account</Link>
          <Link to="/Contact">Contact Us</Link>
          {/* <Link to="/FAQ">FAQs</Link> */}
        </div>

        {/* Contact Section */}
        <div className="footer-column footer-contact">
          <h3>Get In Touch</h3>

          <p>
            <FaEnvelope />
            <span>support@shoekart.com</span>
          </p>

          <p>
            <FaPhoneAlt />
            <span>Customer Support</span>
          </p>

          <p>
            <FaMapMarkerAlt />
            <span>India</span>
          </p>
        </div>
      </div>

      {/* Newsletter */}
      <div className="footer-newsletter">
        <div>
          <h3>Get the Latest Drops</h3>
          <p>
            Subscribe for updates on new arrivals,
            exclusive offers and latest styles.
          </p>
        </div>

        <form
          className="newsletter-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Done");
            
          }}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
            required
          />
          <button type="submit" aria-label="Subscribe">
            Subscribe <FaArrowRight />
          </button>
        </form>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ShoeKart. All rights reserved.
        </p>

        <div className="footer-bottom-links">
          <Link to="/Privacy">Privacy Policy</Link>
          <Link to="/Terms">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
