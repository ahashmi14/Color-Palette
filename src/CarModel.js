import React, { useEffect } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

function CarModel({ color, mosaicColors }) {
  const { scene } = useGLTF("/models/car_render.glb", true);

  useEffect(() => {
    let index = 0;

    scene.traverse((child) => {
      if (child.isMesh && child.material && child.material.color) {
        const appliedColor = mosaicColors?.length
          ? new THREE.Color(mosaicColors[index % mosaicColors.length])
          : new THREE.Color(color);
        child.material.color.set(appliedColor);
        index++;
      }
    });
  }, [scene, color, mosaicColors]);

  return <primitive object={scene} scale={1.5} />;
}

export default CarModel;
