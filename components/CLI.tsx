'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface CommandHandler {
    execute: () => void;
    description: string;
}

const CLI = () => {
    const [showCli, setShowCli] = useState(false);
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState("");

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    // Command registry for better organization and maintainability
    const commands: Record<string, CommandHandler> = {
        "help": {
            execute: () => {
                const commandsList = Object.entries(commands)
                    .map(([cmd, handler]) => `${cmd}: ${handler.description}`)
                    .join('\n');
                setOutput(`Available commands:\n${commandsList}`);
            },
            description: "Show available commands"
        },
        "about": {
            execute: () => {
                scrollToSection("about");
                setOutput("Navigating to About section...");
            },
            description: "Go to About section"
        },
        "projects": {
            execute: () => {
                scrollToSection("projects");
                setOutput("Navigating to Projects section...");
            },
            description: "Go to Projects section"
        },
        "contact": {
            execute: () => {
                scrollToSection("contact");
                setOutput("Showing contact info...");
            },
            description: "Show contact info"
        }
        // Toggle theme command removed
    };

    const handleCommand = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const trimmedCmd = command.toLowerCase().trim();
        const commandHandler = commands[trimmedCmd];
        
        if (commandHandler) {
            commandHandler.execute();
        } else {
            setOutput(`Unknown command: "${command}"\nType 'help' for a list of commands.`);
        }
        
        setCommand("");
    };

    return (
        <>
            <div className="fixed bottom-4 transition-all hover:scale-125 right-4 z-50 bg-background-terminal shadow-neon text-white rounded-full">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setShowCli(!showCli)}
                    className="p-3 rounded-full shadow-lg bg-primary"
                >
                    <Terminal size={24} />
                </motion.button>
            </div>

            <AnimatePresence>
                {showCli && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-20 right-4 w-80 p-4 rounded-lg shadow-neon terminal-bg border border-emerald-500/30"
                    >
                        <div className="font-mono text-sm">
                            <p className="text-emerald-400">$  Command Line Interface</p>
                            {output && (
                                <div className="mt-3 p-2 rounded text-gray-300 whitespace-pre-line">
                                    {output}
                                </div>
                            )}
                            <form onSubmit={handleCommand}>
                                <input
                                    type="text"
                                    value={command}
                                    onChange={(e) => setCommand(e.target.value)}
                                    className="mt-3 w-full bg-transparent text-white border-b border-emerald-500 focus:outline-none p-1 placeholder-gray-500"
                                    placeholder="Type a command..."
                                />
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CLI;
