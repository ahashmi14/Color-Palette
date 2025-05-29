import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import CarModel from "./CarModel";
import { blendColors, getMosaicColors } from "./colorUtils";
import "./CarPreview.css";

function CarPreview({ palette, onClose, clickSoundRef, paletteName }) {
  const [selectedColors, setSelectedColors] = useState([]);
  const [weights, setWeights] = useState([]);
  const [mode, setMode] = useState("standard");
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (selectedColors.length === 1) {
      setWeights([1]);
    } else if (selectedColors.length > 1) {
      const equalWeight = 1 / selectedColors.length;
      setWeights(Array(selectedColors.length).fill(equalWeight));
    }
  }, [selectedColors]);

  const handleBack = () => {
    if (clickSoundRef?.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(() => {});
    }
    onClose();
  };

  const toggleColor = (color) => {
    const idx = selectedColors.indexOf(color);
    if (idx !== -1) {
      const updated = [...selectedColors];
      updated.splice(idx, 1);
      setSelectedColors(updated);
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const resetSliders = () => {
    if (selectedColors.length > 1) {
      const equalWeight = 1 / selectedColors.length;
      setWeights(Array(selectedColors.length).fill(equalWeight));
    }
  };

  const handleSliderChange = (index, newWeight) => {
    const updated = [...weights];
    updated[index] = newWeight;

    const total = updated.reduce((sum, w) => sum + w, 0);
    if (total === 0) return;

    const normalized = updated.map((w) => w / total);
    setWeights(normalized);
  };

  const carColor =
    mode === "standard"
      ? blendColors(selectedColors, weights)
      : blendColors(palette);

  const mosaicColors = mode === "mosaic" ? getMosaicColors(selectedColors) : null;

  return (
    <div className="car-preview-overlay">
      <button className="car-close-btn" onClick={handleBack}>
        ← Back
      </button>

      {paletteName && <div className="car-palette-name">{paletteName}</div>}

      <div className="car-mode-switch">
        <button
          className={mode === "standard" ? "active" : ""}
          onClick={() => setMode("standard")}
        >
          Standard
        </button>
        <button
          className={mode === "mosaic" ? "active" : ""}
          onClick={() => setMode("mosaic")}
        >
          Mosaic
        </button>
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

      <div className="rotation-toggle">
        <span className="rotation-label">Rotation</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={autoRotate}
            onChange={() => setAutoRotate((prev) => !prev)}
          />
          <span className="slider"></span>
        </label>
      </div>

      {mode === "standard" && selectedColors.length > 1 && (
        <div className="slider-panel glow">
          <div className="slider-row">
            {selectedColors.map((color, idx) => (
              <div key={idx} className="slider-group">
                <label
                  style={{
                    color: color,
                    fontSize: "1.7rem",
                    fontWeight: "bold",
                    fontFamily: "monospace",
                  }}
                >
                  {color} {Math.round(weights[idx] * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={weights[idx] || 0}
                  onChange={(e) =>
                    handleSliderChange(idx, parseFloat(e.target.value))
                  }
                />
              </div>
            ))}
          </div>

          <div className="slider-actions">
            <button className="reset-btn" onClick={resetSliders}>
              Reset Sliders
            </button>
          </div>
        </div>
      )}

      <Canvas camera={{ position: [0, 1.2, 9.6], fov: 45 }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 10, 5]} intensity={1.4} castShadow />
        <Environment files="/hdr/bloem_field_sunrise_4k.hdr" background={false} />
        <CarModel color={carColor} mosaicColors={mosaicColors} />
        <OrbitControls enableZoom autoRotate={autoRotate} />
      </Canvas>
    </div>
  );
}

export default CarPreview;
