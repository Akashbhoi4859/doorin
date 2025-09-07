import React, { useEffect, useState } from "react";
import "./Shutter.css";

// ✅ Image (place `akash.jpg` inside the `public/` folder)
import shutterImg from "/akash.jpg";

export default function Shutter() {
  const [fadeOut, setFadeOut] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    // Step 1: wait for slideUp (5.6s)
    const startFade = setTimeout(() => setFadeOut(true), 5600);

    // Step 2: fade-out (extra 2.5s, total 8.1s)
    const endAnimation = setTimeout(() => setHide(true), 8100);

    return () => {
      clearTimeout(startFade);
      clearTimeout(endAnimation);
    };
  }, []);

  if (hide) return null;

  return (
    <div className={`shutter-image-wrapper ${fadeOut ? "fade-out" : ""}`}>
      <img src={shutterImg} alt="Shutter" className="shutter-image" />
    </div>
  );
}
