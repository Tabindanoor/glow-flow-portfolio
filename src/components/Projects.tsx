import { useState, useRef, forwardRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Github, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import todoUsingAiPicture from "/ai todo.png";
import todoUsingAiVideo from "/ai todo.mp4";
import todoUsingFirebasePic from "/firebase todo.png";
import todoUsingFirebaseVideo from "/firebase todo.mp4";
import uploadImageMernPic from "/image upload.png"
import uploadImageMernVideo from "/image upload.mp4"
import pantryTrackerPic from "/pantry todo.png"
import pantryTrackerVideo from "/pantry todo.mp4"
import paperrocksicorPic from "/paperrocksicor.png"
import paperrocksicorVideo from "/paperrocksicor.mp4"
import simpleTicTacToePic from "/simple tic tac toe.png"
import simpleTicTacToeVideo from "/simple tic tac toe.mp4"
import realtimeTicTacToePic from "/realtime tic tac toe.png"
import realtimeTicTacToeVideo from "/realtime tic tac toe.mp4"
import TodoKanbanPic from "/todo Kanban.png"
import TodoKanbanVideo from "/todo kanban.mp4"

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  video?: string;
  tags: string[];
  liveUrl: string;
  sourceUrl: string;
}

const ProjectCard3D = ({
  project,
  isHovered,
  onClick,
}: {
  project: Project;
  isHovered: boolean;
  onClick: () => void;
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const imageTexture = useTexture(project.image || "/placeholder.svg");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture | null>(null);

  useEffect(() => {
    if (project.video) {
      const video = document.createElement('video');
      video.src = project.video;
      video.crossOrigin = 'anonymous';
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      videoRef.current = video;
      const texture = new THREE.VideoTexture(video);
      setVideoTexture(texture);
    }
  }, [project.video]);

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovered]);

  useEffect(() => {
    const animate = () => {
      if (!mesh.current) return;
      // const targetRotationY = isHovered ? Math.PI * 0.05 : 0;
      // const targetRotationX = isHovered ? -Math.PI * 0.03 : 0;
      const targetRotationY = 0;
      const targetRotationX = 0;

      const targetScale = isHovered ? 1.08 : 1;

      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetRotationY, 0.05);
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, targetRotationX, 0.05);
      const currentScale = mesh.current.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
      mesh.current.scale.set(newScale, newScale, newScale);

      requestAnimationFrame(animate);
    };

    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isHovered]);

  return (
    <mesh ref={mesh} position={[0, 0, 0]} castShadow receiveShadow onClick={onClick}>
      <boxGeometry args={[3.5, 2, 0.1]} />
      <meshStandardMaterial
        map={isHovered && videoTexture ? videoTexture : imageTexture}
        metalness={0.2}
        roughness={0.5}
        color="#ffffff"
      />
    </mesh>
  );
};

