export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          area: number | null
          bathrooms: number | null
          bedrooms: number | null
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          is_featured: boolean | null
          listing_type: string
          location: string
          price: number
          property_type: Database["public"]["Enums"]["property_type"]
          search_vector: unknown | null
          status: string
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          area?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          listing_type?: string
          location: string
          price: number
          property_type: Database["public"]["Enums"]["property_type"]
          search_vector?: unknown | null
          status?: string
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          area?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          listing_type?: string
          location?: string
          price?: number
          property_type?: Database["public"]["Enums"]["property_type"]
          search_vector?: unknown | null
          status?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          created_at: string
          id: string
          property_id: string | null
          user_id: string
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          property_id?: string | null
          user_id: string
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string | null
          user_id?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorites_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          condition: string
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          is_featured: boolean | null
          listing_type: string
          make: string
          mileage: number | null
          model: string
          price: number
          search_vector: unknown | null
          title: string
          updated_at: string | null
          user_id: string | null
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
          year: number
        }
        Insert: {
          condition: string
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          listing_type?: string
          make: string
          mileage?: number | null
          model: string
          price: number
          search_vector?: unknown | null
          title: string
          updated_at?: string | null
          user_id?: string | null
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
          year: number
        }
        Update: {
          condition?: string
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          listing_type?: string
          make?: string
          mileage?: number | null
          model?: string
          price?: number
          search_vector?: unknown | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"]
          year?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          user_id: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      property_type: "apartment" | "villa" | "office" | "land"
      vehicle_type: "car" | "bike" | "truck"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
