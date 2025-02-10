
import { Home as HomeIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from "@/hooks/use-toast";
import PropertyFilters from '@/components/properties/PropertyFilters';
import PropertyList from '@/components/properties/PropertyList';
import type { PropertyType } from '@/types';

const Properties = () => {
  const [filters, setFilters] = useState({
    listingType: 'buy' as 'buy' | 'rent',
    type: '' as PropertyType | '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
  });
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'newest'>('newest');
  const { searchTerm, setSearchTerm } = useSearch('properties');
  const { currentPage, setCurrentPage, itemsPerPage, from, to } = usePagination(8);
  const { isFavorite, toggleFavorite } = useFavorites('properties');
  const { toast } = useToast();

  const { data: properties, isLoading } = useQuery({
    queryKey: ['properties', filters, sortBy, searchTerm, currentPage],
    queryFn: async () => {
      let query = supabase
        .from('properties')
        .select('*', { count: 'exact' });

      // Apply search
      if (searchTerm) {
        query = query.textSearch('search_vector', searchTerm);
      }

      // Apply filters
      if (filters.type) {
        query = query.eq('property_type', filters.type);
      }
      if (filters.minPrice) {
        query = query.gte('price', parseFloat(filters.minPrice));
      }
      if (filters.maxPrice) {
        query = query.lte('price', parseFloat(filters.maxPrice));
      }
      if (filters.bedrooms) {
        query = query.gte('bedrooms', parseInt(filters.bedrooms));
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
          title: "Error loading properties",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      return { data, count };
    },
  });

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
          <HomeIcon className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Properties</h1>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <PropertyFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            setFilters={setFilters}
            sortBy={sortBy}
            setSortBy={setSortBy}
            validatePriceRange={validatePriceRange}
          />
          
          <div className="lg:w-3/4">
            <PropertyList
              isLoading={isLoading}
              properties={properties}
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

export default Properties;
