
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import PropertyForm from "@/components/admin/PropertyForm";

export default function CreateProperty() {
  const createProperty = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase
        .from("properties")
        .insert([data]);

      if (error) throw error;
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create Property</h1>
      <PropertyForm
        onSubmit={createProperty.mutateAsync}
        isLoading={createProperty.isPending}
      />
    </div>
  );
}
