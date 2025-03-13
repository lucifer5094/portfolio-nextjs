"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onLoaded }: { onLoaded: () => void }) {
    const [logs, setLogs] = useState<string[]>([]);
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [systemInfo] = useState({
        cpu: "Neural Processor X1",
        memory: "32TB Quantum Memory",
        os: "DevOS v4.2.1",
    });

    // Cursor blink effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    useEffect(() => {
        const bootLogs = [
            "> Initializing Neural Core...",
            "> Loading AI models...",
            "> Fetching system parameters...",
            "> Establishing secure connection...",
            "> Running security protocols...",
            "> Optimizing interface elements...",
            "> Boot complete! Launching interface..."
        ];

        let logIndex = 0;
        let charIndex = 0;
        let currentText = "";

        const getRandomTypingSpeed = () => Math.floor(Math.random() * 30) + 30; // 30-60ms
        const getRandomPause = () => Math.floor(Math.random() * 300) + 200; // 200-500ms

        const typeNextCharacter = () => {
            if (logIndex < bootLogs.length) {
                // Update progress based on current log progress
                const totalChars = bootLogs.join('').length;
                const charsTyped = bootLogs.slice(0, logIndex).join('').length + charIndex;
                const newProgress = Math.floor((charsTyped / totalChars) * 100);
                setProgress(newProgress);
                
                if (charIndex < bootLogs[logIndex].length) {
                    currentText += bootLogs[logIndex][charIndex];
                    setLogs((prevLogs) => [
                        ...prevLogs.slice(0, logIndex), // Keep old logs
                        currentText // Update current log with typing effect
                    ]);
                    charIndex++;
                    // Randomized typing speed for authenticity
                    setTimeout(typeNextCharacter, getRandomTypingSpeed());
                } else {
                    logIndex++;
                    charIndex = 0;
                    currentText = "";
                    // Varied delay between lines
                    setTimeout(typeNextCharacter, getRandomPause());
                }
            } else {
                setProgress(100);
                setTimeout(() => {
                    setLoadingComplete(true);
                    setTimeout(onLoaded, 1000);
                }, 600);
            }
        };

        typeNextCharacter();
    }, [onLoaded]);

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black text-green-400 font-mono text-lg z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: loadingComplete ? 0 : 1 }}
            transition={{ delay: 0.5, duration: 1 }}
        >
            <div className="p-6 bg-black/90 border-2 border-green-500/70 rounded-md shadow-lg shadow-green-500/20 w-[90%] max-w-lg">
                {/* Terminal header */}
                <div className="flex justify-between items-center mb-4 border-b border-green-500/30 pb-2">
                    <div className="text-sm opacity-80">
                        SYSTEM BOOT v3.7.2
                    </div>
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                </div>
                
                {/* System info */}
                <div className="bg-green-900/20 p-2 text-xs mb-4 rounded">
                    <div className="grid grid-cols-2 gap-1">
                        <span className="opacity-75">CPU:</span>
                        <span>{systemInfo.cpu}</span>
                        <span className="opacity-75">MEMORY:</span>
                        <span>{systemInfo.memory}</span>
                        <span className="opacity-75">OS:</span>
                        <span>{systemInfo.os}</span>
                    </div>
                </div>
                
                {/* Log output */}
                <div className="mb-4">
                    {logs.map((log, index) => (
                        <p key={index} className="opacity-90 leading-relaxed">{log}</p>
                    ))}
                    {!loadingComplete && (
                        <span className="inline-flex">
                            <span className="opacity-75">{showCursor ? "█" : " "}</span>
                        </span>
                    )}
                </div>
                
                {/* Progress bar */}
                <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                        <span>System Loading</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-green-900/30 rounded-full h-2 overflow-hidden">
                        <motion.div 
                            className="h-full bg-green-500"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "easeOut" }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
