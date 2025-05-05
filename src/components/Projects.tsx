// Projects.tsx

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';
// import { stagger } from '@/lib/animations';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import alexPage from "/Screenshot 2024-07-25 231437.png"
import alex from "/alex.png"
import learning from "/alex.png"
import patanhi from "/alex.png"
import hera from "/alex.png"

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  sourceUrl: string;
}

const ProjectCard3D = ({ project, isHovered }: { project: Project; isHovered: boolean }) => {
  const texture = useTexture(project.image || "/placeholder.svg");
  const mesh = useRef<THREE.Mesh>(null!);

  const animate = () => {
    if (!mesh.current) return;
    const targetRotationY = isHovered ? Math.PI * 0.05 : 0;
    const targetRotationX = isHovered ? -Math.PI * 0.03 : 0;

    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetRotationY, 0.05);
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, targetRotationX, 0.05);

    const targetScale = isHovered ? 1.08 : 1;
    const currentScale = mesh.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
    mesh.current.scale.set(newScale, newScale, newScale);

    requestAnimationFrame(animate);
  };

  useState(() => {
    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[3.5, 2, 0.1]} />
      <meshStandardMaterial
        map={texture}
        metalness={0.2}
        roughness={0.5}
        color="#ffffff"
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
      description: "Interactive portfolio with Three.js animations and immersive 3D elements for a stunning visual experience.",
      image: alex,
      tags: ["Three.js", "React", "GSAP"],
      liveUrl: "#",
      sourceUrl: "#"
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "Fully responsive e-commerce site with 3D product visualization and seamless checkout experience.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      tags: ["Next.js", "Three.js", "Stripe"],
      liveUrl: "#",
      sourceUrl: "#"
    },
    {
      id: 3,
      title: "3D Data Visualization",
      description: "Interactive dashboard with 3D charts and real-time data visualization for complex analytics.",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
      tags: ["D3.js", "Three.js", "WebGL"],
      liveUrl: "#",
      sourceUrl: "#"
    },
    {
      id: 4,
      title: "WebGL Game",
      description: "Browser-based 3D game with physics and interactive elements for an engaging user experience.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      tags: ["WebGL", "Cannon.js", "React"],
      liveUrl: "#",
      sourceUrl: "#"
    }
  ];

  useIntersectionObserver({
    target: sectionRef,
    onIntersect: () => {
      if (headingRef.current) headingRef.current.classList.add('animate-');
      if (projectsRef.current) {
        const projectElements = Array.from(projectsRef.current.children);
        // stagger(projectElements, 0.15);
      }
    },
    threshold: 0.2
  });

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 min-h-screen flex items-center bg-gradient-to-b from-dark/95 to-dark relative overflow-hidden"
    >
      <div className="absolute top-40 -left-32 w-80 h-80 rounded-full bg-neon-purple/10 blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-40 -right-32 w-80 h-80 rounded-full bg-neon-cyan/10 blur-[100px] animate-pulse-glow" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 ref={headingRef} className="section-heading text-center">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subheading text-center opacity-1 animate-" style={{ animationDelay: '0.3s' }}>
            Explore my recent work showcasing creative solutions and technical skills
          </p>
        </motion.div>

        <div
          ref={projectsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="neon-card overflow-hidden opacity-1 group rounded-xl"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-64 relative">
                <Canvas shadows dpr={[1, 2]}>
                  <ambientLight intensity={0.6} />
                  <spotLight 
                    position={[10, 10, 10]} 
                    angle={0.15} 
                    penumbra={1} 
                    intensity={1.5} 
                    castShadow 
                  />
                  <spotLight 
                    position={[-10, -10, -10]} 
                    angle={0.15} 
                    penumbra={1} 
                    intensity={0.5} 
                    color="#00F5FF"
                  />
                  <ProjectCard3D 
                    project={project} 
                    isHovered={hoveredProject === project.id} 
                  />
                  <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={40} />
                  <Environment preset="city" />
                </Canvas>
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-dark/80 to-transparent" />
              </div>

              <div className="p-8 relative">
                <h3 className="text-2xl font-bold font-space mb-3 text-white group-hover:text-neon-cyan transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline"
                      className="bg-neon-purple/10 text-neon-cyan border-neon-purple/20 hover:bg-neon-purple/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4 items-center">
                  <Button 
                    variant="default"
                    size="sm"
                    className="bg-neon-purple hover:bg-neon-purple/90 text-white font-medium"
                    asChild
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      Live Demo <ExternalLink className="ml-1 w-4 h-4" />
                    </a>
                  </Button>

                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10"
                    asChild
                  >
                    <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      Source <Github className="ml-1 w-4 h-4" />
                    </a>
                  </Button>
                </div>

                <motion.div 
                  className="h-0.5 w-0 bg-gradient-to-r from-neon-purple to-neon-cyan mt-6 group-hover:w-full transition-all duration-700"
                  initial={{ width: 0 }}
                  whileInView={{ width: "30%" }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary"
          >
            View All Projects
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Projects;



























// import { useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { Canvas } from '@react-three/fiber';
// import { PerspectiveCamera, useTexture, Environment } from '@react-three/drei';
// import * as THREE from 'three';
// import { stagger } from '@/lib/animations';
// import { ExternalLink, Github } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import useIntersectionObserver from '@/hooks/useIntersectionObserver';

// interface Project {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   tags: string[];
//   liveUrl: string;
//   sourceUrl: string;
// }

// const ProjectCard3D = ({ project, isHovered }: { project: Project; isHovered: boolean }) => {
//   const texture = useTexture(project.image || "/placeholder.svg");
//   const mesh = useRef<THREE.Mesh>(null!);
  
//   // Animation effect for 3D card
//   const animate = () => {
//     if (!mesh.current) return;
    
//     const targetRotationY = isHovered ? Math.PI * 0.05 : 0;
//     const targetRotationX = isHovered ? -Math.PI * 0.03 : 0;
    
//     mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetRotationY, 0.05);
//     mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, targetRotationX, 0.05);
    
//     const targetScale = isHovered ? 1.08 : 1;
//     const currentScale = mesh.current.scale.x;
//     const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
//     mesh.current.scale.set(newScale, newScale, newScale);
    
//     requestAnimationFrame(animate);
//   };
  
//   // Start animation loop
//   useState(() => {
//     const animationFrame = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(animationFrame);
//   });
  
//   return (
//     <mesh ref={mesh} position={[0, 0, 0]} castShadow receiveShadow>
//       <boxGeometry args={[3.5, 2, 0.1]} />
//       <meshStandardMaterial
//         map={texture}
//         metalness={0.2}
//         roughness={0.5}
//         color="#ffffff"
//       />
//     </mesh>
//   );
// };

// const Projects = () => {
//   const [hoveredProject, setHoveredProject] = useState<number | null>(null);
//   const sectionRef = useRef<HTMLElement>(null);
//   const headingRef = useRef<HTMLHeadingElement>(null);
//   const projectsRef = useRef<HTMLDivElement>(null);

//   // Sample project data
//   const projects: Project[] = [
//     {
//       id: 1,
//       title: "3D Portfolio Website",
//       description: "Interactive portfolio with Three.js animations and immersive 3D elements for a stunning visual experience.",
//       image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
//       tags: ["Three.js", "React", "GSAP"],
//       liveUrl: "#",
//       sourceUrl: "#"
//     },
//     {
//       id: 2,
//       title: "E-commerce Platform",
//       description: "Fully responsive e-commerce site with 3D product visualization and seamless checkout experience.",
//       image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
//       tags: ["Next.js", "Three.js", "Stripe"],
//       liveUrl: "#",
//       sourceUrl: "#"
//     },
//     {
//       id: 3,
//       title: "3D Data Visualization",
//       description: "Interactive dashboard with 3D charts and real-time data visualization for complex analytics.",
//       image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
//       tags: ["D3.js", "Three.js", "WebGL"],
//       liveUrl: "#",
//       sourceUrl: "#"
//     },
//     {
//       id: 4,
//       title: "WebGL Game",
//       description: "Browser-based 3D game with physics and interactive elements for an engaging user experience.",
//       image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
//       tags: ["WebGL", "Cannon.js", "React"],
//       liveUrl: "#",
//       sourceUrl: "#"
//     }
//   ];

//   // Animation when section comes into view
//   useIntersectionObserver({
//     target: sectionRef,
//     onIntersect: () => {
//       if (headingRef.current) headingRef.current.classList.add('animate-');
      
//       if (projectsRef.current) {
//         const projectElements = Array.from(projectsRef.current.children);
//         stagger(projectElements, 0.15);
//       }
//     },
//     threshold: 0.2
//   });

//   return (
//     <section 
//       id="projects" 
//       ref={sectionRef}
//       className="py-20 min-h-screen flex items-center bg-gradient-to-b from-dark/95 to-dark relative overflow-hidden"
//     >
//       {/* Decorative glowing orbs */}
//       <div className="absolute top-40 -left-32 w-80 h-80 rounded-full bg-neon-purple/10 blur-[100px] animate-pulse-glow" />
//       <div className="absolute bottom-40 -right-32 w-80 h-80 rounded-full bg-neon-cyan/10 blur-[100px] animate-pulse-glow" />
      
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center"
//         >
//           <h2 ref={headingRef} className="section-heading text-center">
//             My <span className="text-gradient">Projects</span>
//           </h2>
          
//           <p className="section-subheading text-center opacity-0 animate-" style={{ animationDelay: '0.3s' }}>
//             Explore my recent work showcasing creative solutions and technical skills
//           </p>
//         </motion.div>
        
//         <div 
//           ref={projectsRef} 
//           className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16"
//         >
//           {projects.map((project) => (
//             <motion.div
//               key={project.id}
//               className="neon-card overflow-hidden opacity-0 group rounded-xl"
//               onMouseEnter={() => setHoveredProject(project.id)}
//               onMouseLeave={() => setHoveredProject(null)}
//               whileHover={{ y: -10 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="h-64 relative">
//                 <Canvas shadows dpr={[1, 2]}>
//                   <ambientLight intensity={0.6} />
//                   <spotLight 
//                     position={[10, 10, 10]} 
//                     angle={0.15} 
//                     penumbra={1} 
//                     intensity={1.5} 
//                     castShadow 
//                   />
//                   <spotLight 
//                     position={[-10, -10, -10]} 
//                     angle={0.15} 
//                     penumbra={1} 
//                     intensity={0.5} 
//                     color="#00F5FF"
//                   />
//                   <ProjectCard3D 
//                     project={project} 
//                     isHovered={hoveredProject === project.id} 
//                   />
//                   <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={40} />
//                   <Environment preset="city" />
//                 </Canvas>
                
//                 {/* Gradient overlay for better text readability */}
//                 <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-dark/80 to-transparent" />
//               </div>
              
//               <div className="p-8 relative">
//                 <h3 className="text-2xl font-bold font-space mb-3 text-white group-hover:text-neon-cyan transition-colors">
//                   {project.title}
//                 </h3>
                
//                 <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                
//                 <div className="flex flex-wrap gap-2 mb-6">
//                   {project.tags.map((tag) => (
//                     <Badge 
//                       key={tag} 
//                       variant="outline"
//                       className="bg-neon-purple/10 text-neon-cyan border-neon-purple/20 hover:bg-neon-purple/20"
//                     >
//                       {tag}
//                     </Badge>
//                   ))}
//                 </div>
                
//                 <div className="flex gap-4 items-center">
//                   <Button 
//                     variant="default"
//                     size="sm"
//                     className="bg-neon-purple hover:bg-neon-purple/90 text-white font-medium"
//                     asChild
//                   >
//                     <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
//                       Live Demo <ExternalLink className="ml-1 w-4 h-4" />
//                     </a>
//                   </Button>
                  
//                   <Button 
//                     variant="outline"
//                     size="sm"
//                     className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10"
//                     asChild
//                   >
//                     <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
//                       Source <Github className="ml-1 w-4 h-4" />
//                     </a>
//                   </Button>
//                 </div>
                
//                 {/* Decorative line */}
//                 <motion.div 
//                   className="h-0.5 w-0 bg-gradient-to-r from-neon-purple to-neon-cyan mt-6 group-hover:w-full transition-all duration-700"
//                   initial={{ width: 0 }}
//                   whileInView={{ width: "30%" }}
//                   viewport={{ once: true }}
//                 />
//               </div>
//             </motion.div>
//           ))}
//         </div>
        
//         {/* View all projects button */}
//         <div className="flex justify-center mt-12">
//           <motion.a
//             href="#"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.98 }}
//             className="btn-primary"
//           >
//             View All Projects
//           </motion.a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Projects;



































// import React, { useState, useRef, useEffect } from 'react';
// import ProjectCard from './ProjectCard';

// export interface Project {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   tags: string[];
//   liveUrl: string;
//   sourceUrl: string;
//   featured?: boolean;
// }

// const Projects: React.FC = () => {
//   const [activeFilter, setActiveFilter] = useState('All');
//   const projectsRef = useRef<HTMLDivElement>(null);

//   // Sample project data
//   const projects: Project[] = [
//     {
//       id: 1,
//       title: "Portfolio Website",
//       description: "Modern portfolio website with sleek animations and responsive design showcasing developer projects and skills.",
//       image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg",
//       tags: ["React", "Tailwind CSS", "Framer Motion"],
//       liveUrl: "#",
//       sourceUrl: "#",
//       featured: true
//     },
//     {
//       id: 2,
//       title: "E-commerce Platform",
//       description: "Fully responsive e-commerce site with product catalog, shopping cart, and secure checkout functionality.",
//       image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
//       tags: ["Next.js", "Redux", "Stripe"],
//       liveUrl: "#",
//       sourceUrl: "#"
//     },
//     {
//       id: 3,
//       title: "Analytics Dashboard",
//       description: "Interactive dashboard with data visualization charts and real-time analytics for business intelligence.",
//       image: "https://images.pexels.com/photos/7654586/pexels-photo-7654586.jpeg",
//       tags: ["React", "D3.js", "Material UI"],
//       liveUrl: "#",
//       sourceUrl: "#"
//     },
//     {
//       id: 4,
//       title: "Task Management App",
//       description: "Productivity application for managing tasks, projects and collaboration with team members.",
//       image: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg",
//       tags: ["React", "Firebase", "Tailwind CSS"],
//       liveUrl: "#",
//       sourceUrl: "#"
//     }
//   ];

//   const allTags = ['All', ...Array.from(new Set(projects.flatMap(project => project.tags)))];

//   const filteredProjects = activeFilter === 'All' 
//     ? projects 
//     : projects.filter(project => project.tags.includes(activeFilter));

//   return (
//     <section 
//       id="projects" 
//       className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden scroll-mt-24"
//       ref={projectsRef}
//     >
//       {/* Decorative Elements */}
//       <div className="absolute top-0 left-0 w-full h-60 bg-blue-500/5 blur-3xl rounded-full transform -translate-y-1/2" />
//       <div className="absolute bottom-0 right-0 w-full h-60 bg-purple-500/5 blur-3xl rounded-full transform translate-y-1/2" />

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Section Title */}
//         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Projects</h2>

//         {/* Projects Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//           {filteredProjects.map((project, index) => (
//             <ProjectCard key={project.id} project={project} index={index} />
//           ))}
//         </div>

//         {filteredProjects.length === 0 && (
//           <div className="text-center py-16">
//             <p className="text-gray-400 text-lg">No projects found with this filter.</p>
//           </div>
//         )}

//         {/* View All Projects Button */}
//         <div className="flex justify-center mt-12">
//           <a
//             href="#all-projects"
//             className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-300 inline-flex items-center gap-2"
//           >
//             View All Projects
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Projects;
