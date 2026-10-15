
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaArrowLeft,
} from "react-icons/fa";
import "./index.css";

const CART_KEY = "shoekart-cart";

export function readCart() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
}

export default function AddToCart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(readCart());

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (item, change) => {
    setCart((current) =>
      current.map((product) => {
        if (
          product.id === item.id &&
          product.cartCategory === item.cartCategory
        ) {
          return {
            ...product,
            quantity: Math.max(1, (Number(product.quantity) || 1) + change),
          };
        }
        return product;
      })
    );
  };

  const removeItem = (item) => {
    setCart((current) =>
      current.filter(
        (product) =>
          !(
            product.id === item.id &&
            product.cartCategory === item.cartCategory
          )
      )
    );
  };

  const totalItems = cart.reduce(
    (total, item) => total + (Number(item.quantity) || 1),
    0
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  return (
    <main className="shoekart-cart-page">
      <div className="cart-page-heading">
        <p>YOUR SHOEKART BAG</p>
        <h1>Shopping Cart</h1>
        <span>Review your favourite shoes before ordering.</span>
      </div>

      <button className="cart-back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Continue Shopping
      </button>

      {cart.length === 0 ? (
        <section className="empty-cart">
          <FaShoppingCart className="empty-cart-icon" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any shoes yet.</p>
          <Link to="/Sale" className="shop-now-btn">
            Explore Sale
          </Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {cart.map((item, index) => {
              const image =
                item.image ||
                item.thumbnail ||
                (Array.isArray(item.images) ? item.images[0] : "");

              return (
                <article
                  className="cart-item"
                  key={`${item.cartCategory || "product"}-${item.id}-${index}`}
                >
                  <div className="cart-item-image">
                    {image ? (
                      <img src={image} alt={item.name || item.title || "Shoe"} />
                    ) : (
                      <span>No image</span>
                    )}
                  </div>

                  <div className="cart-item-info">
                    <p className="cart-item-brand">
                      {item.brand || "ShoeKart"}
                    </p>

                    <h3>{item.name || item.title || "Shoe"}</h3>

                    <p className="cart-item-price">
                      ₹{(Number(item.price) || 0).toLocaleString("en-IN")}
                    </p>

                    <p className="cart-item-size">
                      Size: {item.selectedSize || "Not selected"}
                    </p>

                    <div className="cart-item-bottom">
                      <div className="cart-quantity">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item, -1)}
                        >
                          <FaMinus />
                        </button>

                        <span>{Number(item.quantity) || 1}</span>

                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item, 1)}
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <button
                        className="cart-remove-btn"
                        onClick={() => removeItem(item)}
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-subtotal">
                    ₹
                    {(
                      (Number(item.price) || 0) *
                      (Number(item.quantity) || 1)
                    ).toLocaleString("en-IN")}
                  </div>
                </article>
              );
            })}
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Products</span>
              <span>{totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span className="free-delivery">FREE</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
            </div>

            <button
              className="cart-checkout-btn"
              onClick={() =>
                navigate("/Order", {
                  state: { cart, totalPrice },
                })
              }
            >
              Proceed to Order
            </button>

            <Link to="/Sale" className="cart-continue-link">
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
