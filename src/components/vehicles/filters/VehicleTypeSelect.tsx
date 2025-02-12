
import type { VehicleType } from '@/types';

interface VehicleTypeSelectProps {
  value: VehicleType | '';
  onChange: (value: VehicleType | '') => void;
}

const VehicleTypeSelect = ({ value, onChange }: VehicleTypeSelectProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Type</label>
      <select
        className="w-full p-2 rounded-lg border bg-white/50"
        value={value}
        onChange={(e) => onChange(e.target.value as VehicleType | '')}
      >
        <option value="">All Types</option>
        <option value="car">Car</option>
        <option value="bike">Bike</option>
        <option value="truck">Truck</option>
      </select>
    </div>
  );
};

export default VehicleTypeSelect;
