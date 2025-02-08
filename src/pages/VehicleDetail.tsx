
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Car, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VehicleDetail = () => {
  const { id } = useParams();

  const { data: vehicle, isLoading } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Vehicle Not Found</h1>
        <Button variant="default" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => window.history.back()}
        >
          ← Back
        </Button>

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="relative h-96">
            <img
              src={vehicle.images?.[0] || '/placeholder.svg'}
              alt={vehicle.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full">
              {vehicle.condition}
            </span>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Car className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">{vehicle.title}</h1>
            </div>

            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                <span>{vehicle.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-600" />
                <span>{vehicle.mileage?.toLocaleString()} km</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Make:</span>
                  <span className="ml-2 font-medium">{vehicle.make}</span>
                </div>
                <div>
                  <span className="text-gray-600">Model:</span>
                  <span className="ml-2 font-medium">{vehicle.model}</span>
                </div>
                <div>
                  <span className="text-gray-600">Type:</span>
                  <span className="ml-2 font-medium">{vehicle.vehicle_type}</span>
                </div>
                <div>
                  <span className="text-gray-600">Condition:</span>
                  <span className="ml-2 font-medium">{vehicle.condition}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{vehicle.description}</p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-primary">
                ${vehicle.price.toLocaleString()}
              </span>
              <Button>Contact Seller</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
