-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    country TEXT NOT NULL,
    linkedin_url TEXT NOT NULL,
    education TEXT NOT NULL,
    current_role TEXT NOT NULL,
    experience TEXT NOT NULL,
    interests JSONB NOT NULL DEFAULT '[]',
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_registrations_updated_at
    BEFORE UPDATE ON registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_country ON registrations(country);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at);

-- Create RLS policies
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert data
CREATE POLICY "Allow anonymous insert" ON registrations
    FOR INSERT WITH CHECK (true);

-- Allow users to read their own data
CREATE POLICY "Allow individual read" ON registrations
    FOR SELECT USING (auth.uid() = id);

-- Create storage bucket for profile photos if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy to allow public read access to profile photos
CREATE POLICY "Allow public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-photos');

-- Create storage policy to allow authenticated uploads
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'profile-photos' AND
    (storage.foldername(name))[1] = 'profile-photos'
);