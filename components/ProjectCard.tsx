'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa';
import { MdFeaturedPlayList } from 'react-icons/md';
import { StaticImageData } from 'next/image';

export type TechCategory = 'frontend' | 'backend' | 'fullstack' | 'ml/ai' | 'iot' | 'mobile' | 'other';

export interface Project {
    title: string;
    description: string;
    longDescription?: string;
    tech: string[];
    techCategories: TechCategory[];
    image: string | StaticImageData;
    github: string;
    demo: string;
    video?: string;
    featured?: boolean;
    date: string;
    status: 'completed' | 'ongoing' | 'planned';
    collaborators?: string[];
}

interface ProjectCardProps {
    project: Project;
    index: number;
    viewMode: 'grid' | 'list';
}

export default function ProjectCard({ project, index, viewMode }: ProjectCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group relative rounded-xl border border-emerald-500/30 hover:border-emerald-500/70 p-4 bg-black/40 transition-all"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/4 h-32 relative rounded-lg overflow-hidden">
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              className="object-cover" 
            />
            {project.featured && (
              <div className="absolute top-2 right-2 bg-emerald-500 text-black p-1 rounded-full">
                <MdFeaturedPlayList size={16} />
              </div>
            )}
          </div>
          
          <div className="md:w-3/4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <div className="flex items-center text-sm text-emerald-400">
                <FaCalendarAlt className="mr-1" /> {project.date}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 my-2">
              {project.tech.map((tech, i) => (
                <span key={i} className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
            
            <p className="text-gray-300 my-2">
              {showDetails && project.longDescription ? project.longDescription : project.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-emerald-400 transition-colors flex items-center gap-2 text-sm"
                >
                  <FaGithub size={16} /> GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-emerald-400 transition-colors flex items-center gap-2 text-sm"
                >
                  <FaExternalLinkAlt size={14} /> Live Demo
                </a>
              )}
              {project.longDescription && (
                <button 
                  className="text-emerald-400 hover:text-emerald-300 text-sm"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view (default)
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl border border-emerald-500/30 hover:shadow-lg hover:border-emerald-500/70 transition-all"
    >
      <div className="h-64 relative">
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {project.featured && (
            <div className="absolute top-3 right-3 bg-emerald-500 text-black p-1.5 rounded-full z-10">
              <MdFeaturedPlayList size={20} />
            </div>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent" />
      </div>

      <div className="absolute bottom-0 p-6 w-full bg-black/70 backdrop-blur-md">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
          <span className="text-xs text-emerald-400 flex items-center">
            <FaCalendarAlt className="mr-1" /> {project.date}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.slice(0, 3).map((tech, i) => (
            <span key={i} className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-xs bg-emerald-800/30 text-emerald-200 px-2 py-0.5 rounded">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
        
        <p className="opacity-80 text-gray-300 mb-4">
          {showDetails && project.longDescription ? project.longDescription : project.description}
        </p>

        <div className="flex flex-wrap gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-emerald-400 transition-colors flex items-center gap-2"
            >
              <FaGithub size={18} /> GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-emerald-400 transition-colors flex items-center gap-2"
            >
              <FaExternalLinkAlt size={16} /> Live Demo
            </a>
          )}
          {project.longDescription && (
            <button 
              className="ml-auto text-emerald-400 hover:text-emerald-300 text-sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
