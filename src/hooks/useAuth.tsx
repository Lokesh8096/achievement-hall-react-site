import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: any | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    console.log('Starting signup process for:', email);
    
    try {
      // First, check if user already exists by trying to sign in with a dummy password
      console.log('Checking if user already exists...');
      const { error: existingUserCheck } = await supabase.auth.signInWithPassword({
        email,
        password: 'dummy_password_for_check'
      });

      // If we get "Invalid login credentials", it means the user exists
      if (existingUserCheck && existingUserCheck.message.includes('Invalid login credentials')) {
        console.log('User already exists (detected via signin check)');
        toast({
          title: "Account already exists",
          description: "This email is already registered. Please try signing in instead.",
          variant: "destructive",
        });
        return { error: { message: "User already exists" } };
      }

      // Also check profiles table for existing email
      console.log('Checking profiles table for existing email...');
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existingProfile && !profileCheckError) {
        console.log('User already exists (detected via profiles table)');
        toast({
          title: "Account already exists",
          description: "This email is already registered. Please try signing in instead.",
          variant: "destructive",
        });
        return { error: { message: "User already exists" } };
      }
      
      // Proceed with signup
      console.log('Proceeding with signup...');
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      console.log('Signup response:', { data, error });

      if (error) {
        console.log('Signup error:', error);
        // Handle specific error cases
        if (error.message.includes('User already registered') || 
            error.message.includes('already been registered') ||
            error.message.includes('already exists') ||
            error.message.includes('already registered') ||
            error.message.includes('User already exists')) {
          toast({
            title: "Account already exists",
            description: "This email is already registered. Please try signing in instead.",
            variant: "destructive",
          });
        } else if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email not confirmed",
            description: "Please check your email and confirm your account before signing in.",
            variant: "destructive",
          });
        } else if (error.message.includes('Password should be at least')) {
          toast({
            title: "Password too short",
            description: "Password must be at least 6 characters long.",
            variant: "destructive",
          });
        } else if (error.message.includes('Invalid email')) {
          toast({
            title: "Invalid email",
            description: "Please enter a valid email address.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign up failed",
            description: error.message,
            variant: "destructive",
          });
        }
        return { error };
      }

      // Only show success if we have a user and no error
      if (data?.user && !error) {
        console.log('Signup successful, user created:', data.user.id);
        console.log('Email confirmed:', data.user.email_confirmed_at);
        console.log('Email sent to:', data.user.email);
        
        toast({
          title: "Success!",
          description: "Please check your email to confirm your account. If you don't see the email, check your spam folder.",
        });
        return { error: null };
      } else {
        // If no user was created, something went wrong
        console.log('Signup failed - no user created');
        toast({
          title: "Sign up failed",
          description: "Unable to create account. Please try again.",
          variant: "destructive",
        });
        return { error: { message: "Signup failed" } };
      }

    } catch (err) {
      console.error('Signup error:', err);
      toast({
        title: "Sign up failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error: err };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Handle specific error cases
        if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email not confirmed",
            description: "Please check your email and confirm your account before signing in.",
            variant: "destructive",
          });
        } else if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Invalid credentials",
            description: "Please check your email and password and try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign in failed",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      }

      return { error };
    } catch (err) {
      console.error('Signin error:', err);
      toast({
        title: "Sign in failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error: err };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    }
  };

  const isAdmin = profile?.role === 'admin';

  const value = {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
