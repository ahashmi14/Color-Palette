import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import CarModel from "./CarModel";
import { blendColors, getMosaicColors } from "./colorUtils";
import "./CarPreview.css";

function CarPreview({ palette, onClose, clickSoundRef, paletteName }) {
  const [mode, setMode] = useState("standard"); // 'standard' | 'mosaic'
  const [selectedColors, setSelectedColors] = useState([]);
  const [weights, setWeights] = useState([]);

  const handleBack = () => {
    if (clickSoundRef?.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(() => {});
    }
    onClose();
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleWeightChange = (index, value) => {
    const newWeights = [...weights];
    newWeights[index] = parseFloat(value);
    const total = newWeights.reduce((a, b) => a + b, 0) || 1;
    setWeights(newWeights.map((w) => w / total));
  };

  let colorToRender = "#000000";
  let mosaicColors = [];

  if (mode === "standard") {
    if (selectedColors.length === 0) {
      colorToRender = blendColors(palette);
    } else {
      colorToRender = blendColors(selectedColors, weights);
    }
  } else if (mode === "mosaic") {
    mosaicColors = selectedColors.length ? selectedColors : palette;
  }

  return (
    <div className="car-preview-overlay">
      <button className="car-close-btn" onClick={handleBack}>← Back</button>

      {paletteName && <div className="car-palette-name">{paletteName}</div>}

      <div className="car-mode-buttons">
        <button className={mode === "standard" ? "active" : ""} onClick={() => setMode("standard")}>Standard</button>
        <button className={mode === "mosaic" ? "active" : ""} onClick={() => setMode("mosaic")}>Mosaic</button>
      </div>

      <div className="car-color-options">
        {palette.map((color, idx) => (
          <div
            key={idx}
            className={`car-swatch ${selectedColors.includes(color) ? "active" : ""}`}
            style={{ background: color }}
            onClick={() => toggleColor(color)}
            title={`Color ${idx + 1}`}
          />
        ))}
      </div>

      {mode === "standard" && selectedColors.length > 1 && (
        <div className="slider-container">
          {selectedColors.map((color, idx) => (
            <div key={idx} className="slider-item">
              <label style={{ color }}>{color}</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={weights[idx] || 1 / selectedColors.length}
                onChange={(e) => handleWeightChange(idx, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      <Canvas camera={{ position: [0, 1.2, 9.6], fov: 45 }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 10, 5]} intensity={1.4} castShadow />
        <Environment preset="city" background={false} />
        <CarModel
          color={mode === "mosaic" ? null : colorToRender}
          mosaicColors={mode === "mosaic" ? mosaicColors : []}
        />
        <OrbitControls enableZoom autoRotate />
      </Canvas>
    </div>
  );
}

export default CarPreview;
