
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Home as HomeIcon, BedDouble, Bath, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from '@/hooks/use-mobile';

const PropertyDetail = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();

  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
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

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
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
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="relative">
            {property.images && property.images.length > 0 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {property.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className={`relative ${isMobile ? 'h-64' : 'h-96'}`}>
                        <img
                          src={image || '/placeholder.svg'}
                          alt={`${property.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              <div className={`relative ${isMobile ? 'h-64' : 'h-96'}`}>
                <img
                  src="/placeholder.svg"
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <span className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full z-10">
              {property.status}
            </span>
          </div>

          <div className="p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <HomeIcon className="h-6 w-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold">{property.title}</h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <BedDouble className="h-5 w-5 text-gray-600" />
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-gray-600" />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-600" />
                <span>{property.area} m²</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Location</h2>
                <p className="text-gray-600">{property.location}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{property.description}</p>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <span className="text-2xl md:text-3xl font-bold text-primary">
                  ${property.price.toLocaleString()}
                </span>
                <Button className="w-full md:w-auto">Contact Agent</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
