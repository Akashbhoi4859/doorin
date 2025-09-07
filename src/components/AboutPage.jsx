import React, { useEffect, useRef, useState } from "react";
import "./AboutPage.css";

export default function AboutPage() {
  const base = import.meta.env.BASE_URL;
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // only animate once
          }
        });
      },
      { threshold: 0.2 } // triggers when 20% of section is visible
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={aboutRef}
      className={`about-container ${isVisible ? "animate" : ""}`}
    >
      <div className="about-text">
        <h2>About Us</h2>
        <p>
          At HomeStyle, we take pride in our values — craftsmanship, comfort,
          and timeless elegance.
        </p>

        <div className="about-points">
          <div className="point">
            <h3>1.</h3>
            <h4>Who We Are</h4>
            <p>
              We're passionate designers delivering handcrafted furniture for
              modern living.
            </p>
          </div>
          <div className="point">
            <h3>2.</h3>
            <h4>What We Do</h4>
            <p>
              We create sustainable, stylish, and practical furniture for every
              room.
            </p>
          </div>
          <div className="point">
            <h3>3.</h3>
            <h4>How We Help</h4>
            <p>
              From design consultation to post-delivery care, we're with you all
              the way.
            </p>
          </div>
          <div className="point">
            <h3>4.</h3>
            <h4>Our Impact</h4>
            <p>
              We've helped over 10,000 homes feel more like home — and counting!
            </p>
          </div>
        </div>

        <button className="learn-more">Learn more</button>
      </div>

      <div className="about-gallery">
        <img src={`${base}mainphoto.jpg`} alt="Gallery 1" />
        <img src={`${base}white.jpg`} alt="Gallery 2" />
        <img src={`${base}blue.jpg`} alt="Gallery 3" />
        <img src={`${base}blue2.jpg`} alt="Gallery 4" />
      </div>
    </section>
  );
}
