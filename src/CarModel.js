import React, { useEffect } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

function CarModel({ color, mosaicColors }) {
  const { scene } = useGLTF("/models/car_render.glb", true);

  useEffect(() => {
    let colorIndex = 0;
    const meshNames = [];

    scene.traverse((child) => {
      if (child.isMesh && child.material && child.material.color) {
        meshNames.push(child.name);
        const appliedColor = mosaicColors?.length
          ? new THREE.Color(mosaicColors[colorIndex % mosaicColors.length])
          : new THREE.Color(color);
        child.material.color.set(appliedColor);
        colorIndex++;
      }
    });

    console.log("Applied to meshes:", meshNames);
  }, [scene, color, mosaicColors]);

  return <primitive object={scene} scale={1.5} />;
}

export default CarModel;
