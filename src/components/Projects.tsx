
import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { staggerFadeIn } from '@/lib/animations';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const ProjectCard3D = ({ project, isHovered }: { project: Project; isHovered: boolean }) => {
  const texture = useTexture("/placeholder.svg");
  const mesh = useRef<THREE.Mesh>(null!);
  
  useEffect(() => {
    if (!mesh.current) return;
    
    const targetRotationY = isHovered ? Math.PI * 0.02 : 0;
    const targetRotationX = isHovered ? -Math.PI * 0.02 : 0;
    
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetRotationY, 0.1);
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, targetRotationX, 0.1);
    
    const targetScale = isHovered ? 1.05 : 1;
    mesh.current.scale.set(targetScale, targetScale, targetScale);
  }, [isHovered]);
  
  return (
    <mesh ref={mesh} position={[0, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[3, 2, 0.1]} />
      <meshStandardMaterial 
        map={texture}
        metalness={0.5}
        roughness={0.3}
        color={isHovered ? "#9B5DE5" : "#6930C3"} 
      />
    </mesh>
  );
};

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "3D Portfolio Website",
      description: "Interactive portfolio with Three.js animations and immersive 3D elements",
      image: "/placeholder.svg",
      tags: ["Three.js", "React", "GSAP"],
      link: "#"
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "Fully responsive e-commerce site with 3D product visualization",
      image: "/placeholder.svg",
      tags: ["Next.js", "Three.js", "Stripe"],
      link: "#"
    },
    {
      id: 3,
      title: "3D Data Visualization",
      description: "Interactive dashboard with 3D charts and real-time data visualization",
      image: "/placeholder.svg",
      tags: ["D3.js", "Three.js", "WebGL"],
      link: "#"
    },
    {
      id: 4,
      title: "WebGL Game",
      description: "Browser-based 3D game with physics and interactive elements",
      image: "/placeholder.svg",
      tags: ["WebGL", "Cannon.js", "React"],
      link: "#"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (headingRef.current) headingRef.current.classList.add('animate-fadeIn');
          
          if (projectsRef.current) {
            const projectElements = Array.from(projectsRef.current.children);
            staggerFadeIn(projectElements, 0.15);
          }
          
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 min-h-screen flex items-center bg-gradient-to-b from-dark/95 to-dark"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={headingRef} className="section-heading text-center">
          My <span className="text-neon-cyan">Projects</span>
        </h2>
        
        <p className="section-subheading text-center opacity-0 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          Explore my recent work showcasing creative solutions and technical skills
        </p>
        
        <div 
          ref={projectsRef} 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10"
        >
          {projects.map((project) => (
            <div 
              key={project.id}
              className="neon-card overflow-hidden opacity-0"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="h-64 relative">
                <Canvas shadows dpr={[1, 2]}>
                  <ambientLight intensity={0.5} />
                  <spotLight 
                    position={[10, 10, 10]} 
                    angle={0.15} 
                    penumbra={1} 
                    intensity={1} 
                    castShadow 
                  />
                  <ProjectCard3D 
                    project={project} 
                    isHovered={hoveredProject === project.id} 
                  />
                  <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={40} />
                </Canvas>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold font-space mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-neon-purple/10 text-neon-purple text-xs font-medium px-2.5 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={project.link} 
                  className="inline-flex items-center text-neon-cyan hover:text-neon-purple transition-colors"
                >
                  View Project
                  <svg 
                    className="w-4 h-4 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
