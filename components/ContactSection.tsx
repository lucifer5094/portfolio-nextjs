"use client";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { SiLeetcode, SiCodechef, SiHackerrank, SiCodeforces, SiHackerearth, SiKaggle, SiStackoverflow, SiWhatsapp } from "react-icons/si";
import { useTheme } from '@/context/ThemeContext';

export default function ContactSection() {
    const { isDark } = useTheme();
    const [formData, setFormData] = useState({ email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState({ message: "", isError: false });
    const [cooldown, setCooldown] = useState(false);
    const cooldownTimerRef = useRef(null);
    const abortControllerRef = useRef(null);
    
    // Clear any pending timers on unmount
    useEffect(() => {
        return () => {
            if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
            if (abortControllerRef.current) abortControllerRef.current.abort();
        };
    }, []);

    const validateForm = () => {
        // Email validation with regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFormStatus({ message: "Please enter a valid email address ❌", isError: true });
            return false;
        }

        // Message length validation
        if (formData.message.trim().length < 10) {
            setFormStatus({ message: "Message should be at least 10 characters ❌", isError: true });
            return false;
        }

        return true;
    };

    const handleChange = (e) => {
        // Clear any error messages when the user starts typing
        if (formStatus.isError) {
            setFormStatus({ message: "", isError: false });
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset any previous status
        setFormStatus({ message: "", isError: false });
        
        // Prevent rapid submissions
        if (cooldown) {
            setFormStatus({
                message: "Please wait a moment before sending another message ⏱️",
                isError: true
            });
            return;
        }
        
        // Validate form
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        // Create an AbortController for the request
        abortControllerRef.current = new AbortController();
        
        // Set a timeout to abort the request after 15 seconds
        const timeoutId = setTimeout(() => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
                setFormStatus({
                    message: "Request timed out. Please try again later ⏱️",
                    isError: true
                });
                setIsSubmitting(false);
            }
        }, 15000);

        try {
            const response = await emailjs.send(
                "service_4luhoc8",
                "template_e6zi93e",
                {
                    user_email: formData.email,
                    message: formData.message,
                },
                "rUBrSjAOzvAKZKd3c"
            );

            clearTimeout(timeoutId);
            
            if (response.status === 200) {
                setFormStatus({
                    message: "Message sent successfully! I'll get back to you soon ✅",
                    isError: false
                });
                setFormData({ email: "", message: "" }); // Clear the form
                
                // Set cooldown to prevent spam
                setCooldown(true);
                cooldownTimerRef.current = setTimeout(() => {
                    setCooldown(false);
                }, 30000); // 30 seconds cooldown
            } else {
                setFormStatus({
                    message: `Failed to send message (Status: ${response.status}) ❌`,
                    isError: true
                });
            }
        } catch (error) {
            clearTimeout(timeoutId);
            
            // Handle specific error types
            if (error.name === 'AbortError') {
                setFormStatus({ 
                    message: "Request was aborted. Please try again later ❌", 
                    isError: true 
                });
            } else {
                setFormStatus({
                    message: `Error: ${error.message || "Failed to send message"} ❌`,
                    isError: true
                });
                console.error("EmailJS Error:", error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-20 px-4 bg-section">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-center mb-16 text-emerald-400"
            >
                Contact Me
            </motion.h2>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="p-6 rounded-lg card-bg"
                >
                    {/* Social Media Links */}
                    <div className="flex flex-wrap gap-4 mt-6">
                        {[
                            { href: "https://github.com/lucifer5094", icon: <Github size={24} />, color: "hover:text-gray-400" },
                            { href: "https://linkedin.com/in/lucifer5094", icon: <Linkedin size={24} />, color: "hover:text-blue-500" },
                            { href: "https://x.com/AnkitRa55161882", icon: <Twitter size={24} />, color: "hover:text-sky-500" },
                            { href: "https://leetcode.com/u/lucifer5094/", icon: <SiLeetcode size={24} />, color: "hover:text-yellow-500" },
                            { href: "https://www.codechef.com/users/lucifer5094", icon: <SiCodechef size={24} />, color: "hover:text-orange-500" },
                            { href: "https://www.hackerrank.com/profile/lucifer5094", icon: <SiHackerrank size={24} />, color: "hover:text-green-500" },
                            { href: "https://codeforces.com/profile/Ankitraj5094", icon: <SiCodeforces size={24} />, color: "hover:text-red-500" },
                            { href: "https://www.hackerearth.com/@ankitraj85455", icon: <SiHackerearth size={24} />, color: "hover:text-purple-500" },
                            { href: "https://www.kaggle.com/lucifer5094", icon: <SiKaggle size={24} />, color: "hover:text-blue-400" },
                            { href: "https://stackoverflow.com/users/23595116/lucifer", icon: <SiStackoverflow size={24} />, color: "hover:text-orange-400" },
                            { href: "https://wa.me/917492092001", icon: <SiWhatsapp size={24} />, color: "hover:text-green-400" },
                        ].map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-white transition-transform duration-300 transform hover:scale-125 ${item.color}`}
                            >
                                {item.icon}
                            </a>
                        ))}
                    </div>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="w-full space-y-4"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        required
                        className={`w-full p-3 rounded-lg bg-background-terminal text-white ${
                            formStatus.isError ? 'border-2 border-red-500' : ''
                        }`}
                        disabled={isSubmitting || cooldown}
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        rows={4}
                        required
                        className={`w-full p-3 rounded-lg bg-background-terminal text-white ${
                            formStatus.isError ? 'border-2 border-red-500' : ''
                        }`}
                        disabled={isSubmitting || cooldown}
                    />
                    <motion.button
                        type="submit"
                        whileHover={{ scale: isSubmitting || cooldown ? 1 : 1.05 }}
                        className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                            isSubmitting || cooldown
                                ? 'bg-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-green-700'
                        }`}
                        disabled={isSubmitting || cooldown}
                    >
                        {isSubmitting ? "Sending..." : cooldown ? "Message Sent" : "Send Message"}
                    </motion.button>

                    {formStatus.message && (
                        <p className={`text-center text-sm font-semibold mt-2 ${
                            formStatus.isError ? 'text-red-500' : 'text-green-500'
                        }`}>
                            {formStatus.message}
                        </p>
                    )}
                </motion.form>
            </div>
        </section>
    );
}