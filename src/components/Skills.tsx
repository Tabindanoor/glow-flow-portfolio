
import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useInView } from 'framer-motion';

interface Skill {
  name: string;
  icon: string;
  color: string;
}

interface SkillSphereProps {
  skills: Skill[];
  hoveredSkill: string | null;
  onHover: (skill: string | null) => void;
}

const SkillSphere = ({ skills, hoveredSkill, onHover }: SkillSphereProps) => {
  const groupRef = useRef<THREE.Group>(null!);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  const points = useMemo(() => {
    const pts = [];
    const sphereRadius = 2.5;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    
    for (let i = 0; i < skills.length; i++) {
      const y = 1 - (i / (skills.length - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      
      const theta = phi * i; // Golden angle increment
      
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      pts.push(new THREE.Vector3(x * sphereRadius, y * sphereRadius, z * sphereRadius));
    }
    
    return pts;
  }, [skills]);

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <mesh 
          key={skill.name}
          position={points[i]}
          onPointerOver={() => onHover(skill.name)}
          onPointerOut={() => onHover(null)}
        >
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial 
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={hoveredSkill === skill.name ? 0.8 : 0.3}
            metalness={0.7}
            roughness={0.2}
          />
          <Text
            position={[0, 0, 0.5]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {skill.name}
          </Text>
        </mesh>
      ))}
    </group>
  );
};

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const skills: Skill[] = [
    { name: "React", icon: "🔵", color: "#61DAFB" },
    { name: "Three.js", icon: "🎮", color: "#049EF4" },
    { name: "TypeScript", icon: "🔷", color: "#3178C6" },
    { name: "GSAP", icon: "🟢", color: "#88CE02" },
    { name: "WebGL", icon: "🎨", color: "#990000" },
    { name: "Node.js", icon: "🟩", color: "#539E43" },
    { name: "CSS/SCSS", icon: "🎨", color: "#CC6699" },
    { name: "HTML", icon: "📄", color: "#E34F26" },
    { name: "JavaScript", icon: "🟨", color: "#F7DF1E" },
    { name: "Git", icon: "🔄", color: "#F05032" },
    { name: "Blender", icon: "🎭", color: "#E87D0D" },
    { name: "Figma", icon: "🎨", color: "#F24E1E" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 min-h-screen flex items-center bg-gradient-to-b from-dark to-dark/95"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="section-heading text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          My <span className="text-neon-cyan">Skills</span>
        </motion.h2>
        
        <div className="mt-16 flex flex-col lg:flex-row items-center gap-10">
          <motion.div 
            className="w-full lg:w-1/2 h-[400px] lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
          >
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <SkillSphere 
                skills={skills} 
                hoveredSkill={hoveredSkill}
                onHover={setHoveredSkill}
              />
            </Canvas>
          </motion.div>
          
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.h3 
              className="text-2xl font-space font-bold"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7 }}
            >
              Technical Expertise
            </motion.h3>
            
            <motion.p 
              className="text-gray-300 text-lg"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              With a strong foundation in both frontend and 3D web technologies, I specialize in creating immersive digital experiences that push the boundaries of what's possible on the web.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {skills.map((skill) => (
                <motion.div 
                  key={skill.name}
                  variants={itemVariants}
                  className={`neon-card p-4 transition-all duration-300 ${
                    hoveredSkill === skill.name 
                      ? 'border-neon-purple shadow-[0_0_15px_rgba(155,93,229,0.5)]' 
                      : ''
                  }`}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex items-center gap-2">
                    <span role="img" aria-label={skill.name}>{skill.icon}</span>
                    <span className="font-medium">{skill.name}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
