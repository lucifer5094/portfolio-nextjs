'use client';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { useState, useEffect, useRef } from 'react';
import {
  SiPython, SiTensorflow, SiPytorch, SiNextdotjs, SiTailwindcss,
  SiKeras, SiHuggingface, SiScikitlearn, SiPandas, SiNumpy,
  SiDjango, SiReact, SiJavascript, SiTypescript, SiCplusplus,
  SiGithubactions, SiAmazon, SiChatbot, SiDocker, SiKubernetes
} from 'react-icons/si';

// Enhanced tech stack with categories and experience levels
const techStack = [
  { icon: SiPython, name: 'Python', category: 'languages', level: 'Expert' },
  { icon: SiJavascript, name: 'JavaScript', category: 'languages', level: 'Advanced' },
  { icon: SiTypescript, name: 'TypeScript', category: 'languages', level: 'Advanced' },
  { icon: SiCplusplus, name: 'C/C++', category: 'languages', level: 'Intermediate' },
  { icon: SiTensorflow, name: 'TensorFlow', category: 'ml', level: 'Expert' },
  { icon: SiPytorch, name: 'PyTorch', category: 'ml', level: 'Expert' },
  { icon: SiKeras, name: 'Keras', category: 'ml', level: 'Advanced' },
  { icon: SiHuggingface, name: 'Hugging Face', category: 'ml', level: 'Advanced' },
  { icon: SiScikitlearn, name: 'scikit-learn', category: 'ml', level: 'Expert' },
  { icon: SiPandas, name: 'Pandas', category: 'ml', level: 'Expert' },
  { icon: SiNumpy, name: 'NumPy', category: 'ml', level: 'Expert' },
  { icon: SiNextdotjs, name: 'Next.js', category: 'web', level: 'Advanced' },
  { icon: SiReact, name: 'React.js', category: 'web', level: 'Expert' },
  { icon: SiTailwindcss, name: 'Tailwind CSS', category: 'web', level: 'Advanced' },
  { icon: SiDjango, name: 'Django', category: 'web', level: 'Advanced' },
  { icon: SiDocker, name: 'Docker', category: 'devops', level: 'Intermediate' },
  { icon: SiKubernetes, name: 'Kubernetes', category: 'devops', level: 'Beginner' },
  { icon: SiGithubactions, name: 'GitHub Actions', category: 'devops', level: 'Intermediate' },
  { icon: SiAmazon, name: 'AWS', category: 'devops', level: 'Intermediate' },
  { icon: SiChatbot, name: 'Botpress', category: 'others', level: 'Intermediate' }
];

// Typing sound effect
const useTypingSound = () => {
  const [audio] = useState(() => typeof Audio !== 'undefined' ? new Audio('/sounds/typing.mp3') : null);

  const playTypingSound = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.volume = 0.2;
      audio.play().catch(err => console.error("Audio playback error:", err));
    }
  };

  return { playTypingSound };
};

