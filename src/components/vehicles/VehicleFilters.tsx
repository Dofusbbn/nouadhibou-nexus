
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import type { VehicleType } from '@/types';
import ListingTypeToggle from './filters/ListingTypeToggle';
import SearchInput from './filters/SearchInput';
import SortSelect from './filters/SortSelect';
import VehicleTypeSelect from './filters/VehicleTypeSelect';
import MakeModelInputs from './filters/MakeModelInputs';
import PriceRangeFilter from './filters/PriceRangeFilter';
import MileageRangeFilter from './filters/MileageRangeFilter';
import ConditionYearSelects from './filters/ConditionYearSelects';

interface VehicleFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: {
    type: VehicleType | '';
    minPrice: string;
    maxPrice: string;
    condition: string;
    year: string;
    listingType: 'sale' | 'rent';
    make: string;
    model: string;
    minMileage: string;
    maxMileage: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    type: VehicleType | '';
    minPrice: string;
    maxPrice: string;
    condition: string;
    year: string;
    listingType: 'sale' | 'rent';
    make: string;
    model: string;
    minMileage: string;
    maxMileage: string;
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
      listingType: 'sale',
      make: '',
      model: '',
      minMileage: '',
      maxMileage: ''
    });
    setSearchTerm('');
    setSortBy('newest');
  };

  const content = (
    <div className="space-y-4">
      <ListingTypeToggle
        listingType={filters.listingType}
        onChange={(checked) => setFilters(prev => ({ ...prev, listingType: checked ? 'rent' : 'sale' }))}
      />

      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
      />

      <SortSelect
        value={sortBy}
        onChange={setSortBy}
      />

      <VehicleTypeSelect
        value={filters.type}
        onChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
      />

      <MakeModelInputs
        make={filters.make}
        model={filters.model}
        onMakeChange={(value) => setFilters(prev => ({ ...prev, make: value }))}
        onModelChange={(value) => setFilters(prev => ({ ...prev, model: value }))}
      />

      <PriceRangeFilter
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        onMinChange={(value) => handlePriceChange('min', value)}
        onMaxChange={(value) => handlePriceChange('max', value)}
      />

      <MileageRangeFilter
        minMileage={filters.minMileage}
        maxMileage={filters.maxMileage}
        onMinChange={(value) => setFilters(prev => ({ ...prev, minMileage: value }))}
        onMaxChange={(value) => setFilters(prev => ({ ...prev, maxMileage: value }))}
      />

      <ConditionYearSelects
        condition={filters.condition}
        year={filters.year}
        onConditionChange={(value) => setFilters(prev => ({ ...prev, condition: value }))}
        onYearChange={(value) => setFilters(prev => ({ ...prev, year: value }))}
      />

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
