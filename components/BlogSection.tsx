'use client';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const blogs = [
    {
        id: 1,
        title: 'Coding the Future: Unlocking AI and Machine Learning',
        description: 'A beginner-friendly introduction to Artificial Intelligence and Machine Learning .',
        date: 'Jan 17, 2025',
        link: 'https://www.linkedin.com/pulse/coding-future-unlocking-ai-machine-learning-ankit-raj-otejc/',
    },
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

            <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6'>
                {blogs.map((blog, index) => (
                    <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className='p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 bg-gray-900 hover:bg-gray-800'
                    >
                        <h3 className='text-xl font-bold text-white'>{blog.title}</h3>
                        <p className='text-emerald-400 mt-1'>{blog.date}</p>
                        <p className='opacity-75 text-gray-300 mt-2'>{blog.description}</p>
                        <a
                            href={blog.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='mt-4 inline-block text-sm text-emerald-300 hover:underline flex items-center gap-2'
                        >
                            Read More <FaExternalLinkAlt size={14} />
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
