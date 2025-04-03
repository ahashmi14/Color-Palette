import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import "./CarPreview.css";

function CarModel() {
  const { scene } = useGLTF("/models/car_render.glb", true);
  return <primitive object={scene} scale={1.5} />;
}

function CarPreview({ palette, onClose }) {
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

  const avgColor = getBlendedColor(palette);

  return (
    <div className="car-preview-overlay">
      <button className="car-close-btn" onClick={onClose}>
        ← Back
      </button>
      <Canvas camera={{ position: [0, 1.2, 8], fov: 45 }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 10, 5]} intensity={1.4} castShadow />
        <Environment preset="city" background={false} />
        <CarModel color={avgColor} />
        <OrbitControls enableZoom autoRotate />
      </Canvas>
    </div>
  );
}

export default CarPreview;
