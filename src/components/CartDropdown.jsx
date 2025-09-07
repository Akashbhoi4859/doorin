// ✅ Import React and external CSS for styling
import React from "react";
import "./CartDropdown.css";

// 🛒 This component shows a small dropdown cart
export default function CartDropdown({ cart }) {

  // 📌 This function calculates the subtotal price
  const getSubtotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-dropdown">
      <h4>Your Cart</h4>

      {/* 🧺 If cart is empty, show a message */}
      {cart.length === 0 ? (
        <p className="empty-message">No items yet.</p>
      ) : (
        <>
          {/* 🧾 List all items in the cart */}
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id}>
                {/* 📦 Show item name */}
                <span className="item-name">{item.name}</span>
                {/* 💰 Show quantity and price */}
                <span className="item-details">
                  {item.quantity} × ${item.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          {/* 🧮 Show subtotal and a checkout button */}
          <div className="cart-summary">
            <p className="subtotal">Subtotal: ${getSubtotal()}</p>
            <button className="checkout-button">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
