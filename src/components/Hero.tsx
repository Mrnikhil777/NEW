import { Bot, Sparkles, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] pt-24 pb-16 px-4 bg-gradient-to-b from-indigo-50/50 to-white overflow-hidden">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto text-center"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center bg-indigo-50 rounded-full px-4 py-2 mb-8">
          <Sparkles className="h-4 w-4 text-indigo-600 mr-2" />
          <span className="text-sm text-indigo-600">Expert AI Development Assistant</span>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
        >
          Your Expert AI Developer Companion
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          I'm MyCoder, your AI development assistant with expertise across multiple programming languages, 
          frameworks, and best practices. Let's build something amazing together.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
        >
          <button 
            onClick={() => document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' })}
            className="group bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-all hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="flex items-center justify-center">
              <Bot className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              Explore My Capabilities
            </span>
          </button>
          <button 
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="group border-2 border-gray-200 text-gray-700 px-8 py-3 rounded-full hover:border-indigo-600 hover:text-indigo-600 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="flex items-center justify-center">
              <Code className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
              See Features
            </span>
          </button>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2000&q=80" 
            alt="Code editor preview" 
            className="rounded-xl shadow-2xl mx-auto transform hover:scale-[1.02] transition-transform duration-500"
            loading="lazy"
            width="2000"
            height="1000"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}