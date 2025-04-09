import React from "react";
import "./FullscreenPreview.css";

function FullscreenPreview({ palette, onClose, clickSoundRef }) {
  const handleClose = () => {
    if (clickSoundRef?.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(() => {});
    }
    onClose();
  };

  return (
    <div className="fullscreen-overlay">
      <button className="close-btn" onClick={handleClose}>
        ← Back
      </button>
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
