"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      50,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // 3. Main shape
    const geometry = new THREE.CylinderGeometry(1.2, 1.2, 2.2, 6);
    const material = new THREE.MeshStandardMaterial({
      color: 0x1a2e1c,
      metalness: 0.6,
      roughness: 0.3,
    });
    const mainShape = new THREE.Mesh(geometry, material);
    scene.add(mainShape);

    // 4. Wireframe overlay
    const edges = new THREE.EdgesGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x2d9e44,
      transparent: true,
      opacity: 0.25,
    });
    const wireframe = new THREE.LineSegments(edges, wireframeMaterial);
    mainShape.add(wireframe);

    // 5. Orbiting elements
    const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x2d9e44,
      emissive: 0x2d9e44,
      emissiveIntensity: 0.8,
    });

    const orbitData = [
      { radius: 2.2, speed: 0.008, mesh: new THREE.Mesh(sphereGeo, sphereMat) },
      { radius: 2.8, speed: 0.005, mesh: new THREE.Mesh(sphereGeo, sphereMat) },
      { radius: 1.8, speed: 0.012, mesh: new THREE.Mesh(sphereGeo, sphereMat) },
    ];

    orbitData.forEach((data) => scene.add(data.mesh));

    // 6. Accent lines
    const createLine = (color: number, start: THREE.Vector3, end: THREE.Vector3) => {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([start, end]);
      const lineMat = new THREE.LineBasicMaterial({ color, opacity: 0.4, transparent: true });
      return new THREE.Line(lineGeo, lineMat);
    };

    const mainLine = createLine(0x2d9e44, new THREE.Vector3(-6, -4, -2), new THREE.Vector3(6, 4, 1));
    const blueLine = createLine(0x0077ff, new THREE.Vector3(-5, 5, -1), new THREE.Vector3(7, -3, -3));
    const pinkLine = createLine(0xff0077, new THREE.Vector3(-4, -5, -3), new THREE.Vector3(5, 5, 0));
    scene.add(mainLine, blueLine, pinkLine);

    // 7. Particles
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        let x, y, z;
        do {
            x = (Math.random() - 0.5) * 8;
            y = (Math.random() - 0.5) * 8;
            z = (Math.random() - 0.5) * 8;
        } while (x*x + y*y + z*z > 16);
        
        particlePositions[i * 3] = x;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = z;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x2d9e44,
      size: 0.015,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x2d9e44, 2, 0);
    pointLight1.position.set(-3, 2, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.5, 0);
    pointLight2.position.set(3, -2, 2);
    scene.add(pointLight2);

    // 9. Render loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time++;
      animationFrameId = requestAnimationFrame(animate);

      // Rotate main shape
      mainShape.rotation.y += 0.003;
      mainShape.rotation.x += 0.001;

      // Orbiting spheres
      orbitData.forEach((data) => {
        data.mesh.position.x = data.radius * Math.cos(time * data.speed);
        data.mesh.position.z = data.radius * Math.sin(time * data.speed);
        data.mesh.position.y = Math.sin(time * data.speed * 0.7);
      });

      // Drift particles
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += 0.003;
        if (positions[i] > 2) {
          positions[i] = -2;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      edges.dispose();
      wireframeMaterial.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      ambientLight.dispose();
      pointLight1.dispose();
      pointLight2.dispose();
      mainLine.geometry.dispose();
      (mainLine.material as THREE.Material).dispose();
      blueLine.geometry.dispose();
      (blueLine.material as THREE.Material).dispose();
      pinkLine.geometry.dispose();
      (pinkLine.material as THREE.Material).dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[400px]" />;
}
