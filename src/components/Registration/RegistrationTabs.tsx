import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { classNames } from '../../utils/classNames';

const tabs = [
  {
    icon: <FaUser />,
    title: "Profile",
    description: "Basic information and photo"
  },
  {
    icon: <FaEnvelope />,
    title: "Contact",
    description: "Contact details"
  },
  {
    icon: <FaLinkedin />,
    title: "Professional",
    description: "Work experience and skills"
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Location",
    description: "Address and map"
  }
];

interface RegistrationTabsProps {
  children: React.ReactNode;
  onTabChange?: (index: number) => void;
}

const RegistrationTabs = ({ children, onTabChange }: RegistrationTabsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
    onTabChange?.(index);
  };

  return (
    <div className="w-full">
      <Tab.Group selectedIndex={selectedIndex} onChange={handleTabChange}>
        <Tab.List className="flex space-x-4 mb-8 overflow-x-auto pb-4">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                classNames(
                  'flex-1 min-w-[200px] relative rounded-xl p-6 focus:outline-none',
                  selected
                    ? 'bg-primary/10 border-primary shadow-neon'
                    : 'bg-dark/40 hover:bg-dark/60 border-primary/20',
                  'border backdrop-blur-xl transition-all duration-300'
                )
              }
            >
              {({ selected }) => (
                <>
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className={classNames(
                      'absolute inset-0 rounded-xl transition-opacity duration-300',
                      selected ? 'opacity-20' : 'opacity-0'
                    )}>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-xl"></div>
                    </div>
                  </div>
                  <div className="relative flex flex-col items-center text-center">
                    <div className={classNames(
                      'text-2xl mb-2 transition-colors duration-300',
                      selected ? 'text-primary' : 'text-primary/50'
                    )}>
                      {tab.icon}
                    </div>
                    <div className={classNames(
                      'font-semibold mb-1 transition-colors duration-300',
                      selected ? 'text-light' : 'text-light/70'
                    )}>
                      {tab.title}
                    </div>
                    <div className="text-sm text-light/50">
                      {tab.description}
                    </div>
                    {selected && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-4 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    )}
                  </div>
                </>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <AnimatePresence mode="wait">
            {React.Children.map(children, (child, index) => (
              <Tab.Panel
                key={index}
                static
                className={classNames(
                  selectedIndex === index ? 'block' : 'hidden',
                  'focus:outline-none'
                )}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {child}
                </motion.div>
              </Tab.Panel>
            ))}
          </AnimatePresence>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default RegistrationTabs;