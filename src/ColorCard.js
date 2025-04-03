import React from "react";
import "./ColorCard.css";

function ColorCard({ color }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(color);
  };

  return (
    <div className="color-card">
      <div className="color-display" style={{ backgroundColor: color }} />
      <p className="color-code">{color}</p>
      <button className="copy-btn" onClick={handleCopy}>
        Copy
      </button>
    </div>
  );
}

export default ColorCard;