export default function AboutSection() {
  const [visibleText, setVisibleText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [commandExecuted, setCommandExecuted] = useState(false);
  const [userCommand, setUserCommand] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isTyping, setIsTyping] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { playTypingSound } = useTypingSound();

  const terminalLines = [
    '$ whoami',
    "Ankit Raj ~ Full-Stack AI/ML Developer",
    '',
    '$ cat about.md',
    '"Welcome to My Digital Playground 🚀"',
    "I'm Ankit Raj, an AI/ML Developer crafting intelligent, scalable, and futuristic systems.",
    '',
    '🧠 Turning raw data into real-world impact',
    '💻 Breaking algorithms & automating the impossible',
    '⚡ Passionate about Deep Learning, NLP & Computer Vision',
    '🚀 Building, optimizing, and pushing AI boundaries!',
    '',
    '"Code. Train. Deploy. Innovate."',
    '',
    '💀 Ready to explore the future? Let\'s dive in! 💀',
    '',
  ];

  // Typing effect with variable speed and occasional "typos"
  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const line = terminalLines[currentLine];
      if (visibleText.length < line.length) {
        // Variable typing speed
        const typingSpeed = Math.random() * 30 + (line.startsWith('$') ? 70 : 20);

        // 5% chance to make a "typo" (only if we're not at the beginning of a line)
        const makeTypo = visibleText.length > 0 && Math.random() < 0.05;

        const timer = setTimeout(() => {
          if (makeTypo) {
            // Make a typo
            const wrongChar = 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
            setVisibleText(visibleText + wrongChar);

            // Set up a correction after a short delay
            setTimeout(() => {
              setVisibleText(visibleText);
              playTypingSound();
            }, 200);
          } else {
            // Normal typing
            setVisibleText(line.substring(0, visibleText.length + 1));
            if (line[visibleText.length]) {
              playTypingSound();
            }
          }
        }, typingSpeed);

        return () => clearTimeout(timer);
      }
    }
  }, [visibleText, currentLine, playTypingSound, terminalLines]);

  // Handle line advancement
  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const line = terminalLines[currentLine];
      if (visibleText.length >= line.length) {
        const timer = setTimeout(() => {
          setVisibleText('');
          setCurrentLine(prev => prev + 1);
        }, line.startsWith('$') ? 300 : 100);  // Reduced delays from 1000/500ms to 300/100ms

        return () => clearTimeout(timer);
      }
    } else if (!commandExecuted && isTyping) {
      setCommandExecuted(true);
      setIsTyping(false);
    }
  }, [currentLine, visibleText, commandExecuted, isTyping, terminalLines]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Scroll terminal to bottom when content changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleText, currentLine, terminalOutput]);

  const handleCommandSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userCommand) {
      let response: string[] = [];
      const cmd = userCommand.toLowerCase().trim();

      if (cmd === 'help') {
        response = [
          'Available commands:',
          ' - help          : Show this help message',
          ' - clear         : Clear the terminal',
          ' - skills        : List my technical skills',
          ' - contact       : Show contact information',
          ' - projects      : Show featured projects',
          ' - experience    : Show work experience',
          ' - education     : Show educational background'
        ];
      } else if (cmd === 'clear') {
        setTerminalOutput([]);
        setUserCommand('');
        return;
      } else if (cmd === 'skills' || cmd.startsWith('skills ')) {
        response = [
          'Technical Skills:',
          ' - Languages: Python, JavaScript, TypeScript, C/C++',
          ' - ML/AI: TensorFlow, PyTorch, Keras, NLP, Computer Vision',
          ' - Web: React, Next.js, Tailwind CSS, Django',
          ' - DevOps: Docker, Kubernetes, AWS, CI/CD'
        ];
      } else if (cmd === 'contact') {
        response = [
          'Contact Information:',
          ` - Email: ${process.env.NEXT_PUBLIC_EMAIL}`,
          ` - LinkedIn: ${process.env.NEXT_PUBLIC_LINKEDIN_URL.replace('https://', '')}`,
          ` - GitHub: ${process.env.NEXT_PUBLIC_GITHUB_URL.replace('https://', '')}`,
          ` - Twitter: ${process.env.NEXT_PUBLIC_TWITTER_URL.replace('https://', '@AnkitRa55161882')}`
        ];
      } else if (cmd === 'projects') {
        response = [
          'Featured Projects:',
          ' - AI Chatbot with NLP capabilities',
          ' - Computer Vision model for medical imaging',
          ' - Full-stack web application for data visualization',
          ' - Machine Learning pipeline with MLOps integration'
        ];
      } else if (cmd === 'experience') {
        response = [
          'Work Experience:',
          ' - Founder & Developer @ AlgoGenesis (2025-Present)',
          ' - Lead AI Developer @ cureAI (2025-Present)',
          ' - Full-Stack Developer @ QuizNova (2025-Present)',
          ' - AI & ML Researcher @ Personal Projects (2023-Present)',
          ' - GFG Campus Ambassador (Dec 2024-Dec 2025)'
        ];

      } else if (cmd === 'education') {
        response = [
          'Education:',
          ' - M.S. in Computer Science, AI Specialization',
          ' - B.Tech in Computer Science and Engineering'
        ];
      } else {
        response = [`Command not found: ${userCommand}. Type 'help' for available commands.`];
      }

      setTerminalOutput([...terminalOutput, `$ ${userCommand}`, ...response]);
      setUserCommand('');
    }
  };

  const LevelBadge = ({ level }: { level: string }) => {
    const colors: Record<string, string> = {
      'Expert': 'bg-green-900/50 text-green-400 border-green-500/30',
      'Advanced': 'bg-blue-900/50 text-blue-400 border-blue-500/30',
      'Intermediate': 'bg-yellow-900/50 text-yellow-400 border-yellow-500/30',
      'Beginner': 'bg-orange-900/50 text-orange-400 border-orange-500/30'
    };

    return (
      <span className={`text-xs px-2 py-0.5 rounded-full ${colors[level]} absolute top-1 right-1 border opacity-0 group-hover:opacity-100 transition-opacity`}>
        {level}
      </span>
    );
  };

  return (
    <section className="py-20 px-4 md:px-8" id="about">

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-16 text-emerald-400 relative z-10"
      >
        About Me
      </motion.h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Enhanced Hacker-style Terminal Window */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl overflow-hidden border border-emerald-500/30 bg-background-terminal shadow-2xl backdrop-blur-sm"
        >
          <div className="p-2 bg-gray-900/80 border-b border-emerald-500/30 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-xs text-gray-400">ankit5094.vercel.app ~ </div>
            <div className="w-4"></div>
          </div>
          <div
            ref={terminalRef}
            className="p-6 font-mono text-sm terminal-bg max-h-[400px] overflow-y-auto"
          >
            {terminalLines.slice(0, currentLine).map((line, index) => (
              <div key={`initial-${index}`} className={`mb-1 ${line.startsWith('$') ? 'text-emerald-400' : line.includes('"') ? 'text-yellow-300' : 'text-gray-200'}`}>
                {line}
              </div>
            ))}
            {currentLine < terminalLines.length && (
              <div className="flex">
                <span className={`${terminalLines[currentLine].startsWith('$') ? 'text-emerald-400' : terminalLines[currentLine].includes('"') ? 'text-yellow-300' : 'text-gray-200'}`}>
                  {visibleText}
                </span>
                <span className={`h-4 w-2 bg-emerald-400 ml-0.5 inline-block ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
              </div>
            )}

            {commandExecuted && (
              <>
                {/* Terminal output from user commands */}
                {terminalOutput.map((line, index) => (
                  <div key={`output-${index}`} className={`mt-1 ${line.startsWith('$') ? 'text-emerald-400' : line.includes(':') ? 'text-yellow-300' : 'text-gray-200'}`}>
                    {line}
                  </div>
                ))}

                {/* Interactive command prompt */}
                <div className="flex items-center mt-4 text-emerald-400">
                  <span className="mr-2">$</span>
                  <input
                    type="text"
                    value={userCommand}
                    onChange={(e) => setUserCommand(e.target.value)}
                    onKeyDown={handleCommandSubmit}
                    className="bg-transparent focus:outline-none flex-1 caret-emerald-400 text-gray-200"
                    placeholder="Type 'help' for commands..."
                    autoFocus
                  />
                  <span className={`h-4 w-2 bg-emerald-400 ml-0.5 inline-block ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Tech Stack Grid with Categories */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xl font-bold mb-6 text-emerald-400"
          >
            Tech Stack & Tools
          </motion.h3>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'languages', 'ml', 'web', 'devops', 'others'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 text-xs rounded-full transition-all ${activeCategory === category
                  ? 'bg-emerald-500 text-white font-medium'
                  : 'bg-emerald-900/20 text-emerald-400 hover:bg-emerald-900/40 border border-emerald-500/20'
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Tech icons grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            <IconContext.Provider value={{ className: "w-8 h-8 mb-2 text-emerald-400 group-hover:text-emerald-300" }}>
              {techStack
                .filter(tech => activeCategory === 'all' || tech.category === activeCategory)
                .map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="p-3 rounded-lg card-bg hover:bg-emerald-500/10 flex flex-col items-center justify-center relative group"
                  >
                    <tech.icon />
                    <span className="text-xs text-white text-center">{tech.name}</span>
                    <LevelBadge level={tech.level} />
                  </motion.div>
                ))}
            </IconContext.Provider>
          </div>
        </div>
      </div>

      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-emerald-500/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-1.25rem) translateX(0.625rem); }
          50% { transform: translateY(-1.25rem) translateX(0.625rem); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </section>
  );
}