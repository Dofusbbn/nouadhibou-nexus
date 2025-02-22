
import { useState } from 'react';
import { Search, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (propertyType) params.append('type', propertyType);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Property type</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="office">Office</option>
                <option value="land">Land</option>
              </select>
            </div>
          </div>
          
          <div className="flex-[2]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location or Property ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-md transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
