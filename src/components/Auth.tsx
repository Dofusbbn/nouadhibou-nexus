import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigate } from 'react-router-dom';

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const { signInWithGoogle, session } = useAuth();

  if (session) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-emerald-400 to-emerald-600 p-12 flex-col justify-center text-white">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-4">
            {isSignIn ? 'Welcome Back!' : 'Welcome!'}
          </h1>
          <p className="text-lg opacity-90">
            {isSignIn 
              ? 'To keep connected with us please login with your personal info'
              : 'Join us to start exploring properties and vehicles'}
          </p>
          <Button 
            variant="outline" 
            className="mt-8 text-white border-white hover:bg-white/10"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? 'SIGN UP' : 'SIGN IN'}
          </Button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 p-12 flex flex-col justify-center items-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-emerald-600 mb-2">
              {isSignIn ? 'Sign In' : 'Create Account'}
            </h2>
            {!isSignIn && (
              <p className="text-gray-500 text-sm mb-8">
                or use your email for registration
              </p>
            )}
          </div>

          <div className="space-y-4">
            {!isSignIn && (
              <Input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2"
              />
            )}
            <Input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2"
            />
            <Input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2"
            />
          </div>

          <div className="space-y-4">
            <Button 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={signInWithGoogle}
            >
              Continue with Google
            </Button>

            {/* Mobile Toggle */}
            <Button
              variant="ghost"
              className="w-full md:hidden"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn 
                ? "Don't have an account? Sign Up" 
                : "Already have an account? Sign In"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}