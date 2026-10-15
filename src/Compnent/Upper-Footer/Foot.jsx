import "./index.css";
import {
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaHeadset
} from "react-icons/fa";


export const Foot =()=>{
    return(
        <>
         <section className="features">

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

      </section>

        </>
    )
}