
import { Filter, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import type { VehicleType } from '@/types';

interface VehicleFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: {
    type: VehicleType | '';
    minPrice: string;
    maxPrice: string;
    condition: string;
    year: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    type: VehicleType | '';
    minPrice: string;
    maxPrice: string;
    condition: string;
    year: string;
  }>>;
  sortBy: 'price_asc' | 'price_desc' | 'newest';
  setSortBy: React.Dispatch<React.SetStateAction<'price_asc' | 'price_desc' | 'newest'>>;
  validatePriceRange: (min: string, max: string) => boolean;
}

const VehicleFilters = ({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  sortBy,
  setSortBy,
  validatePriceRange
}: VehicleFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

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

  const clearFilters = () => {
    setFilters({
      type: '',
      minPrice: '',
      maxPrice: '',
      condition: '',
      year: '',
    });
    setSearchTerm('');
    setSortBy('newest');
  };

  const content = (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Search</label>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search vehicles..."
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
          onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as VehicleType | '' }))}
        >
          <option value="">All Types</option>
          <option value="car">Car</option>
          <option value="bike">Bike</option>
          <option value="truck">Truck</option>
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
        <label className="block text-sm font-medium mb-2">Condition</label>
        <select
          className="w-full p-2 rounded-lg border bg-white/50"
          value={filters.condition}
          onChange={(e) => setFilters(prev => ({ ...prev, condition: e.target.value }))}
        >
          <option value="">Any</option>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Year</label>
        <select
          className="w-full p-2 rounded-lg border bg-white/50"
          value={filters.year}
          onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
        >
          <option value="">Any</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
      </div>

      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2"
        onClick={clearFilters}
      >
        <X className="h-4 w-4" />
        Clear Filters
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <div className="mb-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 mb-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        
        {isOpen && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
            <div className="fixed inset-x-0 bottom-0 h-[85vh] bg-background p-6 rounded-t-xl shadow-lg overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {content}
              <div className="sticky bottom-0 pt-4 pb-2 bg-background">
                <Button className="w-full" onClick={() => setIsOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="lg:w-1/4">
      <div className="glass-card p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        {content}
      </div>
    </div>
  );
};

export default VehicleFilters;
