
interface MakeModelInputsProps {
  make: string;
  model: string;
  onMakeChange: (value: string) => void;
  onModelChange: (value: string) => void;
}

const MakeModelInputs = ({ make, model, onMakeChange, onModelChange }: MakeModelInputsProps) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-2">Make</label>
        <input
          type="text"
          value={make}
          onChange={(e) => onMakeChange(e.target.value)}
          placeholder="Enter make..."
          className="w-full p-2 rounded-lg border bg-white/50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Model</label>
        <input
          type="text"
          value={model}
          onChange={(e) => onModelChange(e.target.value)}
          placeholder="Enter model..."
          className="w-full p-2 rounded-lg border bg-white/50"
        />
      </div>
    </>
  );
};

export default MakeModelInputs;
