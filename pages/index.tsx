'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectSection';
import MatrixBackground from '@/components/MatrixBackground';
import Certifications from '@/components/Certifications';
import BlogsSection from '@/components/BlogSection';
import Preloader from '@/components/Preloader';
import ContactSection from '@/components/ContactSection';
import CLI from '@/components/CLI';
import { Analytics } from "@vercel/analytics/react";

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {  } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 12000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading ? (
                <Preloader onLoaded={() => setIsLoading(false)} />
            ) : (
                <div className="min-h-screen w-full overflow-hidden transition-colors duration-500 bg-background-dark">
                    <MatrixBackground />
                    <Analytics />
                    {/* Content container with max-width to prevent overflow */}
                    <div className="relative w-full mx-auto">
                        <HeroSection />
                        <AboutSection />
                        <div id='projects' className="bg-section">
                            <ProjectsSection />
                        </div>
                        <div className="certifications bg-section">
                            <Certifications />
                        </div>
                        <div className="blogs bg-section">
                            <BlogsSection />
                        </div>
                        <div className="contact bg-section">
                            <ContactSection />
                        </div>
                    </div>

                    <CLI />
                </div>
            )}
        </>
    );
};

export default HomePage;
