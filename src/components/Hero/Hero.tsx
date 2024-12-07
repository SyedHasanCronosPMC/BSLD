import { useState } from 'react';
import { FaPlay, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import HeroImages from './HeroImages';
import WaitlistForm from '../WaitlistForm/WaitlistForm';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const companies = [
    {
      name: "TechCorp",
      logo: "https://replicate.delivery/pbxt/MJh3XFuBkPWoZPkqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png"
    },
    {
      name: "InnovateLabs",
      logo: "https://replicate.delivery/pbxt/NJi4XFuBkPWoZPkqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png"
    },
    {
      name: "FutureLearn",
      logo: "https://replicate.delivery/pbxt/OJj5XFuBkPWoZPkqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png"
    },
    {
      name: "AIAcademy",
      logo: "https://replicate.delivery/pbxt/PJk6XFuBkPWoZPkqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png"
    }
  ];

  return (
    <section className="relative min-h-screen bg-dark overflow-hidden">
      <WaitlistForm isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-dark/90"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * -500],
              opacity: [0.7, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="z-10"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-semibold">
                The Future of Learning is Here
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-6xl font-bold mb-6 leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-primary to-secondary">
                Transform Your Learning
              </span>
              <br />
              <span className="text-light">
                with AI-Powered Education
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl mb-8 text-light/80 max-w-xl"
            >
              Join the next generation of learners using AI to accelerate their growth and connect with a global community of innovators.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => setIsWaitlistOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-semibold text-white shadow-neon hover:shadow-neon-strong transition-all duration-300 flex items-center gap-2 group"
              >
                Join the Waitlist
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="px-8 py-4 border border-primary/20 rounded-full font-semibold text-white hover:bg-primary/10 transition-all duration-300 flex items-center gap-2 group"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaPlay className="text-white ml-1" size={12} />
                  </div>
                  Watch Demo
                </button>
              )}
            </motion.div>
          </motion.div>
          
          <div className="relative h-[600px]">
            {isPlaying ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-dark/50 rounded-2xl overflow-hidden backdrop-blur-xl border border-primary/20 shadow-neon"
              >
                <video
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  src="/demo-video.mp4"
                  poster="https://replicate.delivery/pbxt/QJl7XFuBkPWoZPkqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png"
                >
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            ) : (
              <HeroImages />
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <p className="text-center text-light/60 mb-8">Trusted by learners from leading companies</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {companies.map((company, index) => (
              <motion.img
                key={index}
                src={company.logo}
                alt={company.name}
                className="h-12 opacity-50 hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;