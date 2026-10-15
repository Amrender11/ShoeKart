import React, { useState, useEffect } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaBolt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./NewArrivals.css";
import { products } from "../../home";
import { useNavigate } from "react-router-dom";

const WISHLIST_KEY = "shoekart-wishlist";

function NewArrivals() {

  const navigate = useNavigate();
  // Load existing wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(WISHLIST_KEY) || "[]"
      );
    } catch {
      return [];
    }
  });

  // Save wishlist whenever it changes
  useEffect(() => {
    localStorage.setItem(
      WISHLIST_KEY,
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // Add or remove a product
  const toggleWishlist = (product) => {
    setWishlist((previousWishlist) => {
      const alreadySaved = previousWishlist.some(
        (item) =>
          item.id === product.id &&
          item.wishlistCategory === "new-arrivals"
      );

      if (alreadySaved) {
        return previousWishlist.filter(
          (item) =>
            !(
              item.id === product.id &&
              item.wishlistCategory === "new-arrivals"
            )
        );
      }

      return [
        ...previousWishlist,
        {
          ...product,
          wishlistCategory: "new-arrivals"
        }
      ];
    });
  };

  // Check if this new arrival is saved
  const isWishlisted = (productId) => {
    return wishlist.some(
      (item) =>
        item.id === productId &&
        item.wishlistCategory === "new-arrivals"
    );
  };

  return (
    <section className="new-arrivals">

      <div className="arrival-heading">
        <p>JUST DROPPED</p>
        <h2>NEW ARRIVALS</h2>
        <span>Step into the latest styles</span>
      </div>

      <div className="arrival-products">

        {products.map((product) => {
          const saved = isWishlisted(product.id);

          return (
            <div
              className="arrival-card"
              key={product.id}
            >

              <div className="arrival-image">

                <span className="new-badge">
                  NEW
                </span>

                {/* WISHLIST HEART */}
                <button
                  type="button"
                  className={`heart-btn ${saved ? "active" : ""}`}
                  onClick={() => toggleWishlist(product)}
                  aria-label={
                    saved
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  title={
                    saved
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >
                  <FaHeart />
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                />

              </div>

              <div className="arrival-info">

                <h3>{product.name}</h3>

                <div className="rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} />
                  ))}
                </div>

                <div className="price-cart">

                  <h4>₹{product.price}</h4>

  <button
  type="button"
  className="sale-cart-btn"
  onClick={() => {
    try {
      const existingCart = JSON.parse(
        localStorage.getItem("shoekart-cart") || "[]"
      );

      const cartProduct = {
        ...product,
        cartCategory: "sale",
        quantity: 1,
      };

      const existingIndex = existingCart.findIndex(
        (item) =>
          item.id === product.id &&
          item.cartCategory === "sale"
      );

      if (existingIndex !== -1) {
        existingCart[existingIndex] = {
          ...existingCart[existingIndex],
          quantity:
            (Number(existingCart[existingIndex].quantity) || 1) + 1,
        };
      } else {
        existingCart.push(cartProduct);
      }

      localStorage.setItem(
        "shoekart-cart",
        JSON.stringify(existingCart)
      );

      navigate("/Cart");
    } catch (error) {
      alert("Unable to add this product. Please try again.");
    }
  }}
>
  <FaShoppingCart />
  Add to Cart
</button>
                     <button
    type="button"
    className="sale-buy-btn"
    onClick={() => {
      navigate("/ProductDetails", {
        state: {
          product,
          wishlistCategory: "sale",
        },
      });
    }}
  >
    <FaBolt />
    Buy Now
  </button>

                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* <div className="arrival-actions">
        <Link
          to="/Wishlist"
          className="view-all-btn"
        >
          <FaHeart /> VIEW WISHLIST ({wishlist.length})
        </Link>
      </div> */}

    </section>
  );
}

export default NewArrivals;