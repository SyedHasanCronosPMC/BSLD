import Hero from '../components/Hero/Hero';
import Benefits from '../components/Benefits/Benefits';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Testimonials from '../components/Testimonials/Testimonials';
import Pricing from '../components/Pricing/Pricing';
import Founders from '../components/Founders/Founders';
import FAQ from '../components/FAQ/FAQ';

function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Founders />
      <FAQ />
    </div>
  );
}

export default Home;