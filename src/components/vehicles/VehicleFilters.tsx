import { Search } from 'lucide-react';
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
    brand: string;
    transmission: string;
    fuelType: string;
    minMileage: string;
    maxMileage: string;
    color: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    type: VehicleType | '';
    minPrice: string;
    maxPrice: string;
    condition: string;
    year: string;
    brand: string;
    transmission: string;
    fuelType: string;
    minMileage: string;
    maxMileage: string;
    color: string;
  }>>;
  sortBy: 'price_asc' | 'price_desc' | 'newest';
  setSortBy: React.Dispatch<React.SetStateAction<'price_asc' | 'price_desc' | 'newest'>>;
  validatePriceRange: (min: string, max: string) => boolean;
  validateMileageRange: (min: string, max: string) => boolean; // Added function for mileage validation
}

const VehicleFilters = ({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  sortBy,
  setSortBy,
  validatePriceRange,
  validateMileageRange // Added prop for mileage validation
}: VehicleFiltersProps) => {
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

  const handleMileageChange = (type: 'min' | 'max', value: string) => {
    const newFilters = {
      ...filters,
      [type === 'min' ? 'minMileage' : 'maxMileage']: value,
    };

    if (validateMileageRange(
      type === 'min' ? value : filters.minMileage,
      type === 'max' ? value : filters.maxMileage
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

          <div>
            <label className="block text-sm font-medium mb-2">Brand</label>
            <input
              type="text"
              value={filters.brand}
              onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
              className="w-full p-2 rounded-lg border bg-white/50"
              placeholder="Enter brand"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Transmission</label>
            <select
              className="w-full p-2 rounded-lg border bg-white/50"
              value={filters.transmission}
              onChange={(e) => setFilters(prev => ({ ...prev, transmission: e.target.value }))}
            >
              <option value="">Any</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Fuel Type</label>
            <select
              className="w-full p-2 rounded-lg border bg-white/50"
              value={filters.fuelType}
              onChange={(e) => setFilters(prev => ({ ...prev, fuelType: e.target.value }))}
            >
              <option value="">Any</option>
              <option value="gasoline">Gasoline</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mileage Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minMileage}
                onChange={(e) => handleMileageChange('min', e.target.value)}
                className="w-1/2 p-2 rounded-lg border bg-white/50"
                min="0"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxMileage}
                onChange={(e) => handleMileageChange('max', e.target.value)}
                className="w-1/2 p-2 rounded-lg border bg-white/50"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <input
              type="text"
              value={filters.color}
              onChange={(e) => setFilters(prev => ({ ...prev, color: e.target.value }))}
              className="w-full p-2 rounded-lg border bg-white/50"
              placeholder="Enter color"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleFilters;