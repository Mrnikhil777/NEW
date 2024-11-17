import { useState } from 'react';
import { Terminal, Play, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const examples = [
  {
    title: "React Component",
    code: `function Button({ children, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 
        text-white rounded hover:bg-blue-600"
    >
      {children}
    </button>
  );
}`
  },
  {
    title: "API Endpoint",
    code: `app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .limit(10);
    res.json(users);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch users' 
    });
  }
});`
  },
  {
    title: "Data Structure",
    code: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }
}`
  }
];

export default function LiveDemo() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [copied, setCopied] = useState(false);
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

  const copyCode = async () => {
    await navigator.clipboard.writeText(examples[selectedExample].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="examples" className="py-20 bg-gray-50">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-4"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Live Demo</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience my coding capabilities firsthand with these interactive examples.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex space-x-1 p-4">
                {examples.map((example, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedExample(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedExample === index
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {example.title}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-900 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-400">Code Example</span>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyCode}
                    className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-400">
                      {copied ? 'Copied!' : 'Copy'}
                    </span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  >
                    <Play className="h-4 w-4" />
                    <span className="text-sm">Run</span>
                  </motion.button>
                </div>
              </div>
              <motion.pre
                key={selectedExample}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="overflow-x-auto p-4 rounded-lg bg-gray-800"
              >
                <code className="text-sm font-mono">{examples[selectedExample].code}</code>
              </motion.pre>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}