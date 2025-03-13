'use client';
import { useState, useEffect} from 'react';
import { motion,  useMotionValue, useTransform } from 'framer-motion';
import { Rocket, Terminal } from 'lucide-react';
import Image from 'next/image';
import avatar from '../assets/images/avatar.webp';
import Particles from 'react-particles';
import { loadSlim } from "tsparticles-slim";
import { Engine } from 'tsparticles-engine';
import Typewriter from 'typewriter-effect';

const facts = [
    "Did you know? The first AI program was written in 1951!",
    "AI can now generate images from text with mind-blowing accuracy!",
    "GPT models are trained on datasets with billions of words!",
    "The first neural network concept dates back to 1943!",
    "Machine learning is used in healthcare for disease prediction!"
];

export default function HeroSection() {
    // Intro Text Rotation
    const words = ['Hello World!', 'Welcome to My Portfolio'];
    const [textIndex, setTextIndex] = useState(0);

    // Mouse position for spotlight effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    // 3D tilt effect for avatar
    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);
    const rotateX = useTransform(tiltY, [-300, 300], [15, -15]);
    const rotateY = useTransform(tiltX, [-300, 300], [-15, 15]);

    // Particle animation initialization
    const particlesInit = async (engine: Engine) => {
        await loadSlim(engine);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % words.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [words.length]);

    // Mouse spotlight effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            
            // Calculate tilt based on mouse position
            const rect = (document.querySelector('.avatar-container') as HTMLElement)?.getBoundingClientRect();
            if (rect) {
                const avatarX = rect.left + rect.width / 2;
                const avatarY = rect.top + rect.height / 2;
                tiltX.set(e.clientX - avatarX);
                tiltY.set(e.clientY - avatarY);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseX, mouseY, tiltX, tiltY]);

    // Time, System Info & Facts
    const [time, setTime] = useState('');
    const [systemInfo, setSystemInfo] = useState('');
    const [currentFact, setCurrentFact] = useState(facts[0]);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString() + ' - ' + now.toLocaleDateString());
        };
        updateTime();
        const timeInterval = setInterval(updateTime, 1000);

        // Extract Browser & OS Info
        const osInfo = navigator.userAgent.match(/\(([^)]+)\)/)?.[1] || "Unknown OS";
        setSystemInfo(`OS: ${osInfo} | Screen: ${window.innerWidth}x${window.innerHeight}`);

        // Rotate Facts
        const factInterval = setInterval(() => {
            setCurrentFact(facts[Math.floor(Math.random() * facts.length)]);
        }, 5000);

        return () => {
            clearInterval(timeInterval);
            clearInterval(factInterval);
        };
    }, []);

    return (
        <section className="relative h-screen flex flex-col items-center justify-center text-center space-y-6 z-10 overflow-hidden">
            {/* Background Particles */}
            <div className="absolute inset-0 z-0">
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={{
                        fpsLimit: 60,
                        particles: {
                            color: {
                                value: "#34D399"
                            },
                            links: {
                                color: "#34D399",
                                distance: 150,
                                enable: true,
                                opacity: 0.5,
                                width: 0.0625 // Changed from 1px
                            },
                            move: {
                                enable: true,
                                speed: 1
                            },
                            number: {
                                density: {
                                    enable: true,
                                    area: 800
                                },
                                value: 40
                            },
                            opacity: {
                                value: 0.5
                            },
                            size: {
                                value: 0.0625 // Changed from 1px
                            }
                        },
                        detectRetina: true
                    }}
                />
            </div>

            {/* Mouse Spotlight Effect */}
            <motion.div 
                className="spotlight absolute w-[30vw] h-[30vw] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(52, 211, 153, 0.15) 0%, rgba(0,0,0,0) 70%)",
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
            />

            {/* Animated Avatar */}
            <motion.div
                className="relative w-32 h-32 mx-auto mb-4 avatar-container"
                style={{
                    rotateX,
                    rotateY
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 150, damping: 10 }}
            >
                <div className="rounded-full border-4 border-emerald-500 overflow-hidden shadow-lg shadow-emerald-500/20">
                    <Image
                        src={avatar}
                        alt='Avatar'
                        width={128}
                        height={128}
                        priority
                        className="hover:scale-110 transition-transform duration-500"
                    />
                </div>
                <motion.div 
                    className="absolute -right-2 -bottom-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <span className="text-white text-xs font-bold">3D</span>
                </motion.div>
            </motion.div>

            {/* Animated Text */}
            <div className="h-20">
                <motion.h1
                    key={textIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-6xl font-bold neon-text"
                >
                    <span className="text-emerald-400 mr-2">{">"}</span>
                    <Typewriter
                        options={{
                            strings: words,
                            autoStart: true,
                            loop: true,
                            delay: 50,
                            deleteSpeed: 30,
                        }}
                    />
                </motion.h1>
            </div>

            {/* Professional Title */}
            <span></span>
            <p className="text-lg md:text-xl font-mono text-emerald-300 mt-2">
                $ Engineering Smart Solutions with {'<code/>'} & {'<passion/>'}
            </p>

            {/* System Info, Time, and Facts */}
            <motion.div
                className="mt-4 flex flex-col items-center bg-black/60 text-green-300 p-4 rounded-lg w-full max-w-md font-mono text-sm md:text-base backdrop-blur-sm border border-emerald-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ boxShadow: "0 0 0.9375rem 0.125rem rgba(16, 185, 129, 0.2)" }}
                style={{ rotateX, rotateY }}
            >
                <p className="opacity-75">{time}</p>
                <p className="opacity-75">{systemInfo}</p>
                <p className="mt-2 opacity-90 animate-pulse">{currentFact}</p>
            </motion.div>

            {/* Buttons */}
            <motion.div 
                className="flex flex-wrap justify-center gap-4 mt-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.button
                    onClick={() => {
                        const projectsElement = document.getElementById('projects');
                        if (projectsElement) {
                            projectsElement.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 px-6 py-3 md:py-3.5 rounded-full font-mono border border-emerald-500 hover:bg-emerald-500/30 hover:shadow-[0_0_0.9375rem_0.125rem_rgba(52,211,153,0.6)] transition-all duration-300"
                >
                    <Rocket size={20} className="animate-pulse" /> Explore Projects
                </motion.button>
                <motion.button
                    onClick={() => {
                        const contactElement = document.getElementById('contact');
                        if (contactElement) {
                            contactElement.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2 px-6 py-3 md:py-3.5 rounded-full font-mono border border-purple-500 hover:bg-purple-500/30 hover:shadow-[0_0_0.9375rem_0.125rem_rgba(168,85,247,0.6)] transition-all duration-300"
                >
                    <Terminal size={20} className="animate-pulse" /> Connect with me
                </motion.button>
            </motion.div>
        </section>
    );
}
