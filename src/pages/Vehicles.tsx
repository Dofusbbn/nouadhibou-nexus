
import { Car, Calendar, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

const Vehicles = () => {
  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Car className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Vehicles</h1>
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
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="truck">Truck</option>
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
                  <label className="block text-sm font-medium mb-2">Condition</label>
                  <select className="w-full p-2 rounded-lg border bg-white/50">
                    <option value="">Any</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Year</label>
                  <select className="w-full p-2 rounded-lg border bg-white/50">
                    <option value="">Any</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Listings Grid */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {vehicles?.map((vehicle) => (
                  <Link
                    key={vehicle.id}
                    to={`/vehicles/${vehicle.id}`}
                    className="glass-card rounded-xl overflow-hidden hover-effect transition-transform hover:-translate-y-1"
                  >
                    <div className="relative h-48">
                      <img 
                        src={vehicle.images?.[0] || "/placeholder.svg"}
                        alt={vehicle.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-sm">
                        {vehicle.condition}
                      </span>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{vehicle.title}</h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{vehicle.year}</span>
                        </div>
                        {vehicle.mileage && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{vehicle.mileage.toLocaleString()} km</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          ${vehicle.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
