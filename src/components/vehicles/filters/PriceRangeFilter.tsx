
interface PriceRangeFilterProps {
  minPrice: string;
  maxPrice: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}

const PriceRangeFilter = ({ minPrice, maxPrice, onMinChange, onMaxChange }: PriceRangeFilterProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Price Range</label>
      <div className="flex gap-2">
        <input 
          type="number" 
          placeholder="Min"
          value={minPrice}
          onChange={(e) => onMinChange(e.target.value)}
          className="w-1/2 p-2 rounded-lg border bg-white/50"
          min="0"
        />
        <input 
          type="number" 
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => onMaxChange(e.target.value)}
          className="w-1/2 p-2 rounded-lg border bg-white/50"
          min="0"
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