const Projects = forwardRef<HTMLElement>((props, ref) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [modalVideo, setModalVideo] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
  {
    id: 1,
    title: "AI Todo App",
    description: "An intelligent todo app that uses AI to categorize and suggest tasks.",
    image: todoUsingAiPicture,
    video: todoUsingAiVideo,
    tags: ["Next JS", "OpenAI", "Tailwind CSS", "Convex","Clerk"],
    liveUrl: "#",
    sourceUrl: "https://github.com/Tabindanoor/convex-nextjs",
  },
  {
    id: 2,
    title: "Image Upload MERN",
    description: "A MERN stack application for uploading and storing images with preview.",
    image: uploadImageMernPic,
    video: uploadImageMernVideo,
    tags: ["MongoDB", "Express", "React", "Node.js","Tailwind CSS"],
    liveUrl: "#",
    sourceUrl: "https://github.com/Tabindanoor/FrontendImageUploadingMERN",
  },
  {
    id: 3,
    title: "Firebase Todo App",
    description: "A realtime todo app powered by Firebase for data syncing and storage.",
    image: todoUsingFirebasePic,
    video: todoUsingFirebaseVideo,
    tags: ["React JS", "Firebase", "Tailwind CSS", "React Toastify"],
    liveUrl: "#",
    sourceUrl: "https://github.com/Tabindanoor/Todo-List-using-Firebase",
  },
  
  {
     id: 4,
    title: "Simple Tic Tac Toe",
    description: "Classic tic tac toe game with clean design and smooth interactivity.",
    image: simpleTicTacToePic,
    video: simpleTicTacToeVideo,
    tags: ["React", "Vite", "Tailwind CSS", "CSS Animations"],
    liveUrl: "#",
    sourceUrl: "https://github.com/Tabindanoor/react-tic-tac-toe",
 
  },
  {
    id: 5,
    title: "Paper Rock Scissor Game",
    description: "A simple and fun rock-paper-scissors game with animated UI.",
    image: paperrocksicorPic,
    video: paperrocksicorVideo,
    tags: [ "React", "Vite",  "Tailwind CSS",  "Three.js",,"React Toastify"],
    liveUrl: "#",
    sourceUrl: "https://github.com/Tabindanoor/paper-scesor-rock-react",
  },
  {
    id: 6,
    title: "Pantry Tracker",
    description: "Manage pantry items efficiently with CRUD-based inventory app.",
    image: pantryTrackerPic,
    video: pantryTrackerVideo,
    tags: ["Next JS",, "Tailwind CSS", "Prisma", "Mongo DB"],
    liveUrl: "#",
    sourceUrl: "https://github.com/Tabindanoor/Pantry-Tracker-Headstarter",
  },
  {
    id: 7,
    title: "Realtime Tic Tac Toe",
    description: "Multiplayer realtime tic tac toe game using Socket.IO and Node.js.",
    image: realtimeTicTacToePic,
    video: realtimeTicTacToeVideo,
    tags: ["React",  "TypeScript",  "Vite",  "Tailwind CSS",  "Socket.IO",  "Express"],
    liveUrl: "#",
    sourceUrl: "https://github.com/Tabindanoor/multiplayer-tik-tak-toe",
  },
  {
    id: 8,
    title: "Todo Kanban Board",
    description: "Organize tasks with a draggable Kanban-style board interface.",
    image: TodoKanbanPic,
    video: TodoKanbanVideo,
    tags: [ "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "#",
    sourceUrl: "#",
  },
];

  useIntersectionObserver({
    target: sectionRef,
    onIntersect: () => {
      if (headingRef.current) headingRef.current.classList.add('animate-');
    },
    threshold: 0.2,
  });

   useEffect(() => {
    if (ref && typeof ref !== 'function') {
      ref.current = sectionRef.current;
    }
  }, [ref]);



  useEffect(() => {
  // Preload all videos
  projects.forEach((project) => {
    if (project.video) {
      const video = document.createElement('video');
      video.src = project.video;
      video.preload = 'auto';
      video.muted = true;
      video.load();
    }
  });

  // Preload all images
  projects.forEach((project) => {
    const img = new Image();
    img.src = project.image;
  });
}, []);


  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 min-h-screen flex items-center bg-gradient-to-b from-dark/95 to-dark relative overflow-hidden"
    >
      {/* Neon Background Blur */}
      <div className="absolute top-40 -left-32 w-80 h-80 rounded-full bg-neon-purple/10 blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-40 -right-32 w-80 h-80 rounded-full bg-neon-cyan/10 blur-[100px] animate-pulse-glow" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 ref={headingRef} className="section-heading text-center">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subheading text-center">
            Explore my recent work showcasing creative solutions and technical skills
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="neon-card overflow-hidden opacity-1 group rounded-xl"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-64 relative cursor-pointer">
                <Canvas shadows dpr={[1, 2]}>
                  <ambientLight intensity={0.6} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
                  <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#00F5FF" />
                  <ProjectCard3D
                    project={project}
                    isHovered={hoveredProject === project.id}
                    onClick={() => setModalVideo(project.video ?? null)}
                  />
                  <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={40} />
                  <Environment preset="city" />
                </Canvas>
              </div>

              {/* Card Content */}
              <div className="p-8 relative">
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-neon-cyan transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag,index) => (
                    <Badge  key={`${tag}-${index}`} variant="outline" className="bg-neon-purple/10 text-neon-cyan border-neon-purple/20 hover:bg-neon-purple/20">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4 items-center">
                  {/* <Button variant="default" size="sm" className="bg-neon-purple hover:bg-neon-purple/90 text-white font-medium" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      Live Demo <ExternalLink className="ml-1 w-4 h-4" />
                    </a>
                  </Button> */}
                  <Button variant="outline" size="sm" className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10" asChild>
                    <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      Source <Github className="ml-1 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects */}
        {/* <div className="flex justify-center mt-12">
          <Link to={"https://github.com/Tabindanoor"}>
          <motion.a  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="btn-primary" href="#">
            View All Projects
          </motion.a>
          </Link>
        </div> */}

        <div className="flex justify-center mt-12">
  <motion.a
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    className="btn-primary"
    href="https://github.com/Tabindanoor"
    target="_blank"
    rel="noopener noreferrer"
  >
    View All Projects
  </motion.a>
</div>

      </div>

      {/* Modal for Video */}
      {modalVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full aspect-video">
            <video src={modalVideo} autoPlay loop controls preload='auto' className="w-full h-full object-contain rounded-lg shadow-lg" />
            <button
              onClick={() => setModalVideo(null)}
              className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/80 rounded-full p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
});

export default Projects;
