
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import VehicleForm from "@/components/admin/VehicleForm";

export default function CreateVehicle() {
  const createVehicle = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase
        .from("vehicles")
        .insert([data]);

      if (error) throw error;
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create Vehicle</h1>
      <VehicleForm
        onSubmit={createVehicle.mutateAsync}
        isLoading={createVehicle.isLoading}
      />
    </div>
  );
}
