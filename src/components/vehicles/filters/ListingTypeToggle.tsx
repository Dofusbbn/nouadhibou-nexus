
import { Switch } from '@/components/ui/switch';

interface ListingTypeToggleProps {
  listingType: 'sale' | 'rent';
  onChange: (checked: boolean) => void;
}

const ListingTypeToggle = ({ listingType, onChange }: ListingTypeToggleProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">
        {listingType === 'sale' ? 'For Sale' : 'For Rent'}
      </span>
      <Switch
        checked={listingType === 'rent'}
        onCheckedChange={onChange}
      />
    </div>
  );
};

export default ListingTypeToggle;
