import { useState, useEffect } from "react";
import { New } from "../../New";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaFilter,
  FaBolt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./index.css";

const WISHLIST_KEY = "shoekart-wishlist";
const WISHLIST_CATEGORY = "new-arrivals";

export const NewProduct = () => {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate();
  const [brand, setBrand] = useState("All");
  const [type, setType] = useState("All");
  const [price, setPrice] = useState("All");
  const [sort, setSort] = useState("Default");

  // Load saved wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(WISHLIST_KEY) || "[]"
      );
    } catch {
      return [];
    }
  });

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem(
      WISHLIST_KEY,
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // Add or remove a new-arrival product
  const toggleWishlist = (product) => {
    setWishlist((previousWishlist) => {
      const alreadySaved = previousWishlist.some(
        (item) =>
          item.id === product.id &&
          item.wishlistCategory === WISHLIST_CATEGORY
      );

      if (alreadySaved) {
        return previousWishlist.filter(
          (item) =>
            !(
              item.id === product.id &&
              item.wishlistCategory === WISHLIST_CATEGORY
            )
        );
      }

      return [
        ...previousWishlist,
        {
          ...product,
          wishlistCategory: WISHLIST_CATEGORY
        }
      ];
    });
  };

  // Check whether a product is saved
  const isWishlisted = (productId) => {
    return wishlist.some(
      (item) =>
        item.id === productId &&
        item.wishlistCategory === WISHLIST_CATEGORY
    );
  };

  // FILTER PRODUCTS
  let filteredProducts = New.filter((product) => {
    const searchText = search.toLowerCase();

    const searchMatch =
      product.name.toLowerCase().includes(searchText) ||
      product.brand.toLowerCase().includes(searchText);

    const brandMatch =
      brand === "All" || product.brand === brand;

    const typeMatch =
      type === "All" || product.type === type;

    let priceMatch = true;

    if (price === "under5000") {
      priceMatch = product.price < 5000;
    }

    if (price === "5000-10000") {
      priceMatch =
        product.price >= 5000 &&
        product.price <= 10000;
    }

    if (price === "10000-20000") {
      priceMatch =
        product.price > 10000 &&
        product.price <= 20000;
    }

    if (price === "above20000") {
      priceMatch = product.price > 20000;
    }

    return (
      searchMatch &&
      brandMatch &&
      typeMatch &&
      priceMatch
    );
  });

  // SORT PRODUCTS
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
      (a, b) => (b.rating || 0) - (a.rating || 0)
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
    <section className="new-products">

      {/* HEADING */}
      <div className="new-heading">
        <p>SHOEKART LATEST COLLECTION</p>
        <h1>NEW ARRIVALS</h1>
        <span>
          Discover the latest shoes and trending styles.
        </span>
      </div>

      {/* SEARCH, FILTER, SORT AND WISHLIST */}
      <div className="product-toolbar">
        <input
          type="text"
          placeholder="Search new arrivals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          type="button"
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
              <option value="New Balance">New Balance</option>
              <option value="ASICS">ASICS</option>
            </select>
          </div>

          <div className="filter-group">
            <h3>Category</h3>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Running Shoes">Running Shoes</option>
              <option value="Sneakers">Sneakers</option>
              <option value="Lifestyle Shoes">Lifestyle Shoes</option>
              <option value="Basketball Shoes">Basketball Shoes</option>
              <option value="Casual Shoes">Casual Shoes</option>
            </select>
          </div>

          <div className="filter-group">
            <h3>Price</h3>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="All">All Prices</option>
              <option value="under5000">Under ₹5,000</option>
              <option value="5000-10000">₹5,000 - ₹10,000</option>
              <option value="10000-20000">₹10,000 - ₹20,000</option>
              <option value="above20000">Above ₹20,000</option>
            </select>
          </div>

          <button
            type="button"
            className="reset-btn"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* RESULT COUNT */}
      <div className="result-info">
        <p>
          <b>{filteredProducts.length}</b> new products found
        </p>
      </div>

      {/* PRODUCTS */}
      <div className="arrival-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            // IMPORTANT: saved is defined for each product
            const saved = isWishlisted(product.id);

            return (
              <div
                className="arrival-card"
                key={product.id}
              >
                <div className="arrival-image">

                  <span
                    className={
                      product.badge === "TRENDING"
                        ? "trending-badge"
                        : "new-badge"
                    }
                  >
                    {product.badge || "NEW"}
                  </span>

                  {/* WORKING WISHLIST HEART */}
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

                  {/* RATING */}
                  <div className="rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} />
                    ))}

                    <span>
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* PRICE */}
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
            <h2>No new shoes found</h2>
            <p>Try changing your search or filters.</p>

            <button
              type="button"
              onClick={resetFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

    </section>
  );
};