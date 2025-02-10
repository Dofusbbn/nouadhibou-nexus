
import { Home as HomeIcon, Search, BedDouble, Bath, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { useFavorites } from '@/hooks/useFavorites';
import Pagination from '@/components/Pagination';
import FavoriteButton from '@/components/FavoriteButton';
import ShareButton from '@/components/ShareButton';
import PropertySkeleton from '@/components/PropertySkeleton';
import { useToast } from "@/hooks/use-toast";

type PropertyType = 'apartment' | 'villa' | 'office' | 'land';

const Properties = () => {
  const [filters, setFilters] = useState({
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

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const newFilters = {
      ...filters,
      [type === 'min' ? 'minPrice' : 'maxPrice']: value,
    };
    
    if (validatePriceRange(
      type === 'min' ? value : filters.minPrice,
      type === 'max' ? value : filters.maxPrice
    )) {
      setFilters(newFilters);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <HomeIcon className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Properties</h1>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Section */}
          <div className="lg:w-1/4">
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search properties..."
                      className="w-full p-2 pl-8 rounded-lg border bg-white/50"
                    />
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Sort By</label>
                  <select
                    className="w-full p-2 rounded-lg border bg-white/50"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    className="w-full p-2 rounded-lg border bg-white/50"
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as PropertyType | '' }))}
                  >
                    <option value="">All Types</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="office">Office</option>
                    <option value="land">Land</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                      className="w-1/2 p-2 rounded-lg border bg-white/50"
                      min="0"
                    />
                    <input 
                      type="number" 
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                      className="w-1/2 p-2 rounded-lg border bg-white/50"
                      min="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Bedrooms</label>
                  <select
                    className="w-full p-2 rounded-lg border bg-white/50"
                    value={filters.bedrooms}
                    onChange={(e) => setFilters(prev => ({ ...prev, bedrooms: e.target.value }))}
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Listings Grid */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <PropertySkeleton key={index} />
                ))}
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {properties?.data.map((property) => (
                    <Link
                      key={property.id}
                      to={`/properties/${property.id}`}
                      className="glass-card rounded-xl overflow-hidden hover-effect transition-transform hover:-translate-y-1 relative"
                    >
                      <div className="relative h-48">
                        <img 
                          src={property.images?.[0] || "/placeholder.svg"}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-sm">
                          {property.status}
                        </span>
                        <div className="absolute top-2 left-2 flex gap-2">
                          <FavoriteButton
                            isFavorite={isFavorite(property.id)}
                            onClick={() => toggleFavorite.mutate(property.id)}
                          />
                          <ShareButton
                            title={property.title}
                            url={window.location.origin + `/properties/${property.id}`}
                          />
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                        <p className="text-gray-600 mb-4">{property.location}</p>
                        
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
                          <span className="text-2xl font-bold text-primary">
                            ${property.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </Link>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
