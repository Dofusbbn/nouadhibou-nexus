
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (action: 'signin' | 'signup') => {
    if (action === 'signin') {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

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
