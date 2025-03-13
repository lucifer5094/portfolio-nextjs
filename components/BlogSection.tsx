'use client';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaClock, FaTag } from 'react-icons/fa';

import WevImage from '../assets/images/wev_dev_evolv.png';

const blogs = [
    {
        id: 1,
        title: 'Coding the Future: Unlocking AI and Machine Learning',
        description: 'A beginner-friendly introduction to Artificial Intelligence and Machine Learning concepts, tools, and practical applications for developers.',
        date: 'Jan 17, 2023',
        link: 'https://www.linkedin.com/pulse/coding-future-unlocking-ai-machine-learning-ankit-raj-otejc/',
        image: '/blog-ai-ml.jpg',
        readTime: '15 min',
        tags: ['AI', 'Machine Learning']
    },
    {
        id: 2,
        title: 'The Evolving Landscape of Web Development',
        description: 'A brief introduction about Web Development evolves',
        date: 'Jan 17 2024',
        link: 'https://www.linkedin.com/pulse/title-evolving-landscape-web-development-trends-technologies-raj-e8scc/?trackingId=M8lU%2BMYDQmSnTkVwmCA6mw%3D%3D',
        image: { WevImage },
        readTime: '10min',
        tags: ['Web']

    }
];

export default function BlogsSection() {
    return (
        <section id='blogs' className='py-20 px-4 md:px-8'>
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className='text-4xl font-bold mb-12 text-center font-mono text-emerald-400'
            >
                {'$ Blogs'}
            </motion.h2>

            <div className='max-w-6xl mx-auto flex flex-col gap-8'>
                {blogs.map((blog, index) => (
                    <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className='p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 card-bg flex flex-col w-full'
                    >
                        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                            <div className="absolute inset-0 bg-emerald-600/20 backdrop-blur-sm flex items-center justify-center">
                                <span className="text-emerald-400 font-bold">{blog.title.split(':')[0]}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                            <p className='text-emerald-400 text-sm'>{blog.date}</p>
                            <div className="flex items-center text-gray-400 text-sm">
                                <FaClock className="mr-1" size={12} />
                                <span>{blog.readTime}</span>
                            </div>
                        </div>

                        <h3 className='text-xl font-bold text-white mb-2 hover:text-emerald-300 transition-colors'>{blog.title}</h3>

                        <p className='opacity-75 text-gray-300 mb-4 flex-grow'>{blog.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {blog.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-gray-800 text-xs rounded-full text-emerald-300 flex items-center">
                                    <FaTag size={10} className="mr-1" />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <a
                            href={blog.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='mt-auto inline-block text-sm font-medium text-emerald-300 hover:text-emerald-100 transition-colors flex items-center gap-2 group'
                        >
                            Read More <FaExternalLinkAlt size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-12">
                <a
                    href="https://www.linkedin.com/in/lucifer5094/recent-activity/posts/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 rounded-lg border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all duration-300"
                >
                    View All Posts
                </a>
            </div>
        </section>
    );
}
