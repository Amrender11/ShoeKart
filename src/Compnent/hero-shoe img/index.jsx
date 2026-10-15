import {
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaHeadset
} from "react-icons/fa";

import heroImage from "../../assets/hero-shoe.png";
import image from "../../assets/image.png";
import "./index.css";
import { href } from "react-router-dom";

export const Hero = () => {
  return (
    <>
      
      <section className="hero">

        {/* Left Content */}
        <div className="hero-content">

          <p className="collection">
            NEW COLLECTION
          </p>

          <h1>
            STEP INTO
            <span> COMFORT</span>
          </h1>

          <p className="hero-description">
            Discover shoes designed for everyday
            <br />
            style and performance.
          </p>

          <button className="shop-btn" >
            SHOP NOW <span>→</span>
          </button>

          {/* Slider dots */}
          <div className="slider-dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>

        </div>


        {/* Right Shoe Image */}
        <div className="hero-image">

          <img
            src={image}
            alt="Premium Shoes"
          />

        </div>

      </section>


      

       {/* <section className="features">

        <div className="feature">

          <FaTruck className="feature-icon" />

          <div>
            <h4>Free Shipping</h4>
            <p>On all orders over ₹999</p>
          </div>

        </div>


        <div className="feature">

          <FaShieldAlt className="feature-icon" />

          <div>
            <h4>Secure Payments</h4>
            <p>100% safe and secure</p>
          </div>

        </div>


        <div className="feature">

          <FaUndo className="feature-icon" />

          <div>
            <h4>Easy Returns</h4>
            <p>Within 7 days</p>
          </div>

        </div>


        <div className="feature">

          <FaHeadset className="feature-icon" />

          <div>
            <h4>24/7 Support</h4>
            <p>We're here to help</p>
          </div>

        </div> 

      </section>  */}
    </>
  );
};

export default Hero;