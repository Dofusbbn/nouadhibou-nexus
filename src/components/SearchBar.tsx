
import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative glass-card rounded-full p-2 px-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center">
          <Search className="h-5 w-5 text-primary" />
          <input
            type="text"
            placeholder="Search properties or vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-transparent border-none focus:outline-none placeholder-gray-400 text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
