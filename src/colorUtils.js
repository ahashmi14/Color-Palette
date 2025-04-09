// colorUtils.js

// 🎨 Blends multiple hex colors with optional weights
export function blendColors(colors, weights = []) {
    if (colors.length === 0) return "#000000";
  
    const defaultWeight = 1 / colors.length;
    const normalizedWeights =
      weights.length === colors.length
        ? weights
        : Array(colors.length).fill(defaultWeight);
  
    let totalR = 0,
      totalG = 0,
      totalB = 0;
  
    colors.forEach((hex, i) => {
      const value = parseInt(hex.slice(1), 16);
      const r = (value >> 16) & 255;
      const g = (value >> 8) & 255;
      const b = value & 255;
  
      totalR += r * normalizedWeights[i];
      totalG += g * normalizedWeights[i];
      totalB += b * normalizedWeights[i];
    });
  
    const toHex = (val) =>
      Math.round(val).toString(16).padStart(2, "0");
  
    return (
      "#" +
      toHex(totalR) +
      toHex(totalG) +
      toHex(totalB)
    );
  }
  
  // 🧩 Splits color list for mosaic styling (returns as-is)
  export function getMosaicColors(colors) {
    return colors;
  }