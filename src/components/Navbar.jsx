import React, { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import "./Navbar.css";

export default function Navbar({
  cart,
  onUpdateCart,
  onRemoveItem,
  onClearCart,
  onProductsClick,
}) {
  const [showCart, setShowCart] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [menuOpen, setMenuOpen] = useState(false);
  const audioRef = useRef(null);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const total = totalPrice * (1 - discount);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleQuantityChange = (itemId, delta) => {
    const item = cart.find((i) => i.id === itemId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty <= 0) onRemoveItem(itemId);
    else onUpdateCart(itemId, newQty);
  };

  const applyCoupon = () => {
    if (couponCode.trim().toLowerCase() === "akash50") {
      setDiscount(0.5);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } else {
      setDiscount(0);
      alert("❌ Invalid coupon code.");
    }
  };

  const handleGenerateBill = () => {
    alert(`🧾 Your total bill is: $${total.toFixed(2)}`);
    onClearCart();
    setCouponCode("");
    setDiscount(0);
    setShowCart(false);
  };

  // 🎵 Play / Pause with promise handling
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.error("Audio playback failed:", error);
            alert(
              "Audio playback failed. Make sure the file exists and is supported."
            );
          });
      }
    }
  };

  // 🔊 Volume
  const increaseVolume = () => {
    if (!audioRef.current) return;
    const newVolume = Math.min(volume + 0.1, 1);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const decreaseVolume = () => {
    if (!audioRef.current) return;
    const newVolume = Math.max(volume - 0.1, 0);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <nav className="navbar">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <div className="navbar-logo">HomeStyle 🛋️</div>

      {/* 🍔 Mobile Menu */}
      <div
        className="navbar-toggle"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        ☰
      </div>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
        </li>
        <li>
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              onProductsClick && onProductsClick();
              setMenuOpen(false);
            }}
          >
            Products
          </a>
        </li>
        <li>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
        </li>
        <li>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </li>

        {/* 🎵 Music inside navbar links */}
        <li>
          <a
            href="#music"
            onClick={(e) => {
              e.preventDefault();
              toggleMusic();
            }}
          >
            {isPlaying ? "⏸ Pause Music" : "▶ Music"}
          </a>
        </li>
        <li className="volume-controls">
          <button onClick={decreaseVolume}>➖</button>
          <span>{Math.round(volume * 100)}%</span>
          <button onClick={increaseVolume}>➕</button>
        </li>
      </ul>

      {/* Hidden audio element */}
      <audio ref={audioRef} src="public/sample.mp3" loop />

      <div className="navbar-cart-wrapper">
        <div className="navbar-cart" onClick={() => setShowCart(true)}>
          🛒 Cart <span className="cart-count">({totalItems})</span>
        </div>
      </div>

      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowCart(false)}>
              ✖
            </button>
            <h4>Your Cart</h4>

            {cart.length === 0 ? (
              <p className="empty-cart">Cart is empty</p>
            ) : (
              <>
                <ul className="cart-items">
                  {cart.map((item) => (
                    <li key={item.id} className="cart-item">
                      <div className="item-info">
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                      <div className="quantity-controls">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="coupon-section">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="coupon-input"
                  />
                  <button onClick={applyCoupon} className="apply-coupon-btn">
                    Apply
                  </button>
                </div>

                <hr />
                <p className="cart-total">
                  <strong>Total:</strong> ${total.toFixed(2)}
                </p>
                <button
                  className="generate-bill-btn"
                  onClick={handleGenerateBill}
                >
                  🧾 Generate Bill
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
