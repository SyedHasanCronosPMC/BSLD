import { useState } from 'react';
import { motion } from 'framer-motion';
import PhotoUpload from '../components/PhotoUpload/PhotoUpload';
import AddressMap from '../components/GoogleMaps/AddressMap';
import { registerUser } from '../services/registrationService';

interface FormData {
  name: string;
  email: string;
  photo?: File;
  address: string;
  latitude?: number;
  longitude?: number;
}

const Registration = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    address: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await registerUser(formData);
      if (result.success) {
        // Handle successful registration
        console.log('Registration successful:', result.data);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleAddressChange = (address: string, lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      address,
      latitude: lat,
      longitude: lng
    }));
  };

  return (
    <section className="min-h-screen py-20 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-dark/90"></div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-gradient text-center">
            Join BuildSchool
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-light/70 mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-dark/50 border border-primary/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none text-light"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-light/70 mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-dark/50 border border-primary/20 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none text-light"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-light/70 mb-2">Profile Photo</label>
              <PhotoUpload
                onPhotoChange={(file) => setFormData({ ...formData, photo: file })}
                photoFile={formData.photo}
              />
            </div>

            <div>
              <label className="block text-light/70 mb-2">Location</label>
              <AddressMap
                addressValue={formData.address}
                latitude={formData.latitude}
                longitude={formData.longitude}
                onAddressChange={handleAddressChange}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold text-white shadow-neon hover:shadow-neon-strong transition-all duration-300"
            >
              Complete Registration
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Registration;