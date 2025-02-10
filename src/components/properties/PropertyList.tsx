
import PropertyCard from './PropertyCard';
import PropertySkeleton from '@/components/PropertySkeleton';
import Pagination from '@/components/Pagination';
import { type Database } from '@/types';

type Property = Database['public']['Tables']['properties']['Row'];

interface PropertyListProps {
  isLoading: boolean;
  properties?: { data: Property[]; count: number };
  isFavorite: (id: string) => boolean;
  toggleFavorite: any;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
}

const PropertyList = ({
  isLoading,
  properties,
  isFavorite,
  toggleFavorite,
  currentPage,
  setCurrentPage,
  itemsPerPage
}: PropertyListProps) => {
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <PropertySkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {properties?.data.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isFavorite={isFavorite(property.id)}
            onToggleFavorite={() => toggleFavorite.mutate(property.id)}
          />
        ))}
      </div>
      
      {properties?.count && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(properties.count / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default PropertyList;
