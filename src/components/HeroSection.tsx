
import { useState } from 'react';
import { Search, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [listingType, setListingType] = useState<'sale' | 'rent'>('sale');
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (propertyType) params.append('type', propertyType);
    params.append('listing', listingType);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/lovable-uploads/34f503c3-aa34-4e49-b0f4-ca269a12f530.png" 
          alt="Modern building" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-primary/10 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Find Real Estate and Get Your Dream Space
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              We are a real estate agency that will help you find the best residence you dream of, let's discuss for your dream house?
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-lg p-3 shadow-lg max-w-3xl mx-auto">
            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setListingType('sale')}
                className={`px-6 py-2 rounded-md transition-colors ${
                  listingType === 'sale'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Sell
              </button>
              <button
                onClick={() => setListingType('rent')}
                className={`px-6 py-2 rounded-md transition-colors ${
                  listingType === 'rent'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Rent
              </button>
            </div>

            {/* Search Input Group */}
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
      </div>
    </div>
  );
};

export default HeroSection;
