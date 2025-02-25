'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Terminal } from 'lucide-react';
import Image from 'next/image';
import avatar from '../assets/images/avatar.webp';

const facts = [
    "Did you know? The first AI program was written in 1951!",
    "AI can now generate images from text with mind-blowing accuracy!",
    "GPT models are trained on datasets with billions of words!",
    "The first neural network concept dates back to 1943!",
    "Machine learning is used in healthcare for disease prediction!"
];

export default function HeroSection({ }: { isDark: boolean }) {
    // Intro Text Rotation
    const words = ['> Hello World!', '> Welcome to My Portfolio'];
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % words.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [words.length]);

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
        <section className="relative h-screen flex flex-col items-center justify-center text-center space-y-6 z-10">
            {/* Animated Avatar */}
            <motion.div
                className="relative w-32 h-32 mx-auto mb-4"
                whileHover={{ rotateY: 15, rotateX: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 150, damping: 10 }}
            >
                <div className="rounded-full border-4 border-emerald-500 overflow-hidden">
                    <Image
                        src={avatar}
                        alt='Avatar'
                        width={128}
                        height={128}
                        priority
                    />
                </div>
            </motion.div>

            {/* Animated Text */}
            <motion.h1
                key={textIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-6xl font-bold neon-text"
            >
                {words[textIndex]}
            </motion.h1>
            <p className="text-lg md:text-xl font-mono text-emerald-300 mt-2">
                $ Engineering Smart Solutions with {'<code/>'} & {'<passion/>'}
            </p>

            {/* System Info, Time, and Facts */}
            <motion.div
                className="mt-4 flex flex-col items-center bg-black/60 text-green-300 p-4 rounded-lg w-full max-w-md font-mono text-sm md:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <p className="opacity-75">{time}</p>
                <p className="opacity-75">{systemInfo}</p>
                <p className="mt-2 opacity-90">{currentFact}</p>
            </motion.div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
                <motion.a
                    href='#projects'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-full font-mono border border-emerald-500 hover:bg-emerald-500/30"
                >
                    <Rocket size={20} /> Explore Projects
                </motion.a>
                <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-full font-mono border border-purple-500 hover:bg-purple-500/30"
                >
                    <Terminal size={20} /> Connect with me
                </motion.a>
            </div>
        </section>
    );
}
