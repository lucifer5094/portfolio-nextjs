'use client';
import { motion } from 'framer-motion';
import React, { useState, useMemo } from 'react';
import waterImage from '../assets/images/water_pollution.jpg';
import quizNovaImage from '../assets/images/quiznova.png';
import ProjectCard, { Project, TechCategory } from './ProjectCard';

const completedProjects: Project[] = [
  {
    title: 'QuizNova',
    description: 'MCQ-based quiz platform with scoring & leaderboard.',
    longDescription: 'A comprehensive MCQ platform with real-time scoring, interactive UI, and competitive leaderboards. Features timed quizzes and multiple question formats.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage'],
    techCategories: ['frontend'],
    image: quizNovaImage,
    github: 'https://github.com/lucifer5094/quiznova',
    demo: 'https://lucifer5094.github.io/QuizNova/',
    featured: true,
    date: '2025-01',
    status: 'completed',
  },
  {
    title: 'Water Pollution Monitoring Boat',
    description: 'IIOT-based sensor boat for pollution tracking.',
    longDescription: 'An IoT-powered autonomous boat that collects and transmits real-time water quality data including pH levels, turbidity, and chemical concentrations to aid environmental monitoring.',
    tech: ['Arduino', 'C++', 'IoT Sensors', 'Data Analytics'],
    techCategories: ['iot', 'other'],
    image: waterImage,
    github: 'https://github.com/lucifer5094/water-pollution-monitorin',
    demo: 'https://www.linkedin.com/pulse/water-pollution-monitor-ankit-raj-0ecqc/',
    date: '2024-02',
    status: 'completed',
    collaborators: ['Environmental Science Dept']
  },
];

const ongoingProjects: Project[] = [
  {
    title: 'cureAI',
    description: 'Healthcare AI for symptom detection & disease prediction.',
    longDescription: 'An advanced healthcare platform using machine learning algorithms to analyze symptoms and predict potential health issues with high accuracy.',
    tech: ['Python', 'TensorFlow', 'NLP', 'scikit-learn', 'Flask'],
    techCategories: ['ml/ai', 'backend'],
    image: '',
    github: '',
    demo: '',
    featured: true,
    date: '2023-09',
    status: 'ongoing',
  },
  {
    title: 'AlgoGenesis Website',
    description: 'Official website for the AlgoGenesis coding club.',
    longDescription: 'A modern, responsive website for the university coding club featuring event management, member profiles, and learning resources.',
    tech: ['Next.js', 'TailwindCSS', 'Framer Motion', 'TypeScript'],
    techCategories: ['frontend', 'fullstack'],
    image: '',
    github: '',
    demo: '',
    date: '2023-10',
    status: 'ongoing',
    collaborators: ['AlgoGenesis Team']
  },
  {
    title: 'Face Recognition System',
    description: 'AI-based facial detection & recognition.',
    longDescription: 'A robust face recognition system using deep learning techniques to accurately detect and recognize faces in real-time.',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'Deep Learning'],
    techCategories: ['ml/ai', 'backend'],
    image: '',
    github: '',
    demo: '',
    date: '2023-07',
    status: 'ongoing',
  },
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<TechCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter projects based on active filter
  const filteredCompleted = useMemo(() => {
    if (activeFilter === 'all') return completedProjects;
    return completedProjects.filter(project => 
      project.techCategories.includes(activeFilter)
    );
  }, [activeFilter]);

  const filteredOngoing = useMemo(() => {
    if (activeFilter === 'all') return ongoingProjects;
    return ongoingProjects.filter(project => 
      project.techCategories.includes(activeFilter)
    );
  }, [activeFilter]);

  const techFilters: {label: string, value: TechCategory | 'all'}[] = [
    { label: 'All', value: 'all' },
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Full Stack', value: 'fullstack' },
    { label: 'ML/AI', value: 'ml/ai' },
    { label: 'IoT', value: 'iot' },
    { label: 'Mobile', value: 'mobile' },
    { label: 'Other', value: 'other' }
  ];

  return (
    <section className="py-20 px-4 md:px-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-16 text-emerald-400"
      >
        Projects
      </motion.h2>

      <div className="max-w-6xl mx-auto">
        {/* Filtering controls */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          {techFilters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeFilter === filter.value
                  ? 'bg-emerald-500 text-white font-medium'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
          
          <div className="ml-auto flex gap-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400'}`}
              aria-label="Grid View"
            >
              <span className="sr-only">Grid View</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"/>
              </svg>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400'}`}
              aria-label="List View"
            >
              <span className="sr-only">List View</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-6 text-emerald-300">🔥 Completed Projects</h3>
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-8 mb-12' : 'flex flex-col gap-6 mb-12'}>
          {filteredCompleted.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} viewMode={viewMode} />
          ))}
        </div>

        <h3 className="text-2xl font-semibold mb-6 text-emerald-300">🚀 Ongoing Projects</h3>
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-8' : 'flex flex-col gap-6'}>
          {filteredOngoing.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} viewMode={viewMode} />
          ))}
        </div>
      </div>
    </section>
  );
}
