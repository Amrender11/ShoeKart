import { useState, useEffect } from "react";
import { Men } from "../../Men";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaFilter,
  FaBolt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./index.css";
import { useNavigate } from "react-router-dom";

const WISHLIST_KEY = "shoekart-wishlist";

export const MenProduct = () => {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
const navigate = useNavigate();

  const [brand, setBrand] = useState("All");
  const [type, setType] = useState("All");
  const [price, setPrice] = useState("All");
  const [sort, setSort] = useState("Default");

  // Load wishlist from localStorage
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

  // Add or remove a product from wishlist
  const toggleWishlist = (product) => {
    setWishlist((previousWishlist) => {
      const alreadySaved = previousWishlist.some(
        (item) => item.id === product.id
      );

      if (alreadySaved) {
        return previousWishlist.filter(
          (item) => item.id !== product.id
        );
      }

      return [...previousWishlist, product];
    });
  };

  const isWishlisted = (productId) => {
    return wishlist.some(
      (item) => item.id === productId
    );
  };

  // FILTER
  let filteredProducts = Men.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const brandMatch =
      brand === "All" || product.brand === brand;

    const typeMatch =
      type === "All" || product.type === type;

    let priceMatch = true;

    if (price === "under3000") {
      priceMatch = product.price < 3000;
    }

    if (price === "3000-5000") {
      priceMatch =
        product.price >= 3000 &&
        product.price <= 5000;
    }

    if (price === "5000-8000") {
      priceMatch =
        product.price > 5000 &&
        product.price <= 8000;
    }

    if (price === "above8000") {
      priceMatch = product.price > 8000;
    }

    return (
      searchMatch &&
      brandMatch &&
      typeMatch &&
      priceMatch
    );
  });

  // SORT
  if (sort === "low") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "rating") {
    filteredProducts.sort(
      (a, b) => b.rating - a.rating
    );
  }

  // RESET FILTERS
  const resetFilters = () => {
    setSearch("");
    setBrand("All");
    setType("All");
    setPrice("All");
    setSort("Default");
  };

  return (
    <section className="men-products">

      {/* HEADING */}
      <div className="men-heading">
        <p>SHOEKART MEN'S COLLECTION</p>
        <h1>MEN'S SHOES</h1>
        <span>
          Discover premium styles made for every step.
        </span>
      </div>

      {/* SEARCH + FILTER */}
      <div className="product-toolbar">
        <input
          type="text"
          placeholder="Search men's shoes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="filter-btn"
          onClick={() => setShowFilter(!showFilter)}
        >
          <FaFilter /> Filters
        </button>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="Default">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>

        {/* WISHLIST LINK */}
        <Link to="/Wishlist" className="wishlist-link">
          <FaHeart />
          Wishlist ({wishlist.length})
        </Link>
      </div>

      {/* FILTER PANEL */}
      {showFilter && (
        <div className="filter-panel">
          <div className="filter-group">
            <h3>Brand</h3>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="All">All Brands</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Puma">Puma</option>
              <option value="Reebok">Reebok</option>
              <option value="New Balance">New Balance</option>
              <option value="Converse">Converse</option>
              <option value="ASICS">ASICS</option>
              <option value="Vans">Vans</option>
            </select>
          </div>

          <div className="filter-group">
            <h3>Category</h3>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Sneakers">Sneakers</option>
              <option value="Running Shoes">Running Shoes</option>
              <option value="Casual Shoes">Casual Shoes</option>
              <option value="Lifestyle Shoes">Lifestyle Shoes</option>
              <option value="High Top">High Top</option>
            </select>
          </div>

          <div className="filter-group">
            <h3>Price</h3>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="All">All Prices</option>
              <option value="under3000">Under ₹3,000</option>
              <option value="3000-5000">₹3,000 - ₹5,000</option>
              <option value="5000-8000">₹5,000 - ₹8,000</option>
              <option value="above8000">Above ₹8,000</option>
            </select>
          </div>

          <button className="reset-btn" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      )}

      {/* RESULT */}
      <div className="result-info">
        <p>
          <b>{filteredProducts.length}</b> products found
        </p>
      </div>

      {/* PRODUCTS */}
      <div className="arrival-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const saved = isWishlisted(product.id);

            return (
              <div className="arrival-card" key={product.id}>
                <div className="arrival-image">
                  <span className="new-badge">NEW</span>

                  {/* WORKING HEART BUTTON */}
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
                  <p className="product-brand">
                    {product.brand}
                  </p>

                  <h3>{product.name}</h3>

                  <div className="rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} />
                    ))}
                    <span>({product.reviews})</span>
                  </div>

                  <div className="price-section">
                    <div>
                      <h4>₹{product.price}</h4>

                      {product.oldPrice && (
                        <del>₹{product.oldPrice}</del>
                      )}

                      {product.discount && (
                        <span className="discount">
                          {product.discount}% OFF
                        </span>
                      )}
                    </div>

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
          })
        ) : (
          <div className="no-products">
            <h2>No shoes found</h2>
            <p>Try changing your filters.</p>
            <button onClick={resetFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};