import React, { useState } from "react";
import "./ColorCard.css";

function ColorCard({ color, clickSoundRef }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    if (clickSoundRef?.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(() => {});
    }
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="color-card">
      <div className="color-display" style={{ backgroundColor: color }} />
      <p className="color-code">{color}</p>
      {copied ? (
        <div className="copied-msg">Copied!</div>
      ) : (
        <button className="copy-btn" onClick={handleCopy}>
          Copy
        </button>
      )}
    </div>
  );
}

export default ColorCard;
