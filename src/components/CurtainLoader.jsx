import React, { useEffect, useState } from "react";
import "./CurtainLoader.css";

const CurtainLoader = ({ children }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    // Curtains animate for 5s
    const startFade = setTimeout(() => setFadeOut(true), 5000);

    // Remove loader completely after fade (5s + 1s = 6s)
    const end = setTimeout(() => setHide(true), 6000);

    return () => {
      clearTimeout(startFade);
      clearTimeout(end);
    };
  }, []);

  return (
    <>
      {!hide && (
        <div
          className={`curtain-container ${fadeOut ? "fade-out" : ""}`}
        >
          <div className="curtain left-curtain" />
          <div className="curtain right-curtain" />
        </div>
      )}
      <div className={`app-content ${fadeOut ? "visible" : "hidden"}`}>
        {children}
      </div>
    </>
  );
};

export default CurtainLoader;
