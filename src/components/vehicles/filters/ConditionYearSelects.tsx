
interface ConditionYearSelectsProps {
  condition: string;
  year: string;
  onConditionChange: (value: string) => void;
  onYearChange: (value: string) => void;
}

const ConditionYearSelects = ({ condition, year, onConditionChange, onYearChange }: ConditionYearSelectsProps) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-2">Condition</label>
        <select
          className="w-full p-2 rounded-lg border bg-white/50"
          value={condition}
          onChange={(e) => onConditionChange(e.target.value)}
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
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
        >
          <option value="">Any</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
      </div>
    </>
  );
};

export default ConditionYearSelects;
