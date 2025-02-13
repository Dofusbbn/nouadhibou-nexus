
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetPasswordMode, setResetPasswordMode] = useState(false);
  const { signIn, signUp, session } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (action: 'signin' | 'signup') => {
    if (action === 'signin') {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  const handlePasswordReset = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Check your email for the password reset link",
      });
      setResetPasswordMode(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Redirect if user is already logged in
  if (session) {
    return <Navigate to="/" replace />;
  }

  if (resetPasswordMode) {
    return (
      <Card className="w-[350px] mx-auto mt-8">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex gap-2">
              <Button className="w-full" onClick={handlePasswordReset}>
                Send Reset Link
              </Button>
              <Button variant="outline" onClick={() => setResetPasswordMode(false)}>
                Back
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[350px] mx-auto mt-8">
      <Tabs defaultValue="signin">
        <CardHeader>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          <TabsContent value="signin">
            <CardDescription className="mb-4">
              Sign in to your account to manage your listings
            </CardDescription>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="w-full" onClick={() => handleSubmit('signin')}>
                Sign In
              </Button>
              <Button
                variant="link"
                className="w-full"
                onClick={() => setResetPasswordMode(true)}
              >
                Forgot Password?
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="signup">
            <CardDescription className="mb-4">
              Create a new account to start listing properties and vehicles
            </CardDescription>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="w-full" onClick={() => handleSubmit('signup')}>
                Sign Up
              </Button>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
