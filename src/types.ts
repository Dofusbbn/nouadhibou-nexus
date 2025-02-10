
import type { Database as DatabaseGenerated } from './integrations/supabase/types';

export type Database = DatabaseGenerated;

export type PropertyType = 'apartment' | 'villa' | 'office' | 'land';
export type VehicleType = 'car' | 'bike' | 'truck';
