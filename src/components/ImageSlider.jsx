import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css";

export default function ImageSlider() {
  const base = import.meta.env.BASE_URL;

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
  };

  const slides = [
    "slide4.jpg",
    "slide2.jpg",
    "slide3.jpg",
    "slide1.jpg",
    "slide5.jpg",
  ];

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((file, idx) => (
          <div key={idx}>
            <img
              src={`${base}${file}`}
              alt={`Slide ${idx + 1}`}
              className="slider-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
