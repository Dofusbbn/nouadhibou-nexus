
import { Search } from 'lucide-react';
import { type PropertyType } from '@/types';

interface PropertyFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: {
    type: PropertyType | '';
    minPrice: string;
    maxPrice: string;
    bedrooms: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    type: PropertyType | '';
    minPrice: string;
    maxPrice: string;
    bedrooms: string;
  }>>;
  sortBy: 'price_asc' | 'price_desc' | 'newest';
  setSortBy: React.Dispatch<React.SetStateAction<'price_asc' | 'price_desc' | 'newest'>>;
  validatePriceRange: (min: string, max: string) => boolean;
}

const PropertyFilters = ({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  sortBy,
  setSortBy,
  validatePriceRange
}: PropertyFiltersProps) => {
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
  );
};

export default PropertyFilters;
