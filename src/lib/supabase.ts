import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize storage bucket
export const initializeStorage = async () => {
  try {
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return null;
    }

    const profilePhotosBucket = buckets?.find(b => b.name === 'profile-photos');
    
    if (!profilePhotosBucket) {
      const { data, error: createError } = await supabase.storage.createBucket('profile-photos', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png'],
        fileSizeLimit: 5242880
      });

      if (createError) {
        console.error('Error creating bucket:', createError);
        return null;
      }

      return data;
    }

    return profilePhotosBucket;
  } catch (error) {
    console.error('Storage initialization error:', error);
    return null;
  }
};

export default supabase;