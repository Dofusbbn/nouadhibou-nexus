import { Home, Car, LogIn, LogOut, User, Shield, Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/useRole';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { isAdmin } = useRole();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      path: '/',
      label: 'Home',
      icon: Home,
    },
    {
      path: '/properties',
      label: 'Properties',
      icon: Home,
    },
    {
      path: '/vehicles',
      label: 'Vehicles',
      icon: Car,
    },
  ];

  if (isAdmin) {
    navItems.push({
      path: '/admin',
      label: 'Admin',
      icon: Shield,
    });
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            Nouadhibou
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => document.documentElement.classList.toggle('dark')}
                    className="rounded-full w-8 h-8"
                  >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => signOut()} className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    <span className="hidden lg:inline">Sign Out</span>
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden lg:inline">{user.email}</span>
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}

            {user ? (
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2"
                >
                  <User className="h-5 w-5" />
                  {user.email}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-start gap-2"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsMenuOpen(false)}
                className="block pt-2 border-t border-gray-200"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2"
                >
                  <LogIn className="h-5 w-5" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;