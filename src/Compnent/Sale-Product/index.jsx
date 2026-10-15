
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SaleProducts } from "../../Sale";

import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaFilter,
  FaBolt,
} from "react-icons/fa";

import "./index.css";

const WISHLIST_KEY = "shoekart-wishlist";

export const SaleProduct = () => {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

const navigate = useNavigate();

  const [brand, setBrand] = useState("All");
  const [type, setType] = useState("All");
  const [price, setPrice] = useState("All");
  const [discount, setDiscount] = useState("All");
  const [size, setSize] = useState("All");
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

  // Add or remove a sale product from wishlist
  const toggleWishlist = (product) => {
    setWishlist((previousWishlist) => {
      const alreadySaved = previousWishlist.some(
        (item) =>
          item.id === product.id &&
          item.wishlistCategory === "sale"
      );

      if (alreadySaved) {
        return previousWishlist.filter(
          (item) =>
            !(
              item.id === product.id &&
              item.wishlistCategory === "sale"
            )
        );
      }

      return [
        ...previousWishlist,
        {
          ...product,
          wishlistCategory: "sale",
        },
      ];
    });
  };

  // Check if a product is in the wishlist
  const isWishlisted = (product) => {
    return wishlist.some(
      (item) =>
        item.id === product.id &&
        item.wishlistCategory === "sale"
    );
  };

  // Filter products
  let filteredProducts = SaleProducts.filter((product) => {
    const searchText = search.toLowerCase();

    const searchMatch =
      (product.name || "").toLowerCase().includes(searchText) ||
      (product.brand || "").toLowerCase().includes(searchText);

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

    let discountMatch = true;

    if (discount === "30") {
      discountMatch = product.discount >= 30;
    }

    if (discount === "40") {
      discountMatch = product.discount >= 40;
    }

    if (discount === "50") {
      discountMatch = product.discount >= 50;
    }

    const sizeMatch =
      size === "All" ||
      (product.sizes || []).includes(Number(size));

    return (
      searchMatch &&
      brandMatch &&
      typeMatch &&
      priceMatch &&
      discountMatch &&
      sizeMatch
    );
  });

  // Sorting
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

  if (sort === "discount") {
    filteredProducts.sort(
      (a, b) => b.discount - a.discount
    );
  }

  if (sort === "rating") {
    filteredProducts.sort(
      (a, b) => b.rating - a.rating
    );
  }

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setBrand("All");
    setType("All");
    setPrice("All");
    setDiscount("All");
    setSize("All");
    setSort("Default");
  };

  return (
    <section className="sale-products">

      {/* HERO SECTION */}
      <div className="sale-hero">
        <div className="sale-hero-content">
          <p>SHOEKART SPECIAL OFFER</p>
          <h1>MEGA SALE</h1>
          <h2>UP TO 50% OFF</h2>
          <span>
            Step into your favourite styles for less.
          </span>
        </div>

        <FaBolt className="sale-bolt" />
      </div>

      {/* DISCOUNT SECTION */}
      <div className="discount-section">
        <h2>Shop By Discount</h2>

        <div className="discount-boxes">
          <button onClick={() => setDiscount("30")}>
            <strong>30%</strong>
            <span>OFF & MORE</span>
          </button>

          <button onClick={() => setDiscount("40")}>
            <strong>40%</strong>
            <span>OFF & MORE</span>
          </button>

          <button onClick={() => setDiscount("50")}>
            <strong>50%</strong>
            <span>OFF & MORE</span>
          </button>
        </div>
      </div>

      {/* HEADING */}
      <div className="sale-heading">
        <p>SHOEKART SALE COLLECTION</p>
        <h1>SALE SHOES</h1>
        <span>
          Grab your favourite shoes at amazing prices.
        </span>
      </div>

      {/* TOOLBAR */}
      <div className="sale-toolbar">
        <input
          type="text"
          placeholder="Search sale shoes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="sale-filter-btn"
          onClick={() => setShowFilter(!showFilter)}
        >
          <FaFilter />
          {showFilter ? "Hide Filters" : "Filters"}
        </button>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort sale products"
        >
          <option value="Default">Sort By</option>
          <option value="discount">Highest Discount</option>
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
        <div className="sale-filter-panel">

          {/* BRAND */}
          <div className="sale-filter-group">
            <label>Brand</label>

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
              <option value="ASICS">ASICS</option>
              <option value="Vans">Vans</option>
              <option value="Converse">Converse</option>
              <option value="On">On</option>
            </select>
          </div>

          {/* TYPE */}
          <div className="sale-filter-group">
            <label>Type</label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Running Shoes">Running Shoes</option>
              <option value="Sneakers">Sneakers</option>
              <option value="Casual Shoes">Casual Shoes</option>
              <option value="Lifestyle Shoes">Lifestyle Shoes</option>
              <option value="High Top">High Top</option>
            </select>
          </div>

          {/* PRICE */}
          <div className="sale-filter-group">
            <label>Price</label>

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

          {/* DISCOUNT */}
          <div className="sale-filter-group">
            <label>Discount</label>

            <select
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            >
              <option value="All">All Discounts</option>
              <option value="30">30% OFF & More</option>
              <option value="40">40% OFF & More</option>
              <option value="50">50% OFF & More</option>
            </select>
          </div>

          {/* SIZE */}
          <div className="sale-filter-group">
            <label>Size</label>

            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="All">All Sizes</option>
              <option value="5">UK 5</option>
              <option value="6">UK 6</option>
              <option value="7">UK 7</option>
              <option value="8">UK 8</option>
              <option value="9">UK 9</option>
              <option value="10">UK 10</option>
              <option value="11">UK 11</option>
            </select>
          </div>

          {/* RESET */}
          <button
            className="sale-reset-btn"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* RESULTS */}
      <div className="sale-result-info">
        <span>{filteredProducts.length} products found</span>
      </div>

      {/* PRODUCT GRID */}
      {filteredProducts.length > 0 ? (
        <div className="sale-product-grid">
          {filteredProducts.map((product) => {
            const saved = isWishlisted(product);

            return (
              <div className="sale-card" key={product.id}>

                {/* DISCOUNT BADGE */}
                <div className="sale-badge">
                  {product.discount}% OFF
                </div>

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

                {/* PRODUCT IMAGE */}
                <div className="sale-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                {/* PRODUCT INFORMATION */}
                <div className="sale-info">
                  <p className="sale-brand">
                    {product.brand}
                  </p>

                  <h3>{product.name}</h3>

                  {/* RATING */}
                  <div className="sale-rating">
                    <FaStar />
                    <span>{product.rating}</span>
                    <small>({product.reviews})</small>
                  </div>

                  {/* PRICE */}
                  <div className="sale-price">
                    <strong>
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </strong>

                    <del>
                      ₹{Number(product.oldPrice).toLocaleString("en-IN")}
                    </del>
                  </div>

                  {/* SAVING */}
                  <p className="save-text">
                    You save ₹
                    {(
                      Number(product.oldPrice) -
                      Number(product.price)
                    ).toLocaleString("en-IN")}
                  </p>

                 
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
            );
          })}
        </div>
      ) : (
        <div className="sale-no-products">
          <h2>No sale products found</h2>
          <p>Try changing your filters or search.</p>

          <button onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};

export default SaleProduct;
