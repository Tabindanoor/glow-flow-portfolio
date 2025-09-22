import { useEffect, useRef } from 'react';
import * as THREE from 'three';


// this component is not included in my portfolio
export default function Globe() {
  const mountRef = useRef(null);
  
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    
    // Create globe
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    
    // Create wireframe with cyan color
    const material = new THREE.MeshBasicMaterial({
      color: 0x00FFFF, // neon cyan
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    
    // Create solid inner sphere with gradient effect
    const innerGeometry = new THREE.SphereGeometry(1.9, 32, 32);
    
    // Create shader material for gradient
    const innerMaterial = new THREE.ShaderMaterial({
      uniforms: {
        colorA: { value: new THREE.Color(0x00FFFF) }, // neon cyan
        colorB: { value: new THREE.Color(0x800080) }  // neon purple
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 colorA;
        uniform vec3 colorB;
        varying vec2 vUv;
        
        void main() {
          vec3 color = mix(colorA, colorB, vUv.y);
          gl_FragColor = vec4(color, 0.4);
        }
      `,
      transparent: true
    });
    
    const globe = new THREE.Mesh(geometry, material);
    const innerGlobe = new THREE.Mesh(innerGeometry, innerMaterial);
    
    scene.add(globe);
    scene.add(innerGlobe);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);
    
    // Position camera
    camera.position.z = 5;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate globe
      globe.rotation.y += 0.005;
      innerGlobe.rotation.y += 0.005;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);
  
  return (
    <div className="relative">
      <div ref={mountRef} className="aspect-square rounded-2xl overflow-hidden shadow-lg border border-cyan-400" />
      
      <div className="absolute -bottom-6 -right-6 bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-cyan-400">
        <p className="text-lg font-semibold">
          <span className="text-cyan-400">MERN Stack</span> Developer
        </p>
      </div>
    </div>
  );
}