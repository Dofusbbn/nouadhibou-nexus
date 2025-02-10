import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative glass-card rounded-full p-2 px-6 custom-transition">
        <div className="flex items-center">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties or vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-transparent border-none focus:outline-none placeholder-gray-400"
            aria-label="Search properties and vehicles"
            role="searchbox"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;