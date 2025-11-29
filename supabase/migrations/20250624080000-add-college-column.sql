-- Add college column to students table
ALTER TABLE public.students
ADD COLUMN college TEXT;

-- Add index on college for faster filtering
CREATE INDEX idx_students_college ON public.students(college);

-- Add index on hackathon_count for faster filtering
CREATE INDEX idx_students_hackathon_count ON public.students(hackathon_count);

