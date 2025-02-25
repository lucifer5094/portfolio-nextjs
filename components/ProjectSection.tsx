'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import waterImage from '../assets/images/water_pollution.jpg';
import quizNovaImage from '../assets/images/quiznova.png';

const completedProjects = [
  {
    title: 'QuizNova',
    description: 'MCQ-based quiz platform with scoring & leaderboard.',
    tech: 'HTML · CSS · JavaScript',
    image: quizNovaImage,
    github: 'https://github.com/lucifer5094/quiznova',
    demo: 'https://lucifer5094.github.io/QuizNova/',
  },
  {
    title: 'Water Pollution Monitoring Boat',
    description: 'IIOT-based sensor boat for pollution tracking.',
    tech: 'Arduino · C++ · Sensors',
    image: waterImage,
    github: 'https://github.com/lucifer5094/water-pollution-monitorin',
    demo: 'https://www.linkedin.com/pulse/water-pollution-monitor-ankit-raj-0ecqc/',
  },

];

const ongoingProjects = [
  {
    title: 'cureAI',
    description: 'Healthcare AI for symptom detection & disease prediction.',
    tech: 'Python · TensorFlow · NLP',
    image: '/projects/cureAI.jpg',
    github: 'https://github.com/lucifer5094/cureAI',
    demo: '',
  },
  {
    title: 'AlgoGenesis Website',
    description: 'Official website for the AlgoGenesis coding club.',
    tech: 'Next.js · TailwindCSS · Framer Motion',
    image: '/projects/algogenesis.jpg',
    github: '',
    demo: '',
  },
  {
    title: 'AI Chatbot',
    description: 'Conversational AI chatbot using Transformers.',
    tech: 'Python · NLP · TensorFlow',
    image: '/projects/chatbot.jpg',
    github: '',
    demo: '',
  },
  {
    title: 'Face Recognition System',
    description: 'AI-based facial detection & recognition.',
    tech: 'Python · OpenCV · TensorFlow',
    image: '/projects/face_recognition.jpg',
    github: '',
    demo: '',
  },
];

export default function ProjectsSection() {
  return (
    <section className="py-20 px-4 md:px-8 bg-black/50">
      <h2 className="text-4xl font-bold mb-12 text-center font-mono text-emerald-400">
        $ Projects
      </h2>

      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6 text-emerald-300">🔥 Completed Projects</h3>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {completedProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        <h3 className="text-2xl font-semibold mb-6 text-emerald-300">🚀 Ongoing Projects</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {ongoingProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl border border-emerald-500/30 hover:shadow-lg transition-shadow"
    >
      <div className="h-64 relative">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent" />
      </div>

      <div className="absolute bottom-0 p-6 w-full bg-black/60 backdrop-blur-md">
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-emerald-400 mb-2 text-sm">{project.tech}</p>
        <p className="opacity-75 text-gray-300 mb-4">{project.description}</p>

        <div className="flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-emerald-400 transition-colors flex items-center gap-2"
            >
              <FaGithub size={20} /> GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-emerald-400 transition-colors flex items-center gap-2"
            >
              <FaExternalLinkAlt size={18} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
