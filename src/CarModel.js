import React, { useEffect } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

function CarModel({ color }) {
  const { scene } = useGLTF("/models/car_render.glb", true);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        console.log("MESH NAME:", child.name);

        // Try applying color only if possible
        if (child.material && child.material.color) {
          console.log("→ Found colorable mesh:", child.name);
          child.material.color.set(new THREE.Color(color));
        }
      }
    });
  }, [scene, color]);

  return <primitive object={scene} scale={1.5} />;
}

export default CarModel;
