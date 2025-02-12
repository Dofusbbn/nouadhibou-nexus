
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import VehicleForm from "@/components/admin/VehicleForm";

export default function EditVehicle() {
  const { id } = useParams();

  const { data: vehicle, isLoading } = useQuery({
    queryKey: ["admin-vehicle", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const updateVehicle = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase
        .from("vehicles")
        .update(data)
        .eq("id", id);

      if (error) throw error;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Vehicle</h1>
      <VehicleForm
        initialData={vehicle}
        onSubmit={updateVehicle.mutateAsync}
        isLoading={updateVehicle.isPending}
      />
    </div>
  );
}
