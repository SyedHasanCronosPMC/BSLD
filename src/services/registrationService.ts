import { supabase } from '../lib/supabase';

interface RegistrationData {
  name: string;
  email: string;
  photo?: File;
  address?: string;
  latitude?: number;
  longitude?: number;
}

export const registerUser = async (data: RegistrationData) => {
  try {
    // First, create the user record
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          name: data.name,
          email: data.email,
          address: data.address,
          latitude: data.latitude,
          longitude: data.longitude
        }
      ])
      .select()
      .single();

    if (userError) throw userError;

    // If there's a photo, upload it
    if (data.photo) {
      const fileExt = data.photo.name.split('.').pop();
      const fileName = `${userData.id}-${Math.random()}.${fileExt}`;
      const filePath = `profile-photos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(filePath, data.photo);

      if (uploadError) throw uploadError;

      // Update user with photo URL
      const { error: updateError } = await supabase
        .from('users')
        .update({ photo_url: filePath })
        .eq('id', userData.id);

      if (updateError) throw updateError;
    }

    return { success: true, data: userData };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error };
  }
};
