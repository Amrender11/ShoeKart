import "./index.css";

import menShoes from "../../assets/men-shoes.png";
 import womenShoes from "../../assets/women-shoes.png";
 import sneakers from "../../assets/sneakers.png";

export const Category = () => {
  return (
    <section className="category-section">

      {/* Heading */}
      <div className="category-heading">
        <p>EXPLORE SH0EKART</p>

        <h2>Find Your Perfect Pair</h2>
      </div>


    
      <div className="category-container">

        {/* Men */}
        <div className="category-card">

          <img
            src={menShoes}
            alt="Men's Shoes"
          />

          <div className="category-overlay">
            <h3>FOR HIM</h3>

            <a href="/Men">
              SHOP MEN
            </a>
          </div>

        </div>


        
        <div className="category-card">

          <img
             src={womenShoes}
            alt="Women's Shoes"
          />

          <div className="category-overlay">
            <h3>FOR HER</h3>

            <a href="/Women">
              SHOP WOMEN
            </a>
          </div>

        </div>


        {/* Sneakers */}
        <div className="category-card">

          <img
             src={sneakers}
             alt="Sneakers"
          />

          <div className="category-overlay">
            <h3>SNEAKER COLLECTION</h3>

            <a href="/New">
              EXPLORE
            </a>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Category;