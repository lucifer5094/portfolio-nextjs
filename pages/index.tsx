'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectSection';
import ThemeToggle from '@/components/ThemeToggle';
import MatrixBackground from '@/components/MatrixBackground';
import Certifications from '@/components/Certifications';
import BlogsSection from '@/components/BlogSection';
import Preloader from '@/components/Preloader';
import ContactSection from '@/components/ContactSection';
import CLI from '@/components/CLI';
import { Analytics } from "@vercel/analytics/react";

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { isDark } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 12000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading ? (
                <Preloader onLoaded={() => setIsLoading(false)} />
            ) : (
                <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-background-dark' : 'light bg-background-light'}`}>
                    <MatrixBackground />
                    <Analytics />
                    <HeroSection isDark={isDark} />
                    <AboutSection />
                    <div id='projects'>
                        <ProjectsSection />
                    </div>
                    <div className="certifications">
                        <Certifications />
                    </div>
                    <div className="blogs">
                        <BlogsSection />
                    </div>
                    <div className="contact">
                        <ContactSection />
                    </div>

                    <CLI />
                    <ThemeToggle />
                </div>
            )}
        </>
    );
};

export default HomePage;
