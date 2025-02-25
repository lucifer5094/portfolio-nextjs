"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { SiLeetcode, SiCodechef, SiHackerrank, SiCodeforces, SiHackerearth, SiKaggle, SiStackoverflow, SiWhatsapp } from "react-icons/si";
import { useTheme } from '@/context/ThemeContext';

export default function ContactSection() {
    const { isDark } = useTheme();
    const [formData, setFormData] = useState({ email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

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

            if (response.status === 200) {
                setSuccessMessage("Message sent successfully! ✅");
                setFormData({ email: "", message: "" }); // Clear the form
            } else {
                setSuccessMessage("Failed to send message. ❌");
            }
        } catch (error) {
            setSuccessMessage("Error sending message. ❌");
            console.error("EmailJS Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-20 px-4 md:px-8">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-4xl font-bold mb-12 text-center font-mono"
            >
                Let&apos;s Connect
            </motion.h2>



            <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">

                {/* Social Media Links */}
                <div className="flex gap-4 mt-6">
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer"><Github size={24} /></a>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"><Linkedin size={24} /></a>
                    <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer"><Twitter size={24} /></a>
                    <a href="https://leetcode.com/yourusername" target="_blank" rel="noopener noreferrer"><SiLeetcode size={24} /></a>
                    <a href="https://www.codechef.com/users/yourusername" target="_blank" rel="noopener noreferrer"><SiCodechef size={24} /></a>
                    <a href="https://www.hackerrank.com/yourusername" target="_blank" rel="noopener noreferrer"><SiHackerrank size={24} /></a>
                    <a href="https://codeforces.com/profile/yourusername" target="_blank" rel="noopener noreferrer"><SiCodeforces size={24} /></a>
                    <a href="https://www.hackerearth.com/@yourusername" target="_blank" rel="noopener noreferrer"><SiHackerearth size={24} /></a>
                    <a href="https://www.kaggle.com/yourusername" target="_blank" rel="noopener noreferrer"><SiKaggle size={24} /></a>
                    <a href="https://stackoverflow.com/users/youruserid/yourusername" target="_blank" rel="noopener noreferrer"><SiStackoverflow size={24} /></a>
                    <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer"><SiWhatsapp size={24} /></a>
                </div>

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
                        className={`w-full p-3 rounded-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        rows={4}
                        required
                        className={`w-full p-3 rounded-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                    />
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        className={`w-full py-3 rounded-lg font-bold ${isDark ? 'bg-primary hover:bg-primary-dark' : 'bg-secondary hover:bg-secondary-dark'}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </motion.button>

                    {successMessage && (
                        <p className="text-center text-sm font-semibold mt-2">{successMessage}</p>
                    )}
                </motion.form>


            </div>
        </section>
    );
}
