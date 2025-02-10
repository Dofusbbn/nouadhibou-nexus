
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  className?: string;
}

const FavoriteButton = ({ isFavorite, onClick, className = '' }: FavoriteButtonProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate('/auth');
      return;
    }
    
    onClick();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`rounded-full ${className}`}
      onClick={handleClick}
    >
      <Heart 
        className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
      />
    </Button>
  );
};

export default FavoriteButton;
