import { supabase } from '../lib/supabase';
import type { RegistrationData } from '../types/registration';

export const createRegistration = async (data: RegistrationData): Promise<RegistrationData> => {
  try {
    let photoUrl = data.photo_url;

    // Upload photo if exists
    if (data.photo_url && data.photo_url.startsWith('blob:')) {
      const file = await fetch(data.photo_url).then(res => res.blob());
      const fileExt = file.type.split('/')[1];
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(`public/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(`public/${fileName}`);

      photoUrl = publicUrl;
    }

    // Insert registration data
    const { data: registration, error: insertError } = await supabase
      .from('registrations')
      .insert({
        ...data,
        photo_url: photoUrl,
        interests: Array.isArray(data.interests) ? data.interests : []
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    return registration;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};