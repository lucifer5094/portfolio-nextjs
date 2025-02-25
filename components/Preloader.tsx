"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onLoaded }: { onLoaded: () => void }) {
    const [logs, setLogs] = useState<string[]>([]);
    const [loadingComplete, setLoadingComplete] = useState(false);



    useEffect(() => {
        
        const bootLogs = [
            "> Initializing Neural Core...",
            "> Loading AI models...",
            "> Fetching system parameters...",
            "> Establishing secure connection...",
            "> Boot complete! Launching interface..."
        ];

        let logIndex = 0;
        let charIndex = 0;
        let currentText = "";

        const typeNextCharacter = () => {
            if (logIndex < bootLogs.length) {
                if (charIndex < bootLogs[logIndex].length) {
                    currentText += bootLogs[logIndex][charIndex];
                    setLogs((prevLogs) => [
                        ...prevLogs.slice(0, logIndex), // Keep old logs
                        currentText // Update current log with typing effect
                    ]);
                    charIndex++;
                    setTimeout(typeNextCharacter, 50); // Typing speed
                } else {
                    logIndex++;
                    charIndex = 0;
                    currentText = "";
                    setTimeout(typeNextCharacter, 500); // Delay between lines
                }
            } else {
                setTimeout(() => {
                    setLoadingComplete(true);
                    setTimeout(onLoaded, 1000);
                }, 1000);
            }
        };

        typeNextCharacter();
    }, [ onLoaded]);

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black text-green-400 font-mono text-lg"
            initial={{ opacity: 1 }}
            animate={{ opacity: loadingComplete ? 0 : 1 }}
            transition={{ delay: 0.5, duration: 1 }}
        >
            <div className="p-6 bg-black/80 border border-green-400 rounded-lg shadow-lg w-[90%] max-w-lg">
                {logs.map((log, index) => (
                    <p key={index} className="opacity-75">{log}</p>
                ))}
                {!loadingComplete && <p className="opacity-75">█</p>}
            </div>
        </motion.div>
    );
}
