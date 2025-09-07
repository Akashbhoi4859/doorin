import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import products from "./products";
import Footer from "./components/Footer";
import FurnitureMarquee from "./components/FurnitureMarquee";
import AboutPage from "./components/AboutPage";
import Shutter from "./components/Shutter";
import ContactForm from "./ContactForm";
import ImageSlider from "./components/ImageSlider";
import CurtainLoader from "./components/CurtainLoader";

import "./App.css";
import heroImage from "/blue.jpg";

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCurtain, setShowCurtain] = useState(false);

  // 🎨 Multi-theme support
  const themes = ["default", "dark", "blue", "green", "purple", "orange"];
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "default"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  // Cart handlers
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCart = (itemId, newQty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const handleProductsClick = () => {
    setShowCurtain(true);
    setTimeout(() => {
      setShowCurtain(false);
      document
        .getElementById("products")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 2000);
  };

  return (
    <div className="app">
      {/* 🎨 Floating Theme Switcher */}
      <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
          padding: "12px 16px",
          borderRadius: "50%",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          fontSize: "18px",
        }}
        title="Change Theme"
      >
        🎨
      </button>

      <Shutter />
      <Navbar
        cart={cart}
        onUpdateCart={updateCart}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
        onProductsClick={handleProductsClick}
      />

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <img src={heroImage} alt="Modern Living Room" className="hero-image" />
        <div className="hero-overlay"></div>
        <div className="hero-text">
          <h1>
            Where Every Space
            <br />
            Tells a Story!
          </h1>
          <p>Perfect style for your space</p>
          <button
            className="hero-button"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Schedule a consultation →
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products-section">
        {showCurtain && <CurtainLoader />}
        <h2 className="products-heading">Our Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>

      <ImageSlider />

      <section id="about" className="about-section">
        <AboutPage />
      </section>

      <section id="contact" className="contact-section">
        <ContactForm />
      </section>

      <Footer />
      <FurnitureMarquee />
    </div>
  );
}
