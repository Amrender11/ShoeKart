
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCreditCard,
  FaTruck,
  FaCheckCircle,
  FaShoppingBag,
} from "react-icons/fa";
import "./index.css";

const CART_KEY = "shoekart-cart";
const ORDERS_KEY = "shoekart-orders";

// Safely read the cart from localStorage
function getCart() {
  try {
    const savedCart = JSON.parse(
      localStorage.getItem(CART_KEY) || "[]"
    );

    return Array.isArray(savedCart) ? savedCart : [];
  } catch {
    return [];
  }
}

export default function Order() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    if (Array.isArray(location.state?.cart)) {
      return location.state.cart;
    }

    if (location.state?.product) {
      return [{ ...location.state.product, quantity: 1 }];
    }

    return getCart();
  });

  const [payment, setPayment] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [placedTotal, setPlacedTotal] = useState(0);
  const [placedItems, setPlacedItems] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Math.max(1, Number(item.quantity) || 1);

    return sum + price * quantity;
  }, 0);

  const delivery = subtotal > 0 ? 0 : 0;
  const total = subtotal + delivery;

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  

const placeOrder = (event) => {
  event.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    navigate("/Cart");
    return;
  }

  const newOrderNumber =
    "SK" + Date.now().toString().slice(-8);

  const newOrder = {
    orderId: newOrderNumber,
    orderDate: new Date().toISOString(),
    items: cart.map((item) => ({ ...item })),
    customer: { ...form },
    paymentMethod: payment,
    subtotal,
    delivery,
    total,
    status: "Order Placed",
  };

  try {
    const savedOrders = JSON.parse(
      localStorage.getItem(ORDERS_KEY) || "[]"
    );

    const previousOrders = Array.isArray(savedOrders)
      ? savedOrders
      : [];

    // Save the order details
    localStorage.setItem(
      ORDERS_KEY,
      JSON.stringify([newOrder, ...previousOrders])
    );

    // Save details for the success screen
    setOrderNumber(newOrderNumber);
    setPlacedTotal(total);
    setPlacedItems(cart.map((item) => ({ ...item })));
    setOrderPlaced(true);

    // Clear the shopping cart
    localStorage.removeItem(CART_KEY);
    setCart([]);

    // Update the navbar cart count
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Order could not be saved:", error);
    alert("Unable to save the order. Please try again.");
  }
};



  // Successful order confirmation
  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="order-success">
          <FaCheckCircle className="success-icon" />

          <h1>Order Placed Successfully!</h1>

          <p>Thank you for shopping with ShoeKart.</p>

          <div className="success-details">
            <p>
              <strong>Order ID:</strong> {orderNumber}
            </p>

            <p>
              <strong>Status:</strong> Order Placed
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {payment === "cod"
                ? "Cash on Delivery"
                : "Online Payment Selected"}
            </p>

            <p>
              <strong>Total:</strong> ₹
              {placedTotal.toLocaleString("en-IN")}
            </p>

            <p>
              <strong>Products:</strong> {placedItems.length}
            </p>
          </div>

          <button
            type="button"
            className="place-order-btn"
            onClick={() => navigate("/MyOrders")}
          >
            View My Orders
          </button>

          <button
            type="button"
            className="back-shopping-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Back
        </button>

        <div className="checkout-heading">
          <h1>Checkout</h1>
          <p>Complete your details to place your order.</p>
        </div>

        <form
          className="checkout-layout"
          onSubmit={placeOrder}
        >
          {/* Delivery Information */}
          <div className="checkout-left">
            <section className="checkout-card">
              <h2>
                <FaMapMarkerAlt /> Delivery Information
              </h2>

              <div className="checkout-form-grid">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={updateField}
                  required
                />

                <input
                  type="tel"
                  name="mobile"
                  placeholder="10-digit Mobile Number"
                  value={form.mobile}
                  onChange={updateField}
                  pattern="[6-9][0-9]{9}"
                  title="Enter a valid 10-digit Indian mobile number"
                  maxLength={10}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={updateField}
                  required
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Full Address"
                  value={form.address}
                  onChange={updateField}
                  required
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={updateField}
                  required
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={updateField}
                  required
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="6-digit PIN Code"
                  value={form.pincode}
                  onChange={updateField}
                  pattern="[0-9]{6}"
                  title="Enter a valid 6-digit PIN code"
                  maxLength={6}
                  required
                />
              </div>
            </section>

            {/* Payment Method */}
            <section className="checkout-card">
              <h2>
                <FaCreditCard /> Payment Method
              </h2>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={payment === "cod"}
                  onChange={(event) =>
                    setPayment(event.target.value)
                  }
                />

                <FaTruck />

                <span>
                  <strong>Cash on Delivery</strong>
                  <small>Pay when your order arrives.</small>
                </span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={payment === "online"}
                  onChange={(event) =>
                    setPayment(event.target.value)
                  }
                />

                <FaCreditCard />

                <span>
                  <strong>Online Payment</strong>
                  <small>
                    Demo selection only; no payment is processed.
                  </small>
                </span>
              </label>
            </section>
          </div>

          {/* Order Summary */}
          <aside className="checkout-card order-summary">
            <h2>
              <FaShoppingBag /> Order Summary
            </h2>

            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="summary-products">
                {cart.map((item, index) => {
                  const quantity = Math.max(
                    1,
                    Number(item.quantity) || 1
                  );

                  return (
                    <div
                      className="summary-product"
                      key={item.id ?? index}
                    >
                      <div className="summary-product-info">
                        <strong>
                          {item.name || item.title || "Shoe"}
                        </strong>

                        <small>Qty: {quantity}</small>
                      </div>

                      <span>
                        ₹
                        {(
                          (Number(item.price) || 0) * quantity
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="summary-row">
              <span>Subtotal</span>
              <span>
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
            </div>

            <div className="summary-row summary-total">
              <strong>Total</strong>
              <strong>
                ₹{total.toLocaleString("en-IN")}
              </strong>
            </div>

            <button
              type="submit"
              className="place-order-btn"
              disabled={cart.length === 0}
            >
              Place Order
            </button>

            <p className="checkout-note">
              Your order details will be saved to My Orders.
            </p>
          </aside>
        </form>
      </div>
    </div>
  );
}
