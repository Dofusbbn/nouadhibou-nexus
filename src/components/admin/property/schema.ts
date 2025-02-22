
import * as z from "zod";

export const propertyFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required").transform(Number),
  property_type: z.enum(["apartment", "villa", "office", "land"] as const),
  bedrooms: z.string().transform(Number).optional(),
  bathrooms: z.string().transform(Number).optional(),
  area: z.string().transform(Number).optional(),
  location: z.string().min(1, "Location is required"),
  status: z.string().min(1, "Status is required"),
  listing_type: z.string().min(1, "Listing type is required"),
  images: z.array(z.string()).default([]),
});

export type PropertyFormData = z.infer<typeof propertyFormSchema>;
