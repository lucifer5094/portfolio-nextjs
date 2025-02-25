'use client';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import {
  SiPython, SiTensorflow, SiPytorch, SiNextdotjs, SiTailwindcss,
  SiKeras, SiHuggingface, SiScikitlearn, SiPandas, SiNumpy,
  SiDjango, SiReact,
  SiGithubactions, SiAmazon, SiChatbot
} from 'react-icons/si';

const techStack = [
  { icon: SiPython, name: 'Python' },
  { icon: SiTensorflow, name: 'TensorFlow' },
  { icon: SiPytorch, name: 'PyTorch' },
  { icon: SiKeras, name: 'Keras' },
  { icon: SiHuggingface, name: 'Hugging Face' },
  { icon: SiScikitlearn, name: 'scikit-learn' },
  { icon: SiPandas, name: 'Pandas' },
  { icon: SiNumpy, name: 'NumPy' },
  { icon: SiNextdotjs, name: 'Next.js' },
  { icon: SiReact, name: 'React.js' },
  { icon: SiTailwindcss, name: 'Tailwind CSS' },
  { icon: SiDjango, name: 'Django' },
  { icon: SiGithubactions, name: 'GitHub Actions' },
  { icon: SiAmazon, name: 'Amazon' },
  { icon: SiChatbot, name: 'Botpress' }
];

export default function AboutSection() {
  return (
    <section className="py-20 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Hacker-style Terminal Window */}
        <div className="rounded-xl overflow-hidden border border-emerald-500/30 bg-black/50 shadow-2xl">
          <div className="p-4 bg-emerald-900/10 border-b border-emerald-500/30 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="p-6 font-mono">
            <p className="text-emerald-400">$ whoami</p>
            <p className="mt-4 opacity-75">
              &quot;Welcome to My Digital Playground 🚀&quot; <br />
              I&apos;m Ankit Raj, an AI/ML Developer crafting intelligent, scalable, and futuristic systems. <br /><br />

              🧠 Turning raw data into real-world impact <br />
              💻 Breaking algorithms & automating the impossible <br />
              ⚡ Passionate about Deep Learning, NLP & Computer Vision <br />
              🚀 Building, optimizing, and pushing AI boundaries! <br /> <br />

              &quot;Code. Train. Deploy. Innovate.&quot; <br /> <br />

              💀 Ready to explore the future? Let’s dive in! 💀
            </p>

          </div>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-5 gap-4">
          <IconContext.Provider value={{ className: "w-12 h-12 mb-2" }}>
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border border-emerald-500/20 hover:bg-emerald-500/10 flex flex-col items-center"
              >
                <tech.icon />
                <span className="text-sm">{tech.name}</span>
              </motion.div>
            ))}
          </IconContext.Provider>
        </div>
      </div>
    </section>
  );
}