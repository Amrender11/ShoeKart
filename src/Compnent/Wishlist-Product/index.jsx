import { useState, useEffect } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaTrash
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./index.css";
import { useNavigate } from "react-router-dom";

const WISHLIST_KEY = "shoekart-wishlist";

export const Wishlist11 = () => {

    const navigate = useNavigate();

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(WISHLIST_KEY) || "[]"
      );
    } catch {
      return [];
    }
  });

  // Keep localStorage updated
  useEffect(() => {
    localStorage.setItem(
      WISHLIST_KEY,
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // Remove one product
  const removeFromWishlist = (id) => {
    setWishlist((previous) =>
      previous.filter((product) => product.id !== id)
    );
  };

  // Remove all products
  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <section className="wishlist-page">
      <div className="wishlist-heading">
        <FaHeart className="wishlist-main-heart" />
        <p>YOUR FAVOURITES</p>
        <h1>My Wishlist</h1>
        <span>
          Your favourite shoes, all in one place.
        </span>
      </div>

      <div className="wishlist-topbar">
        <p>
          {wishlist.length}{" "}
          {wishlist.length === 1 ? "item" : "items"} saved
        </p>

        {wishlist.length > 0 && (
          <button
            className="clear-wishlist-btn"
            onClick={clearWishlist}
          >
            <FaTrash /> Clear Wishlist
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <FaHeart className="empty-heart" />
          <h2>Your wishlist is empty!</h2>
          <p>
            You haven't saved any shoes yet.
            Explore our collection and add your favourites.
          </p>

          <Link to="/Men" className="shop-now-btn">
            Explore Men's Shoes
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div className="wishlist-card" key={product.id}>
              <div className="wishlist-image">
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="wishlist-info">
                <p className="wishlist-brand">
                  {product.brand}
                </p>

                <h3>{product.name}</h3>

                <div className="wishlist-rating">
                  <FaStar />
                  <span>
                    {product.rating ?? "N/A"}
                  </span>
                  {product.reviews != null && (
                    <span>({product.reviews} reviews)</span>
                  )}
                </div>

                <h4>₹{product.price}</h4>

                {product.oldPrice && (
                  <del>₹{product.oldPrice}</del>
                )}

                <div className="wishlist-actions">
                  <button
                    className="wishlist-remove-btn"
                    onClick={() =>
                      removeFromWishlist(product.id)
                    }
                  >
                    <FaTrash /> Remove
                  </button>

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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};