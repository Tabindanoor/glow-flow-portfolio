import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}
export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    liveUrl: string;
    sourceUrl: string;
    featured?: boolean;
  }

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <div 
      className="rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        animation: 'fadeIn 0.6s ease-out forwards',
        opacity: 0
      }}
    >
      <div className="relative overflow-hidden group aspect-video">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* {project.featured && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Featured
          </div>
        )} */}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 hover:text-blue-400">
          {project.title}
        </h3>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-3 mt-auto">
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors duration-200"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          
          <a 
            href={project.sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 border border-gray-600 hover:border-blue-500 hover:text-blue-400 text-gray-300 text-sm font-medium rounded-md transition-all duration-200"
          >
            <span>Code</span>
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;