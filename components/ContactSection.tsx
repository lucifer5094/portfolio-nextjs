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
                        className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${isSubmitting
                            ? 'bg-gray-500 cursor-not-allowed'
                            : isDark
                                ? 'bg-blue-600 hover:bg-green-700'
                                : 'bg-blue-600 hover:bg-green-700'
                            }`}
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