"use client";
import { useState, useRef, useEffect, FormEvent, ChangeEvent, JSX } from "react";
import emailjs from "@emailjs/browser";
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { SiLeetcode, SiCodechef, SiHackerrank, SiCodeforces, SiHackerearth, SiKaggle, SiStackoverflow, SiWhatsapp } from "react-icons/si";

// Define proper types
interface FormData {
    name: string; // Added name field
    email: string;
    message: string;
}

interface FormStatus {
    message: string;
    isError: boolean;
}

interface SocialLink {
    href: string; // Changed to string instead of string | undefined
    icon: JSX.Element;
    color: string;
    label: string; // For accessibility
}

export default function ContactSection() {
    const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" }); // Added name
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formStatus, setFormStatus] = useState<FormStatus>({ message: "", isError: false });
    const [cooldown, setCooldown] = useState<boolean>(false);
    const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    
    // Add CSRF token protection
    const [csrfToken, setCsrfToken] = useState<string>("");
    
    // Generate CSRF token on component mount
    useEffect(() => {
        // Generate a random token for CSRF protection
        const token = Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        setCsrfToken(token);
        
        // Store token in session storage for verification
        sessionStorage.setItem('csrf_token', token);
        
        return () => {
            if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
            if (abortControllerRef.current) abortControllerRef.current.abort();
        };
    }, []);

    const validateForm = (): boolean => {
        // Name validation
        if (formData.name.trim().length < 2) {
            setFormStatus({ message: "Please enter your name ❌", isError: true });
            return false;
        }
        
        // More robust email validation with regex
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!emailRegex.test(formData.email)) {
            setFormStatus({ message: "Please enter a valid email address ❌", isError: true });
            return false;
        }

        // Message length validation and sanitization check
        const sanitizedMessage = formData.message.trim();
        if (sanitizedMessage.length < 10) {
            setFormStatus({ message: "Message should be at least 10 characters ❌", isError: true });
            return false;
        }
        
        // Check for potentially malicious content in message
        const suspiciousPatterns = [
            /<script/i,
            /javascript:/i,
            /on\w+=/i, // Detect event handlers like onclick=
            /data:/i   // Detect data URLs
        ];
        
        if (suspiciousPatterns.some(pattern => pattern.test(sanitizedMessage))) {
            setFormStatus({ 
                message: "Message contains disallowed content ❌", 
                isError: true 
            });
            return false;
        }

        return true;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        // Clear any error messages when the user starts typing
        if (formStatus.isError) {
            setFormStatus({ message: "", isError: false });
        }
        
        // Apply input sanitization by removing potentially harmful characters
        let value = e.target.value;
        if (e.target.name === "email") {
            // Limit email length for security
            value = value.slice(0, 100);
        } else if (e.target.name === "name") {
            // Limit name length for security
            value = value.slice(0, 50);
        }
        
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        
        // Reset any previous status
        setFormStatus({ message: "", isError: false });
        
        // Verify CSRF token
        const storedToken = sessionStorage.getItem('csrf_token');
        if (csrfToken !== storedToken) {
            setFormStatus({
                message: "Security verification failed. Please refresh the page and try again. ❌",
                isError: true
            });
            return;
        }
        
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
            // Include CSRF token in the payload for server verification
            const response = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
                {
                    user_name: formData.name,
                    user_email: formData.email,
                    message: formData.message,
                    csrf_token: csrfToken // Send token with the request
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
            );

            clearTimeout(timeoutId);
            
            if (response.status === 200) {
                // Generate new CSRF token after successful submission
                const newToken = Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
                    .map(b => b.toString(16).padStart(2, '0'))
                    .join('');
                setCsrfToken(newToken);
                sessionStorage.setItem('csrf_token', newToken);
                
                setFormStatus({
                    message: "Message sent successfully! I'll get back to you soon ✅",
                    isError: false
                });
                setFormData({ name: "", email: "", message: "" }); // Clear the form
                
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
        } catch (error: unknown) { // Use unknown instead of any for better type safety
            clearTimeout(timeoutId);
            
            // Handle specific error types
            if (error instanceof Error) {
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
            } else {
                // Handle case where error is not an Error instance
                setFormStatus({
                    message: "An unexpected error occurred ❌",
                    isError: true
                });
                console.error("Unknown EmailJS Error:", error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Define social links with proper accessibility and fallback URLs
    const socialLinks: SocialLink[] = [
        { href: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/lucifer5094', icon: <Github size={30} />, color: "hover:text-gray-400", label: "GitHub" },
        { href: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/lucifer5094/', icon: <Linkedin size={30} />, color: "hover:text-blue-500", label: "LinkedIn" },
        { href: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/AnkitRa55161882', icon: <Twitter size={30} />, color: "hover:text-sky-500", label: "Twitter" },
        { href: process.env.NEXT_PUBLIC_LEETCODE_URL || 'https://leetcode.com/', icon: <SiLeetcode size={30} />, color: "hover:text-yellow-500", label: "LeetCode" },
        { href: process.env.NEXT_PUBLIC_CODECHEF_URL || 'https://www.codechef.com/', icon: <SiCodechef size={30} />, color: "hover:text-orange-500", label: "CodeChef" },
        { href: process.env.NEXT_PUBLIC_HACKERRANK_URL || 'https://www.hackerrank.com/', icon: <SiHackerrank size={30} />, color: "hover:text-green-500", label: "HackerRank" },
        { href: process.env.NEXT_PUBLIC_CODEFORCES_URL || 'https://codeforces.com/', icon: <SiCodeforces size={30} />, color: "hover:text-red-500", label: "Codeforces" },
        { href: process.env.NEXT_PUBLIC_HACKEREARTH_URL || 'https://www.hackerearth.com/', icon: <SiHackerearth size={30} />, color: "hover:text-purple-500", label: "HackerEarth" },
        { href: process.env.NEXT_PUBLIC_KAGGLE_URL || 'https://www.kaggle.com/', icon: <SiKaggle size={30} />, color: "hover:text-blue-400", label: "Kaggle" },
        { href: process.env.NEXT_PUBLIC_STACKOVERFLOW_URL || 'https://stackoverflow.com/', icon: <SiStackoverflow size={30} />, color: "hover:text-orange-400", label: "Stack Overflow" },
        { href: process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/', icon: <SiWhatsapp size={30} />, color: "hover:text-green-400", label: "WhatsApp" },
    ];

    return (
        <section id="contact" className="py-20 px-4">
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
                    <h3 className="text-xl font-semibold mb-4 text-emerald-300 text-center">Connect With Me</h3>
                    
                    {/* Direct contact info */}
                    <div className="mb-6 text-center">
                        <a 
                            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || 'ankit@example.com'}`}
                            className="flex items-center justify-center gap-2 text-white hover:text-emerald-400 transition-all"
                        >
                            <Mail size={20} />
                            <span>{process.env.NEXT_PUBLIC_EMAIL || 'ankit@example.com'}</span>
                        </a>
                    </div>
                    
                    {/* Social Media Links with improved accessibility */}
                    <div className="flex flex-wrap justify-center gap-4 mt-3 mb-3">
                        {socialLinks.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-white transition-transform duration-300 transform hover:scale-125 ${item.color}`}
                                aria-label={item.label}
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
                    {/* Hidden CSRF token field */}
                    <input 
                        type="hidden" 
                        name="csrf_token" 
                        value={csrfToken} 
                    />
                    
                    {/* Name field */}
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className={`w-full p-3 rounded-lg bg-background-terminal text-white ${
                            formStatus.isError ? 'border-2 border-red-500' : ''
                        }`}
                        disabled={isSubmitting || cooldown}
                        aria-label="Your name"
                        maxLength={50}
                    />
                    
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
                        aria-label="Email address"
                        maxLength={100} // Limit input length
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
                        aria-label="Message"
                        maxLength={1000} // Limit message length
                    />
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full py-3 rounded-lg font-medium transition-colors ${
                            isSubmitting || cooldown
                                ? 'bg-gray-500 text-white cursor-not-allowed'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                        disabled={isSubmitting || cooldown}
                    >
                        {isSubmitting ? "Sending..." : cooldown ? "Message Sent" : "Send Message"}
                    </motion.button>

                    {formStatus.message && (
                        <p className={`text-center text-sm font-semibold mt-2 ${
                            formStatus.isError ? 'text-red-500' : 'text-green-500'
                        }`} role="alert">
                            {formStatus.message}
                        </p>
                    )}
                </motion.form>
            </div>
        </section>
    );
}