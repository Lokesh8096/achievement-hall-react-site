import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const { user, signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions
    
    setLoading(true);
    const result = await signIn(email, password);
    setLoading(false);
    
    // Clear form on successful sign in
    if (!result.error) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    console.log('Attempting signup for email:', email);
    
    const result = await signUp(email, password);
    
    console.log('Signup result:', result);
    
    setLoading(false);
    
    // Only show success if there's no error
    if (!result.error) {
      setSignupSuccess(true);
      // Clear form on successful signup
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      // Keep the form data so user can try again or sign in
      console.log('Signup error:', result.error);
      // Don't show success message - the error is already handled by the toast in useAuth
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setSignupSuccess(false);
  };

  const testEmailConfiguration = async () => {
    const testEmail = `test-${Date.now()}@example.com`;
    console.log('Testing email configuration with:', testEmail);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: 'testpassword123',
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      
      console.log('Test signup result:', { data, error });
      
      if (error) {
        alert(`Test signup failed: ${error.message}`);
      } else if (data?.user) {
        alert(`Test signup successful!\nUser ID: ${data.user.id}\nEmail: ${data.user.email}\nEmail confirmed: ${data.user.email_confirmed_at ? 'Yes' : 'No'}\n\nCheck if you received a confirmation email.`);
      } else {
        alert('Test signup completed but no user data returned');
      }
    } catch (err) {
      console.error('Test email error:', err);
      alert('Test email error: ' + err);
    }
  };

  const checkEmailSettings = async () => {
    try {
      // Check current session to see if we can access Supabase settings
      const { data: { session } } = await supabase.auth.getSession();
      
      let message = 'Email Configuration Check:\n\n';
      message += `Current URL: ${window.location.origin}\n`;
      message += `Supabase URL: ${supabase.supabaseUrl}\n`;
      message += `Session: ${session ? 'Active' : 'None'}\n\n`;
      
      // Try to get some basic info about the project
      message += 'To fix email issues:\n';
      message += '1. Check Supabase Dashboard > Authentication > Settings\n';
      message += '2. Verify SMTP settings are configured\n';
      message += '3. Check if emails are being sent to spam\n';
      message += '4. Verify redirect URLs are correct\n';
      message += '5. Check if email confirmations are enabled\n\n';
      
      message += 'Common issues:\n';
      message += '- SMTP not configured in Supabase\n';
      message += '- Email confirmations disabled\n';
      message += '- Incorrect redirect URLs\n';
      message += '- Emails going to spam folder\n';
      
      alert(message);
    } catch (err) {
      console.error('Email settings check error:', err);
      alert('Error checking email settings: ' + err);
    }
  };

  const debugCheckUser = async () => {
    if (!email) {
      alert('Please enter an email first');
      return;
    }
    
    console.log('Debug: Checking for user with email:', email);
    
    try {
      // Check profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email);
      
      console.log('Profiles table check:', { profileData, profileError });
      
      // Try to sign in with dummy password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: 'dummy_password'
      });
      
      console.log('Sign in check:', { signInError });
      
      // Test email configuration by attempting a signup with a test email
      const testEmail = `test-${Date.now()}@example.com`;
      console.log('Testing email configuration with:', testEmail);
      
      const { data: testSignupData, error: testSignupError } = await supabase.auth.signUp({
        email: testEmail,
        password: 'testpassword123',
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      
      console.log('Test signup result:', { testSignupData, testSignupError });
      
      let debugMessage = `Debug Results:\n`;
      debugMessage += `Profiles: ${profileData?.length || 0} records\n`;
      debugMessage += `SignIn Error: ${signInError?.message || 'None'}\n`;
      debugMessage += `Test Signup: ${testSignupError ? 'Failed' : 'Success'}\n`;
      if (testSignupError) {
        debugMessage += `Test Error: ${testSignupError.message}\n`;
      } else if (testSignupData?.user) {
        debugMessage += `Test User Created: ${testSignupData.user.id}\n`;
        debugMessage += `Email Confirmed: ${testSignupData.user.email_confirmed_at ? 'Yes' : 'No'}\n`;
      }
      
      alert(debugMessage);
      
    } catch (err) {
      console.error('Debug error:', err);
      alert('Debug error: ' + err);
    }
  };

  return (
    <div className="min-h-screen bg-[#172134] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Hall of Fame</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full" onValueChange={resetForm}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
              <div className="text-center mt-2">
                <a href="/forgot-password" className="text-blue-600 hover:underline text-sm">Forgot Password?</a>
              </div>
            </TabsContent>
            
            <TabsContent value="signup">
              {signupSuccess ? (
                <div className="text-center space-y-4">
                  <div className="text-green-600 text-lg font-semibold">
                    Check Your Email!
                  </div>
                  <p className="text-gray-600">
                    We've sent a confirmation link to your email address. 
                    Please check your inbox and click the link to activate your account.
                  </p>
                  <p className="text-sm text-gray-500">
                    Don't see the email? Check your spam folder.
                  </p>
                  <Button 
                    onClick={resetForm} 
                    variant="outline" 
                    className="w-full"
                  >
                    Try Another Email
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pr-10"
                        disabled={loading}
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        disabled={loading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="pr-10"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        disabled={loading}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </Button>
                  
                 
                </form>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
