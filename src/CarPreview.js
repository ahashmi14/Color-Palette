import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import CarModel from "./CarModel";
import "./CarPreview.css";

function CarPreview({ palette, onClose, clickSoundRef }) {
  const getBlendedColor = (colors) => {
    const rgbList = colors.map((hex) => {
      const val = parseInt(hex.slice(1), 16);
      return {
        r: (val >> 16) & 255,
        g: (val >> 8) & 255,
        b: val & 255,
      };
    });

    const avg = rgbList.reduce(
      (acc, cur) => ({
        r: acc.r + cur.r / rgbList.length,
        g: acc.g + cur.g / rgbList.length,
        b: acc.b + cur.b / rgbList.length,
      }),
      { r: 0, g: 0, b: 0 }
    );

    return `rgb(${Math.round(avg.r)}, ${Math.round(avg.g)}, ${Math.round(avg.b)})`;
  };

  const blendedColor = getBlendedColor(palette);
  const [selectedColor, setSelectedColor] = useState(blendedColor);

  const handleBack = () => {
    if (clickSoundRef?.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(() => {});
    }
    onClose();
  };

  return (
    <div className="car-preview-overlay">
      <button className="car-close-btn" onClick={handleBack}>
        ← Back
      </button>

      <div className="car-color-options">
        <div
          className={`car-swatch ${selectedColor === blendedColor ? "active" : ""}`}
          style={{ background: blendedColor }}
          onClick={() => setSelectedColor(blendedColor)}
          title="Blended Color"
        >
          <span className="swatch-label">Mix</span>
        </div>
        {palette.map((color, idx) => (
          <div
            key={idx}
            className={`car-swatch ${selectedColor === color ? "active" : ""}`}
            style={{ background: color }}
            onClick={() => setSelectedColor(color)}
            title={`Color ${idx + 1}`}
          />
        ))}
      </div>

      <Canvas camera={{ position: [0, 1.2, 9.6], fov: 45 }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 10, 5]} intensity={1.4} castShadow />
        <Environment preset="city" background={false} />
        <CarModel color={selectedColor} />
        <OrbitControls enableZoom autoRotate />
      </Canvas>
    </div>
  );
}

export default CarPreview;
