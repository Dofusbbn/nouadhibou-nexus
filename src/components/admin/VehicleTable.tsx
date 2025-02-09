
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Eye, Star, Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VehicleTable() {
  const queryClient = useQueryClient();

  const { data: vehicles, refetch: refetchVehicles } = useQuery({
    queryKey: ['admin-vehicles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const deleteVehicleMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-vehicles'] });
      toast({
        title: "Success",
        description: "Vehicle deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete vehicle",
      });
    },
  });

  const toggleFeatured = async (id: string, featured: boolean) => {
    const { error } = await supabase
      .from('vehicles')
      .update({ is_featured: !featured })
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update featured status",
      });
    } else {
      toast({
        title: "Success",
        description: "Featured status updated successfully",
      });
      refetchVehicles();
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles?.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.title}</TableCell>
              <TableCell>${vehicle.price.toLocaleString()}</TableCell>
              <TableCell>{vehicle.vehicle_type}</TableCell>
              <TableCell>{vehicle.condition}</TableCell>
              <TableCell>{vehicle.is_featured ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleFeatured(vehicle.id, vehicle.is_featured)}
                  >
                    <Star className={`h-4 w-4 ${vehicle.is_featured ? 'fill-yellow-400' : ''}`} />
                  </Button>
                  <Link to={`/vehicles/${vehicle.id}`}>
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to={`/admin/vehicles/edit/${vehicle.id}`}>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Vehicle</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this vehicle? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteVehicleMutation.mutate(vehicle.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
