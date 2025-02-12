
interface SortSelectProps {
  value: 'price_asc' | 'price_desc' | 'newest';
  onChange: (value: 'price_asc' | 'price_desc' | 'newest') => void;
}

const SortSelect = ({ value, onChange }: SortSelectProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Sort By</label>
      <select
        className="w-full p-2 rounded-lg border bg-white/50"
        value={value}
        onChange={(e) => onChange(e.target.value as 'price_asc' | 'price_desc' | 'newest')}
      >
        <option value="newest">Newest First</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortSelect;
