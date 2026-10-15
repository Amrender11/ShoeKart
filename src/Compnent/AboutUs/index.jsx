
import { Link } from "react-router-dom";
import {
  FaShoePrints,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaHeart,
} from "react-icons/fa";
import "./index.css";

const About = () => {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-tag">WELCOME TO SH OEKART</span>

          <h1>
            Every Step
            <br />
            <span>Starts With Style.</span>
          </h1>

          <p>
            At ShoeKart, we believe that the right pair of shoes
            does more than complete your outfit. It gives you
            comfort, confidence, and the freedom to move forward.
          </p>

          <Link to="/Men" className="about-btn">
            Explore Collection
          </Link>
        </div>

        <div className="about-hero-image">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85"
            alt="Stylish red sports shoe"
          />
        </div>
      </section>

      {/* Brand Introduction */}
      <section className="about-intro">
        <span className="about-tag">WHO WE ARE</span>

        <h2>
          More Than Shoes.
          <br />
          <span>A Way of Life.</span>
        </h2>

        <p>
          ShoeKart is an online footwear shopping destination
          created for people who love comfort, quality, and style.
          From everyday essentials to sporty sneakers and
          fashionable footwear, our goal is to help you find
          shoes that suit your lifestyle.

          <br />
          <br />

          We bring together different styles for men, women,
          and kids, making it easier to discover your next
          favourite pair in one place.
        </p>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="mission-image">
          <img
            src="https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=1000&q=85"
            alt="Footwear collection"
            loading="lazy"
          />
        </div>

        <div className="mission-content">
          <span className="about-tag">OUR MISSION</span>

          <h2>
            Making Every
            <br />
            Step Count.
          </h2>

          <p>
            Our mission is to make footwear shopping simple,
            convenient, and enjoyable. We want every customer
            to discover a pair that matches their needs,
            personal style, and everyday adventures.
          </p>

          <p>
            We aim to provide an easy shopping experience
            with clear product information and a variety of
            footwear choices.
          </p>

          <Link to="/Women" className="about-btn">
            Find Your Style
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="about-benefits">
        <div className="benefits-heading">
          <span className="about-tag">THE SH OEKART DIFFERENCE</span>
          <h2>Why Shop With Us?</h2>
          <p>
            A smoother shopping experience, from browsing
            to finding your next favourite pair.
          </p>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <FaShoePrints />
            <h3>Style & Variety</h3>
            <p>
              Explore footwear styles for different
              occasions and everyday needs.
            </p>
          </div>

          <div className="benefit-card">
            <FaShippingFast />
            <h3>Easy Shopping</h3>
            <p>
              Browse collections and discover products
              from the comfort of your home.
            </p>
          </div>

          <div className="benefit-card">
            <FaShieldAlt />
            <h3>Shopping Confidence</h3>
            <p>
              Get clear product details to help you
              make informed shopping choices.
            </p>
          </div>

          <div className="benefit-card">
            <FaHeadset />
            <h3>Customer First</h3>
            <p>
              We aim to make your shopping journey
              straightforward and convenient.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="about-cta">
        <FaHeart className="cta-heart" />

        <h2>Find Your Perfect Pair.</h2>

        <p>
          Great style begins from the ground up.
          Explore the ShoeKart collection today.
        </p>

        <Link to="/New" className="about-btn">
          Discover New Arrivals
        </Link>
      </section>

    </div>
  );
};

export default About;