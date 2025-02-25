import { motion } from 'framer-motion';
import { FileCode } from 'lucide-react';
import webDesinImage from '../assets/images/web_design.png';
import pythonImage from '../assets/images/python.png';
import sqlImage from '../assets/images/sqlBasic.png';
import cssImage from '../assets/images/css.png';

const certifications = [
    {
        id: 1,
        title: 'Responsive Web Design',
        issuer: 'freeCodeCamp',
        logo: webDesinImage,
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
        id : 4,
        title : 'CSS (Basic)',
        issuer : 'HackerRank',
        logo : cssImage,
        link : 'https://www.hackerrank.com/certificates/4c74b14781fd',
    }
];

export default function Certifications() {
    return (
        <section id='certifications' className="py-20 px-4 md:px-8">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-4xl font-bold mb-12 text-center font-mono text-emerald-400"
            >
                <FileCode className="inline mr-2" />
                Certifications
            </motion.h2>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                    <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 bg-gray-900 hover:bg-gray-800 text-white"
                    >
                        <div className="flex items-center gap-4">
                            <img src={typeof cert.logo === 'string' ? cert.logo : cert.logo.src} alt={cert.issuer} className="w-12 h-12 rounded-full" />
                            <div>
                                <h3 className="text-xl font-bold">{cert.title}</h3>
                                <p className="text-emerald-400 mt-1">{cert.issuer}</p>
                            </div>
                        </div>
                        {cert.link && (
                            <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-block text-sm text-emerald-300 hover:underline"
                            >
                                View Certificate
                            </a>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
