'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const CLI = () => {
    const [showCli, setShowCli] = useState(false);
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState("");
    const { isDark, toggleTheme } = useTheme(); // Theme context

    const handleCommand = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        switch (command.toLowerCase().trim()) {
            case "help":
                setOutput("Available commands:\n• help - Show commands\n• projects - Jump to projects\n• certifications - Jump to Certifications\n• blogs - Jump to Latest Blogs\n• contact - Show contact info\n• toggle theme - Switch between Light/Dark mode");
                break;
            case "projects":
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                setOutput("Navigating to projects...");
                break;
            case "certifications":
                document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" });
                setOutput("Navigating to Certifications...");
                break;
            case "blogs":
                document.getElementById("blogs")?.scrollIntoView({ behavior: "smooth" });
                setOutput("Navigating to Latest Blogs...");
                break;
            case "contact":
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                setOutput("Showing contact info...");
                break;
            case "toggle theme":
                toggleTheme();
                setOutput(`Theme switched to ${isDark ? "Light" : "Dark"} mode!`);
                break;
            default:
                setOutput(`Unknown command: "${command}"\nType 'help' for a list of commands.`);
        }
        setCommand("");
    };
    return (
        <>

            <div className="fixed bottom-4 transition-all hover:scale-125 right-4 z-50 bg-gray-900 shadow-xl text-white  rounded-full">
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
                        className="fixed bottom-20 right-4 w-80 p-4 rounded-lg shadow-xl bg-gray-900"
                    >
                        <div className="font-mono text-sm">
                            <p className="text-emerald-400">$  Command Line Interface</p>
                            {output && (
                                <div className="mt-3 p-2  rounded text-gray-300 whitespace-pre-line">
                                    {output}
                                </div>
                            )}
                            <form onSubmit={handleCommand}>
                                <input
                                    type="text"
                                    value={command}
                                    onChange={(e) => setCommand(e.target.value)}
                                    placeholder="Type command..."
                                    className="w-full mt-4 p-2 rounded bg-gray-800 text-white outline-none"
                                    autoFocus
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
