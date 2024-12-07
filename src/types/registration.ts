export interface RegistrationData {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  linkedin_url: string;
  education: string;
  current_role: string;
  experience: string;
  interests: string[];
  address: string;
  latitude: number;
  longitude: number;
  photo_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: { value: string; label: string } | null;
  linkedinUrl: string;
  education: string;
  currentRole: string;
  experience: { value: string; label: string } | null;
  interests: Array<{ value: string; label: string }>;
  address: string;
  latitude: number;
  longitude: number;
  photo?: File;
}