
import { BedDouble, Bath, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import FavoriteButton from '@/components/FavoriteButton';
import ShareButton from '@/components/ShareButton';
import { type Database } from '@/types';

type Property = Database['public']['Tables']['properties']['Row'];

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const PropertyCard = ({ property, isFavorite, onToggleFavorite }: PropertyCardProps) => {
  return (
    <Link
      to={`/properties/${property.id}`}
      className="glass-card rounded-xl overflow-hidden hover-effect transition-transform hover:-translate-y-1 relative"
    >
      <div className="relative h-48">
        <img 
          src={property.images?.[0] || "/placeholder.svg"}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute top-2 right-2 bg-primary/90 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {property.status}
        </span>
        <div className="absolute top-2 left-2 flex gap-2">
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={onToggleFavorite}
          />
          <ShareButton
            title={property.title}
            url={window.location.origin + `/properties/${property.id}`}
          />
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{property.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-1">{property.location}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <BedDouble className="h-4 w-4" />
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}
          {property.area && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{property.area} m²</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ${property.price.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
