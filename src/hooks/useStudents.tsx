import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Student {
  id: string;
  name: string;
  image_url: string;
  score: number;
  team_name: string;
  project_link: string;
  created_at: string;
  updated_at: string;
}

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('score', { ascending: false });

      if (error) throw error;
      setStudents(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching students",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (studentData: Omit<Student, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // Clean the input data
      const cleanName = studentData.name.trim();
      const cleanTeamName = studentData.team_name.trim();
      
      console.log('Checking for duplicate:', cleanName, cleanTeamName);
      
      // Check for existing student with same name and team (case-insensitive)
      const { data: existingStudents, error: checkError } = await supabase
        .from('students')
        .select('*')
        .ilike('name', cleanName)
        .ilike('team_name', cleanTeamName);

      if (checkError) {
        console.error('Error checking for duplicates:', checkError);
        throw checkError;
      }

      console.log('Existing students found:', existingStudents);

      // If student with same name and team already exists
      if (existingStudents && existingStudents.length > 0) {
        console.log('Duplicate found, skipping:', cleanName, cleanTeamName);
        toast({
          title: "Duplicate Student",
          description: `A student named "${cleanName}" already exists in team "${cleanTeamName}".`,
          variant: "destructive",
        });
        return { data: null, error: new Error('Duplicate student') };
      }

      console.log('No duplicate found, adding student:', cleanName, cleanTeamName);

      // Insert new student if no duplicate found (use cleaned data)
      const { data, error } = await supabase
        .from('students')
        .insert([{
          ...studentData,
          name: cleanName,
          team_name: cleanTeamName
        }])
        .select()
        .single();

      if (error) {
        console.error('Error inserting student:', error);
        throw error;
      }
      
      setStudents(prev => [...prev, data]);
      toast({
        title: "Success!",
        description: "Student added successfully.",
      });
      
      return { data, error: null };
    } catch (error: any) {
      if (error.message !== 'Duplicate student') {
        console.error('Unexpected error:', error);
        toast({
          title: "Error adding student",
          description: error.message,
          variant: "destructive",
        });
      }
      return { data: null, error };
    }
  };

  const updateStudent = async (id: string, studentData: Partial<Student>) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .update(studentData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setStudents(prev => prev.map(s => s.id === id ? data : s));
      toast({
        title: "Success!",
        description: "Student updated successfully.",
      });
      
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error updating student",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setStudents(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Success!",
        description: "Student deleted successfully.",
      });
      
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error deleting student",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const deleteAllStudents = async () => {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records

      if (error) throw error;
      
      setStudents([]);
      toast({
        title: "Success!",
        description: "All students deleted successfully.",
      });
      
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error deleting students",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students,
    loading,
    fetchStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    deleteAllStudents,
  };
};
