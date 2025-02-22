
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { propertyFormSchema, type PropertyFormData } from "./property/schema";
import { BasicInfoFields } from "./property/BasicInfoFields";
import { PropertyDetailsFields } from "./property/PropertyDetailsFields";
import { StatusFields } from "./property/StatusFields";

interface PropertyFormProps {
  initialData?: any;
  onSubmit: (data: PropertyFormData) => Promise<void>;
  isLoading: boolean;
}

export default function PropertyForm({ initialData, onSubmit, isLoading }: PropertyFormProps) {
  const navigate = useNavigate();
  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price?.toString() || "",
      property_type: initialData?.property_type || "apartment",
      bedrooms: initialData?.bedrooms?.toString() || "",
      bathrooms: initialData?.bathrooms?.toString() || "",
      area: initialData?.area?.toString() || "",
      location: initialData?.location || "",
      status: initialData?.status || "available",
      listing_type: initialData?.listing_type || "sale",
      images: initialData?.images || [],
    },
  });

  const handleSubmit = async (data: PropertyFormData) => {
    try {
      await onSubmit(data);
      toast({
        title: "Success",
        description: `Property ${initialData ? "updated" : "created"} successfully`,
      });
      navigate("/admin");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <BasicInfoFields form={form} />
        <PropertyDetailsFields form={form} />
        <StatusFields form={form} />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/admin")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : initialData ? "Update Property" : "Create Property"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
