import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterest } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">
          <h2>HomeStyle</h2>
          <p>
            Premium furniture crafted with elegance, built to last. Make your space speak your style.
          </p>
          <div className="footer-socials">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
              <FaPinterest />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Shop Links */}
        <div className="footer-links">
          <h4>Shop</h4>
          <ul>
            <li><a href="#living-room">Living Room</a></li>
            <li><a href="#bedroom">Bedroom</a></li>
            <li><a href="#office">Office</a></li>
            <li><a href="#outdoor">Outdoor</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="footer-links">
          <h4>Support</h4>
          <ul>
            <li><a href="#faqs">FAQs</a></li>
            <li><a href="#shipping">Shipping</a></li>
            <li><a href="#returns">Returns</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} HomeStyle Furniture. All rights reserved.
      </div>
    </footer>
  );
}
