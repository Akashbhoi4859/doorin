import React, { useState } from "react";
import "./Cart.css";

export default function Cart({ cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal * (1 - discount);

  // Apply coupon
  const applyCoupon = () => {
    if (couponCode.trim().toLowerCase() === "akash50%") {
      setDiscount(0.5); // 50% discount
      alert("🎉 Coupon applied! You get 50% off.");
    } else {
      setDiscount(0);
      alert("❌ Invalid coupon code.");
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    alert(`🧾 Your total bill is: $${total.toFixed(2)}`);
    onClearCart();
    setCouponCode("");
    setDiscount(0);
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <span className="item-name">{item.name}</span>
              <span className="item-price">${item.price.toFixed(2)}</span>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
                className="quantity-input"
              />
              <button onClick={() => onRemoveItem(item.id)} className="remove-btn">
                Remove
              </button>
            </div>
          ))}

          {/* Coupon section */}
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

          <button className="checkout-btn" onClick={handleCheckout}>
            ✅ Checkout
          </button>
        </>
      )}
    </div>
  );
}
