-- Create students table
CREATE TABLE public.students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  team_name TEXT NOT NULL,
  project_link TEXT,
  hackathon_count INTEGER NOT NULL DEFAULT 1 CHECK (hackathon_count >= 1),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX idx_profiles_email ON public.profiles(email);

-- Enable Row Level Security
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for students table
CREATE POLICY "Anyone can view students" ON public.students FOR SELECT USING (true);

CREATE POLICY "Only admins can insert students" ON public.students 
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

CREATE POLICY "Only admins can update students" ON public.students 
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

CREATE POLICY "Only admins can delete students" ON public.students 
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- Create policies for profiles table
CREATE POLICY "Users can view their own profile" ON public.profiles 
FOR SELECT USING (auth.uid() = id);

-- Allow checking for existing users by email during signup (for unauthenticated users)
CREATE POLICY "Check existing users by email" ON public.profiles 
FOR SELECT USING (
  -- Allow if user is checking their own email or if no user is authenticated (signup flow)
  auth.uid() = id OR auth.uid() IS NULL
);

CREATE POLICY "Users can update their own profile" ON public.profiles 
FOR UPDATE USING (auth.uid() = id);

-- Create function to check if user exists by email
CREATE OR REPLACE FUNCTION public.check_user_exists(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE email = user_email
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to handle new user registration with improved duplicate handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Check if a profile already exists for this email
  IF EXISTS (SELECT 1 FROM public.profiles WHERE email = new.email) THEN
    -- If profile exists, this is a duplicate signup attempt
    -- Don't create or update anything, just log it
    RAISE NOTICE 'Duplicate signup attempt for email: %', new.email;
    
    -- Return NULL to prevent the user from being created
    RETURN NULL;
  ELSE
    -- If no profile exists, create a new one
    INSERT INTO public.profiles (id, email, role)
    VALUES (
      new.id,
      new.email,
      CASE 
        WHEN new.email = 'krovvidi.lokesh@nxtwave.co.in' THEN 'admin'
        ELSE 'user'
      END
    );
    
    -- Log the new user creation
    RAISE NOTICE 'Created new profile for email: %', new.email;
  END IF;
  RETURN new;
EXCEPTION
  WHEN unique_violation THEN
    -- Handle unique constraint violation
    RAISE NOTICE 'Unique constraint violation for email: %', new.email;
    RETURN NULL;
  WHEN OTHERS THEN
    -- Handle any other errors
    RAISE NOTICE 'Error in handle_new_user: %', SQLERRM;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert sample students data
INSERT INTO public.students (name, image_url, score, team_name, project_link, hackathon_count) VALUES
('John Doe', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 85, 'Team Alpha', 'https://example.com/project1', 1),
('Jane Smith', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', 92, 'Team Beta', 'https://example.com/project2', 2),
('Mike Johnson', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 78, 'Team Alpha', 'https://example.com/project3', 1),
('Sarah Wilson', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 96, 'Team Gamma', 'https://example.com/project4', 3),
('David Brown', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', 89, 'Team Beta', 'https://example.com/project5', 2),
('Lisa Garcia', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face', 94, 'Team Gamma', 'https://example.com/project6', 1);
