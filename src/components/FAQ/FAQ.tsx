import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

interface FAQItemProps {
  question: string;
  answer: string;
  category: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQItem = ({ question, answer, category, isOpen, onToggle, index }: FAQItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-xl blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
      <motion.div
        className={`relative bg-dark/40 backdrop-blur-xl rounded-xl border ${
          isOpen ? 'border-primary shadow-neon' : 'border-primary/20'
        } overflow-hidden transition-all duration-300`}
      >
        <button
          onClick={onToggle}
          className="w-full p-6 flex items-center justify-between text-left"
        >
          <div className="flex-1">
            <span className="text-primary/70 text-sm font-medium mb-2 block">
              {category}
            </span>
            <h3 className="text-lg font-semibold text-light group-hover:text-primary-light transition-colors">
              {question}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`ml-4 text-primary/70 ${isOpen ? 'text-primary' : ''}`}
          >
            <FaChevronDown size={20} />
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 pb-6">
                <div className="w-full h-px bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 mb-4"></div>
                <p className="text-light/70 leading-relaxed">{answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqs = [
    {
      question: "How does the AI-powered learning assistant work?",
      answer: "Our AI learning assistant uses advanced machine learning algorithms to analyze your learning style, pace, and preferences. It continuously adapts to your progress, creating personalized learning paths and providing real-time recommendations. The system considers factors like your goals, previous experience, and performance patterns to optimize your learning journey.",
      category: "AI Technology"
    },
    {
      question: "What makes BuildSchool different from other platforms?",
      answer: "BuildSchool stands out through its unique combination of AI-driven personalization, real-world project integration, and community collaboration. Unlike traditional platforms, we offer adaptive learning paths that evolve with your progress, provide industry-relevant projects, and connect you with peers and mentors who share your interests.",
      category: "Platform Features"
    },
    {
      question: "How secure is my data on BuildSchool?",
      answer: "We implement bank-level security measures to protect your data. This includes end-to-end encryption, secure SSL connections, and regular security audits. Your personal information and learning progress are stored in encrypted databases, and we strictly follow GDPR and other international data protection regulations.",
      category: "Security"
    },
    {
      question: "Can I learn at my own pace?",
      answer: "Absolutely! BuildSchool is designed for flexible, self-paced learning. You can access the platform 24/7 and progress through your courses at a speed that suits you. The AI assistant helps optimize your learning schedule while respecting your preferred pace and time commitments.",
      category: "Learning Experience"
    },
    {
      question: "What kind of support is available?",
      answer: "We offer multiple layers of support: 24/7 AI-powered assistance for immediate help, community support through peer discussions, and dedicated human mentors for complex queries. Premium users also get access to one-on-one mentoring sessions and priority support.",
      category: "Support"
    },
    {
      question: "How do you ensure content quality?",
      answer: "Our content goes through a rigorous three-step verification process: expert review, AI-powered accuracy checks, and community feedback. We regularly update our materials to reflect industry changes and continuously improve based on learner performance data and feedback.",
      category: "Content Quality"
    }
  ];

  const categories = ['all', ...new Set(faqs.map(faq => faq.category))];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <section className="py-32 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-dark/90"></div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-semibold">
              Got Questions?
            </span>
          </motion.div>
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-light/70 max-w-2xl mx-auto">
            Find answers to common questions about BuildSchool's AI-powered learning platform
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full border ${
                activeCategory === category
                  ? 'bg-primary text-white border-primary'
                  : 'border-primary/20 text-light/70 hover:border-primary/50'
              } transition-all duration-300 whitespace-nowrap`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq, index) => (
            <FAQItem
              key={index}
              {...faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 text-center"
        >
          <p className="text-light/70">
            Still have questions?{' '}
            <a href="#contact" className="text-primary hover:text-primary-light transition-colors">
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;