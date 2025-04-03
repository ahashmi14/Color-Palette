import React from "react";
import "./FullscreenPreview.css";

function FullscreenPreview({ palette, onClose }) {
  return (
    <div className="fullscreen-overlay">
      <button className="close-btn" onClick={onClose}>← Back</button>
      <div className="fullscreen-palette">
        {palette.map((color, index) => (
          <div
            key={index}
            className="fullscreen-color"
            style={{ backgroundColor: color }}
          >
            <span className="fullscreen-hex">{color}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FullscreenPreview;
