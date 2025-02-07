
import { Home as HomeIcon, Search, BedDouble, Bath, MapPin } from 'lucide-react';

const Properties = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <HomeIcon className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Properties</h1>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Section */}
          <div className="lg:w-1/4">
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select className="w-full p-2 rounded-lg border bg-white/50">
                    <option value="">All Types</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="office">Office</option>
                    <option value="land">Land</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      placeholder="Min"
                      className="w-1/2 p-2 rounded-lg border bg-white/50"
                    />
                    <input 
                      type="number" 
                      placeholder="Max"
                      className="w-1/2 p-2 rounded-lg border bg-white/50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Bedrooms</label>
                  <select className="w-full p-2 rounded-lg border bg-white/50">
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Listings Grid */}
          <div className="lg:w-3/4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sample Property Card */}
              <div className="glass-card rounded-xl overflow-hidden hover-effect">
                <div className="relative h-48">
                  <img 
                    src="/placeholder.svg" 
                    alt="Property" 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-sm">
                    For Sale
                  </span>
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">Modern Apartment</h3>
                  <p className="text-gray-600 mb-4">Nouadhibou City Center</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <BedDouble className="h-4 w-4" />
                      <span>3 Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <span>2 Baths</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>150 m²</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">$250,000</span>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
