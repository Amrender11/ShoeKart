
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaStar,
  FaBolt,
} from "react-icons/fa";
import "./ProductDetails.css";

const CART_KEY = "shoekart-cart";

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

export default function ProductDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const product = state?.product;
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  // Return to the previous page if no product was passed
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product details not available</h2>
        <p>Please open this page by clicking a product card.</p>
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  const sizes = product.sizes || product.size || [];
  const availableSizes = Array.isArray(sizes)
    ? sizes
    : String(sizes).split(",").map((size) => size.trim()).filter(Boolean);

  const price = Number(product.price) || 0;
  const image =
    product.image ||
    product.thumbnail ||
    (Array.isArray(product.images) ? product.images[0] : "");

  function addToCart(goToCheckout = false) {
    if (!selectedSize) {
      setMessage("Please select a shoe size first.");
      return;
    }

    const cart = readCart();

    const cartItem = {
      ...product,
      image,
      selectedSize,
      quantity,
      cartKey: `${product.id}-${selectedSize}`,
    };

    const existingIndex = cart.findIndex(
      (item) =>
        item.cartKey === cartItem.cartKey &&
        item.wishlistCategory === cartItem.wishlistCategory
    );

    if (existingIndex >= 0) {
      cart[existingIndex] = {
        ...cart[existingIndex],
        quantity: cart[existingIndex].quantity + quantity,
      };
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    if (goToCheckout) {
      navigate("/Order", {
        state: {
          product: cartItem,
          fromProductDetails: true,
        },
      });
    } else {
      setMessage("Product added to your cart successfully!");
    }
  }

  return (
    <main className="product-details-page">
      <button
        className="details-back-btn"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Back to Products
      </button>

      <section className="product-details-card">
        <div className="details-image">
          {image ? (
            <img src={image} alt={product.name || "Shoe"} />
          ) : (
            <div className="details-no-image">No image available</div>
          )}
        </div>

        <div className="details-info">
          <p className="details-brand">{product.brand || "ShoeKart"}</p>

          <h1>{product.name || product.title}</h1>

          <div className="details-rating">
            <FaStar />
            <span>{product.rating || "New"}</span>
            {product.reviews ? <span>({product.reviews} reviews)</span> : null}
          </div>

          <div className="details-price">
            ₹{price.toLocaleString("en-IN")}
            {product.originalPrice && (
              <del>
                ₹{Number(product.originalPrice).toLocaleString("en-IN")}
              </del>
            )}
          </div>

          <p className="details-description">
            {product.description ||
              `Discover ${product.name || "this shoe"} from ${
                product.brand || "ShoeKart"
              }. Select your size and add it to your cart.`}
          </p>

          <div className="details-option">
            <label htmlFor="shoe-size">Select Size</label>

            {availableSizes.length > 0 ? (
              <div className="size-options">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={
                      String(selectedSize) === String(size)
                        ? "size-btn selected"
                        : "size-btn"
                    }
                    onClick={() => {
                      setSelectedSize(String(size));
                      setMessage("");
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            ) : (
              <p className="size-warning">
                No sizes are listed for this product.
              </p>
            )}
          </div>

          <div className="details-option">
            <label htmlFor="quantity">Quantity</label>
            <div className="quantity-control">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span id="quantity">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <p className="details-total">
            Total: ₹{(price * quantity).toLocaleString("en-IN")}
          </p>

          {message && (
            <p className="details-message" role="status">
              {message}
            </p>
          )}

          <div className="details-actions">
            <button
              className="details-cart-btn"
              onClick={() => addToCart(false)}
            >
              <FaShoppingCart /> Add to Cart
            </button>

            <button
              className="details-order-btn"
              onClick={() => addToCart(true)}
            >
              <FaBolt /> Order Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
