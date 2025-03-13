import { motion } from 'framer-motion';
import { FileCode, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import webImage from '../assets/images/web_design.png'
import pythonImage from '../assets/images/python.png';
import sqlImage from '../assets/images/sqlBasic.png';
import cssImage from '../assets/images/css.png';

const certifications = [
    {
        id: 1,
        title: 'Responsive Web Design',
        issuer: 'freeCodeCamp',
        logo: webImage,
        link: 'https://www.freecodecamp.org/certification/lucifer5094/responsive-web-design'
    },
    {
        id: 2,
        title: 'Python (Basic)',
        issuer: 'HackerRank',
        logo: pythonImage,
        link: 'https://www.hackerrank.com/certificates/6682af92e2c0'
    },
    {
        id: 3,
        title: 'SQL (Basic)',
        issuer: 'HackerRank',
        logo: sqlImage,
        link: 'https://www.hackerrank.com/certificates/de8f1fb021df',
    },
    {
        id: 4,
        title: 'CSS (Basic)',
        issuer: 'HackerRank',
        logo: cssImage,
        link: 'https://www.hackerrank.com/certificates/4c74b14781fd',
    }
];

export default function Certifications() {
    return (
        <section id='certifications' className="py-20 px-4 md:px-8 bg-gradient-to-b from-gray-950 to-gray-900">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-12 text-center font-mono text-emerald-400"
            >
                <div className="inline-flex items-center justify-center gap-3">
                    <FileCode className="animate-pulse" /> 
                    <span className="relative">
                        Certifications
                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-emerald-400/50 rounded-full"></span>
                    </span>
                </div>
            </motion.h2>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                    <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="p-6 rounded-xl shadow-lg border border-gray-800 transition-all duration-300 
                        hover:shadow-emerald-500/10 hover:border-emerald-500/20 bg-gray-900/90 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-5 mb-4">
                            <div className="relative group">
                                <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-md group-hover:bg-emerald-400/30 
                                transition-all duration-300 scale-110"></div>
                                <Image
                                    src={cert.logo}
                                    alt={cert.issuer}
                                    width={56}
                                    height={56}
                                    className="rounded-full border-2 border-emerald-400 shadow-md shadow-emerald-400/20 
                                    object-cover transition-all duration-300 hover:scale-110 hover:border-emerald-300 relative z-10"
                                />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold">{cert.title}</h3>
                                <p className="text-emerald-400 mt-1 font-medium">{cert.issuer}</p>
                            </div>
                        </div>
                        {cert.link && (
                            <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 flex items-center gap-2 w-full justify-center py-2 px-4 
                                bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 
                                border border-emerald-500/30 rounded-lg transition-all duration-300 
                                group font-medium"
                            >
                                <span>View Certificate</span>
                                <ExternalLink size={16} className="transition-transform group-hover:translate-x-1" />
                            </a>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
