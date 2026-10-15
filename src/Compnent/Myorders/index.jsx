
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBoxOpen } from "react-icons/fa";
import "./index.css";

const ORDERS_KEY = "shoekart-orders";

function readOrders() {
  try {
    const data = JSON.parse(
      localStorage.getItem(ORDERS_KEY) || "[]"
    );
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(readOrders);

  useEffect(() => {
    const refresh = () => setOrders(readOrders());

    window.addEventListener("ordersUpdated", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("ordersUpdated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const money = (value) =>
    (Number(value) || 0).toLocaleString("en-IN");

  return (
    <main className="my-orders-page">
      <div className="my-orders-container">
        <button
          className="orders-back-btn"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft /> Continue Shopping
        </button>

        <h1>My Orders</h1>
        <p className="orders-subtitle">
          View your ShoeKart purchases and order details.
        </p>

        {orders.length === 0 ? (
          <section className="orders-empty">
            <FaBoxOpen />
            <h2>No orders found</h2>
            <p>Your successfully placed orders will appear here.</p>
            <button onClick={() => navigate("/")}>
              Shop Now
            </button>
          </section>
        ) : (
          orders.map((order) => (
            <section
              className="my-order-card"
              key={order.orderId}
            >
              <div className="my-order-header">
                <div>
                  <span>ORDER ID</span>
                  <h2>{order.orderId}</h2>
                  <p>
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleString(
                          "en-IN"
                        )
                      : "Date unavailable"}
                  </p>
                </div>

                <span className="my-order-status">
                  {order.status || "Order Placed"}
                </span>
              </div>

              {(order.items || []).map((item, index) => {
                const image =
                  item.image ||
                  item.thumbnail ||
                  (Array.isArray(item.images)
                    ? item.images[0]
                    : "");

                const quantity = Math.max(
                  1,
                  Number(item.quantity) || 1
                );

                return (
                  <div
                    className="my-order-item"
                    key={`${item.id || item.name || "shoe"}-${index}`}
                  >
                    <div className="my-order-img">
                      {image ? (
                        <img
                          src={image}
                          alt={item.name || item.title || "Shoe"}
                        />
                      ) : (
                        <FaBoxOpen />
                      )}
                    </div>

                    <div className="my-order-info">
                      <h3>{item.name || item.title || "Shoe"}</h3>
                      <p>Brand: {item.brand || "ShoeKart"}</p>
                      <p>
                        Size: {item.selectedSize || "Not selected"}
                      </p>
                      <p>Quantity: {quantity}</p>
                    </div>

                    <strong>
                      ₹
                      {money(
                        (Number(item.price) || 0) * quantity
                      )}
                    </strong>
                  </div>
                );
              })}

              <div className="my-order-footer">
                <div>
                  <span>Payment</span>
                  <strong>
                    {order.paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : "Online Payment (Demo)"}
                  </strong>
                </div>

                <div>
                  <span>Deliver to</span>
                  <strong>
                    {order.customer
                      ? [
                          order.customer.fullName,
                          order.customer.address,
                          order.customer.city,
                          order.customer.state,
                          order.customer.pincode,
                        ]
                          .filter(Boolean)
                          .join(", ")
                      : "Address unavailable"}
                  </strong>
                </div>

                <div className="my-order-total">
                  <span>Total Amount</span>
                  <strong>₹{money(order.total)}</strong>
                </div>
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
}
