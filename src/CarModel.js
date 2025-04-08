import React from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

function CarModel({ color }) {
  const { scene } = useGLTF("/models/car_render.glb", true);

  scene.traverse((child) => {
    if (child.isMesh) {
      // ONLY apply color to meshes that are car body related
      const name = child.name.toLowerCase();
      if (name.includes("body") || name.includes("chassis") || name.includes("paint")) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          metalness: 0.6,
          roughness: 0.3,
        });
      }
    }
  });

  return <primitive object={scene} scale={1.5} />;
}

export default CarModel;
