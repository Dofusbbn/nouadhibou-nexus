
import { Car } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from "@/hooks/use-toast";
import VehicleFilters from '@/components/vehicles/VehicleFilters';
import VehicleList from '@/components/vehicles/VehicleList';
import type { VehicleType } from '@/types';

const Vehicles = () => {
  const [filters, setFilters] = useState({
    listingType: 'buy' as 'buy' | 'rent',
    type: '' as VehicleType | '',
    minPrice: '',
    maxPrice: '',
    condition: '',
    year: '',
    brand: '',
    transmission: '',
    fuelType: '',
    minMileage: '',
    maxMileage: '',
    color: '',
  });
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'newest'>('newest');
  const { searchTerm, setSearchTerm } = useSearch('vehicles');
  const { currentPage, setCurrentPage, itemsPerPage, from, to } = usePagination(8);
  const { isFavorite, toggleFavorite } = useFavorites('vehicles');
  const { toast } = useToast();

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['vehicles', filters, sortBy, searchTerm, currentPage],
    queryFn: async () => {
      let query = supabase
        .from('vehicles')
        .select('*', { count: 'exact' });

      // Apply search
      if (searchTerm) {
        query = query.textSearch('search_vector', searchTerm);
      }

      // Apply filters
      query = query.eq('listing_type', filters.listingType);
      if (filters.type) {
        query = query.eq('vehicle_type', filters.type);
      }
      if (filters.minPrice) {
        query = query.gte('price', parseFloat(filters.minPrice));
      }
      if (filters.maxPrice) {
        query = query.lte('price', parseFloat(filters.maxPrice));
      }
      if (filters.condition) {
        query = query.eq('condition', filters.condition);
      }
      if (filters.year) {
        query = query.eq('year', parseInt(filters.year));
      }
      if (filters.brand) {
        query = query.ilike('brand', `%${filters.brand}%`);
      }
      if (filters.transmission) {
        query = query.eq('transmission', filters.transmission);
      }
      if (filters.fuelType) {
        query = query.eq('fuel_type', filters.fuelType);
      }
      if (filters.minMileage) {
        query = query.gte('mileage', parseFloat(filters.minMileage));
      }
      if (filters.maxMileage) {
        query = query.lte('mileage', parseFloat(filters.maxMileage));
      }
      if (filters.color) {
        query = query.ilike('color', `%${filters.color}%`);
      }

      // Apply sorting
      switch (sortBy) {
        case 'price_asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
      }

      // Apply pagination
      query = query.range(from, to - 1);

      const { data, error, count } = await query;
      if (error) {
        toast({
          title: "Error loading vehicles",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      return { data, count };
    },
  });

  const validateMileageRange = (min: string, max: string) => {
    const minMileage = parseFloat(min);
    const maxMileage = parseFloat(max);
    
    if (minMileage && maxMileage && minMileage > maxMileage) {
      toast({
        title: "Invalid mileage range",
        description: "Minimum mileage cannot be greater than maximum mileage",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validatePriceRange = (min: string, max: string) => {
    const minPrice = parseFloat(min);
    const maxPrice = parseFloat(max);
    
    if (minPrice && maxPrice && minPrice > maxPrice) {
      toast({
        title: "Invalid price range",
        description: "Minimum price cannot be greater than maximum price",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Car className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Vehicles</h1>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <VehicleFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            setFilters={setFilters}
            sortBy={sortBy}
            setSortBy={setSortBy}
            validatePriceRange={validatePriceRange}
            validateMileageRange={validateMileageRange}
          />
          
          <div className="lg:w-3/4">
            <VehicleList
              isLoading={isLoading}
              vehicles={vehicles}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
