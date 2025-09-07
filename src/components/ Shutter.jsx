// src/components/Shutter.jsx
import React, { useEffect, useState } from "react";
import "./Shutter.css";

export default function Shutter() {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    animate && (
      <div className="shutter-wrapper">
        <div className="shutter left-shutter" />
        <div className="shutter right-shutter" />
      </div>
    )
  );
}
