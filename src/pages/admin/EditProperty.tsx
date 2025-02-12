
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import PropertyForm from "@/components/admin/PropertyForm";

export default function EditProperty() {
  const { id } = useParams();

  const { data: property, isLoading } = useQuery({
    queryKey: ["admin-property", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const updateProperty = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase
        .from("properties")
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
      <h1 className="text-2xl font-bold mb-6">Edit Property</h1>
      <PropertyForm
        initialData={property}
        onSubmit={updateProperty.mutateAsync}
        isLoading={updateProperty.isLoading}
      />
    </div>
  );
}
