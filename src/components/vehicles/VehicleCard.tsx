
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import FavoriteButton from '@/components/FavoriteButton';
import ShareButton from '@/components/ShareButton';
import { type Database } from '@/types';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

interface VehicleCardProps {
  vehicle: Vehicle;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const VehicleCard = ({ vehicle, isFavorite, onToggleFavorite }: VehicleCardProps) => {
  return (
    <Link
      to={`/vehicles/${vehicle.id}`}
      className="glass-card rounded-xl overflow-hidden hover-effect transition-transform hover:-translate-y-1 relative"
    >
      <div className="relative h-48">
        <img 
          src={vehicle.images?.[0] || "/placeholder.svg"}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <span className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-sm">
          {vehicle.condition}
        </span>
        <div className="absolute top-2 left-2 flex gap-2">
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={onToggleFavorite}
          />
          <ShareButton
            title={vehicle.title}
            url={window.location.origin + `/vehicles/${vehicle.id}`}
          />
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{vehicle.title}</h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{vehicle.year}</span>
          </div>
          {vehicle.mileage && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{vehicle.mileage.toLocaleString()} km</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${vehicle.price.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;
