
interface MileageRangeFilterProps {
  minMileage: string;
  maxMileage: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}

const MileageRangeFilter = ({ minMileage, maxMileage, onMinChange, onMaxChange }: MileageRangeFilterProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Mileage Range (km)</label>
      <div className="flex gap-2">
        <input 
          type="number" 
          placeholder="Min"
          value={minMileage}
          onChange={(e) => onMinChange(e.target.value)}
          className="w-1/2 p-2 rounded-lg border bg-white/50"
          min="0"
        />
        <input 
          type="number" 
          placeholder="Max"
          value={maxMileage}
          onChange={(e) => onMaxChange(e.target.value)}
          className="w-1/2 p-2 rounded-lg border bg-white/50"
          min="0"
        />
      </div>
    </div>
  );
};

export default MileageRangeFilter;
