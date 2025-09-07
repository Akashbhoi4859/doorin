import React, { useState, useEffect } from "react";
import "./ProductCard.css";

export default function ProductCard({ product, onAddToCart }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [addedMessage, setAddedMessage] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const localStorageKey = `rating-${product.id}`;

  // 📥 Load saved rating on mount
  useEffect(() => {
    const savedRating = localStorage.getItem(localStorageKey);
    if (savedRating) setRating(Number(savedRating));
  }, [localStorageKey]);

  // ⭐ Save rating
  const handleRating = (value) => {
    setRating(value);
    localStorage.setItem(localStorageKey, value.toString());
  };

  // 🛒 Add product to cart
  const handleAddToCart = () => {
    onAddToCart(product);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  // 📖 Fetch reviews
  const handleReviewClick = async () => {
    setShowReviewPopup(true);
    setLoadingReviews(true);

    try {
      const res = await fetch(`https://fakestoreapi.com/products/${product.id}`);
      const data = await res.json();

      setReviews([
        {
          id: 1,
          user: "Verified Buyer",
          rating: data.rating?.rate || 0,
          comment: `Rated by ${data.rating?.count || 0} users.`,
        },
      ]);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleClosePopup = () => setShowReviewPopup(false);

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/placeholder.jpg";
        }}
      />

      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">₹{product.price.toFixed(2)}</p>

        {/* ⭐ Star Rating */}
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (hover || rating) ? "filled" : ""}`}
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
          <span className="numeric-rating">{rating}/5</span>
        </div>

        {addedMessage && <p className="added-message">✔ Added to cart!</p>}

        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <button className="see-review-button" onClick={handleReviewClick}>
          See Reviews
        </button>
      </div>

      {showReviewPopup && (
        <div className="popup-overlay active">
          <div className="popup active">
            <div className="popup-header">
              <h4 className="popup-title">Customer Reviews</h4>
              <button className="popup-close" onClick={handleClosePopup}>
                ×
              </button>
            </div>

            {loadingReviews ? (
              <p className="loading-text">Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p className="no-reviews">No reviews yet.</p>
            ) : (
              <div className="popup-review-scroll">
                {reviews.map((r) => (
                  <div key={r.id} className="popup-review">
                    <div className="review-header">
                      <strong>{r.user}</strong>
                      <span>
                        {"★".repeat(Math.round(r.rating))}{" "}
                        <small>({r.rating.toFixed(1)}/5)</small>
                      </span>
                    </div>
                    <p className="review-comment">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
