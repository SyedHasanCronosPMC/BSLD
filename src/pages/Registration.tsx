import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRegistration } from '../services/registrationService';
import type { RegistrationData, RegistrationFormData } from '../types/registration';
import RegistrationTabs from '../components/Registration/RegistrationTabs';
import PhotoUpload from '../components/PhotoUpload/PhotoUpload';
import AddressMap from '../components/GoogleMaps/AddressMap';

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: null,
    linkedinUrl: '',
    education: '',
    currentRole: '',
    experience: null,
    interests: [],
    address: '',
    latitude: 0,
    longitude: 0,
    photo: undefined
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const registrationData: RegistrationData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country?.value || '',
        linkedin_url: formData.linkedinUrl,
        education: formData.education,
        current_role: formData.currentRole,
        experience: formData.experience?.value || '',
        interests: formData.interests.map(i => i.value),
        address: formData.address,
        latitude: formData.latitude,
        longitude: formData.longitude,
        photo_url: formData.photo ? URL.createObjectURL(formData.photo) : undefined
      };

      await createRegistration(registrationData);
      
      // Show success message and redirect
      alert('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error during registration. Please try again.');
    }
  };

  // Rest of the component implementation...
  return (
    <div className="min-h-screen bg-dark py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <RegistrationTabs>
          {/* Your tab content */}
        </RegistrationTabs>
      </div>
    </div>
  );
};

export default Registration;