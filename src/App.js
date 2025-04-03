import React, { useState, useEffect } from "react";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import ColorCard from "./ColorCard";
import paletteNames from "./paletteNames";
import FullscreenPreview from "./FullscreenPreview";

function App() {
  const [userColors, setUserColors] = useState(["", "", ""]);
  const [palette, setPalette] = useState([]);
  const [showPalette, setShowPalette] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [paletteName, setPaletteName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const handleColorChange = (index, value) => {
    const updatedColors = [...userColors];
    updatedColors[index] = value;
    setUserColors(updatedColors);
  };

  const generateRandomColor = () => {
    return (
      "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
    );
  };

  const generateRandomName = () => {
    const i = Math.floor(Math.random() * paletteNames.length);
    return paletteNames[i];
  };

  const generatePalette = () => {
    const picked = userColors.filter((c) => c);
    const needed = 5 - picked.length;
    const randoms = Array.from({ length: needed }, () => generateRandomColor());
    setPalette([...picked, ...randoms]);
    setPaletteName(generateRandomName());
    setShowPalette(true);
    setIsEditingName(false);
  };

  const handleBack = () => {
    setShowPalette(false);
    setPalette([]);
    setPaletteName("");
    setIsEditingName(false);
  };

  const canGenerate = userColors.some((color) => color);

  return (
    <div className="App">
      {showFullscreen && (
        <FullscreenPreview palette={palette} onClose={() => setShowFullscreen(false)} />
      )}

      <div className="top-bar">
        <h1>🎨 Color Palette Generator</h1>
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!showPalette ? (
          <motion.div
            key="pickers"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="glass-panel"
          >
            <p
              className="gradient-text"
              style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                marginBottom: "2.5rem",
              }}
            >
              Select up to 3 base colors:
            </p>

            <div className="color-picker-container">
              {userColors.map((color, index) => (
                <div key={index} className="color-picker fancy-picker">
                  <label className="gradient-text">Color {index + 1}</label>
                  <input
                    type="color"
                    value={color || "#000000"}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <button onClick={generatePalette} disabled={!canGenerate}>
              Generate Palette
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="palette"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <div className="palette-title-container">
              {isEditingName ? (
                <input
                  className="palette-name-input"
                  value={paletteName}
                  onChange={(e) => setPaletteName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  autoFocus
                />
              ) : (
                <h2
                  className="palette-name"
                  onClick={() => setIsEditingName(true)}
                >
                  {paletteName}
                </h2>
              )}
            </div>

            <div className="palette">
              {palette.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 120,
                  }}
                >
                  <ColorCard color={color} />
                </motion.div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "2rem" }}>
              <button onClick={handleBack}>Back to Picker</button>
              <button onClick={() => setShowFullscreen(true)}>Fullscreen Preview</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
