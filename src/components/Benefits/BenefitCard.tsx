import { motion } from 'framer-motion';

interface BenefitCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  image: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  index: number;
}

const BenefitCard = ({ icon, title, description, image, stats, index }: BenefitCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      <div className="relative bg-dark/40 backdrop-blur-xl rounded-2xl border border-primary/20 shadow-lg hover:shadow-neon transition-all duration-500 overflow-hidden">
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/20 to-dark/90"></div>
        </div>
        <div className="p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-2 text-gradient">{title}</h3>
          <p className="text-light/70 mb-4 leading-relaxed">{description}</p>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-light/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BenefitCard;