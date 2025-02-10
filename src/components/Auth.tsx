
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navigate } from 'react-router-dom';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);
  const { signIn, signUp, signInWithGoogle, resetPassword, session } = useAuth();

  const handleSubmit = async (action: 'signin' | 'signup' | 'reset') => {
    switch (action) {
      case 'signin':
        await signIn(email, password);
        break;
      case 'signup':
        await signUp(email, password);
        break;
      case 'reset':
        await resetPassword(email);
        setIsResetMode(false);
        break;
    }
  };

  if (session) {
    return <Navigate to="/" replace />;
  }

  if (isResetMode) {
    return (
      <Card className="w-[350px] mx-auto mt-8">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Enter your email to reset your password</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="w-full" onClick={() => handleSubmit('reset')}>
              Send Reset Instructions
            </Button>
            <Button variant="link" className="w-full" onClick={() => setIsResetMode(false)}>
              Back to Sign In
            </Button>
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
              Sign in to your account
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
              <Button variant="outline" className="w-full" onClick={signInWithGoogle}>
                Sign in with Google
              </Button>
              <Button variant="link" className="w-full" onClick={() => setIsResetMode(true)}>
                Forgot Password?
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="signup">
            <CardDescription className="mb-4">
              Create a new account
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
              <Button variant="outline" className="w-full" onClick={signInWithGoogle}>
                Sign up with Google
              </Button>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
