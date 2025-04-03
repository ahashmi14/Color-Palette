import React from "react";

function ColorCard({ color }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);
  };

  return (
    <div className="color-card" style={{ backgroundColor: color }}>
      <p className="color-code">{color}</p>
      <button onClick={copyToClipboard}>Copy</button>
    </div>
  );
}

export default ColorCard;

