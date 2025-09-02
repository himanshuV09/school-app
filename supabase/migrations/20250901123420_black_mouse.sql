/*
  # Create schools table

  1. New Tables
    - `schools`
      - `id` (int, primary key, auto-increment)
      - `name` (text, school name)
      - `address` (text, complete address)
      - `city` (text, city name)
      - `state` (text, state name)
      - `contact` (text, contact number)
      - `image` (text, image URL or path)
      - `email_id` (text, email address)
      - `created_at` (timestamp, creation date)
      - `updated_at` (timestamp, last update)

  2. Security
    - Enable RLS on `schools` table
    - Add policy for anyone to read all schools
    - Add policy for authenticated users to insert schools
    - Add policy for authenticated users to update schools

  3. Storage
    - Create storage bucket for school images
    - Set up proper policies for image uploads
*/

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact TEXT NOT NULL,
  image TEXT DEFAULT '',
  email_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view schools"
  ON schools
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert schools"
  ON schools
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update schools"
  ON schools
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create storage bucket for school images
INSERT INTO storage.buckets (id, name, public)
VALUES ('school-images', 'school-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Anyone can view school images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'school-images');

CREATE POLICY "Authenticated users can upload school images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'school-images');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_schools_city ON schools(city);
CREATE INDEX IF NOT EXISTS idx_schools_state ON schools(state);
CREATE INDEX IF NOT EXISTS idx_schools_created_at ON schools(created_at);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_schools_updated_at
    BEFORE UPDATE ON schools
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();