
import VehicleCard from './VehicleCard';
import VehicleSkeleton from '@/components/VehicleSkeleton';
import Pagination from '@/components/Pagination';
import { type Database } from '@/types';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

interface VehicleListProps {
  isLoading: boolean;
  vehicles?: { data: Vehicle[]; count: number };
  isFavorite: (id: string) => boolean;
  toggleFavorite: any;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
}

const VehicleList = ({
  isLoading,
  vehicles,
  isFavorite,
  toggleFavorite,
  currentPage,
  setCurrentPage,
  itemsPerPage
}: VehicleListProps) => {
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <VehicleSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {vehicles?.data.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            isFavorite={isFavorite(vehicle.id)}
            onToggleFavorite={() => toggleFavorite.mutate(vehicle.id)}
          />
        ))}
      </div>
      
      {vehicles?.count && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(vehicles.count / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default VehicleList;
