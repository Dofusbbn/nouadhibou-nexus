
import { useCallback, useState } from 'react';
import { useDebounce } from './useDebounce';
import { supabase } from '@/integrations/supabase/client';

export const useSearch = (type: 'properties' | 'vehicles') => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const searchQuery = useCallback(async () => {
    if (!debouncedSearchTerm) return null;

    const query = supabase
      .from(type)
      .select('*')
      .textSearch('search_vector', debouncedSearchTerm, {
        type: 'websearch',
        config: 'english'
      });

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }, [debouncedSearchTerm, type]);

  return {
    searchTerm,
    setSearchTerm,
    searchQuery
  };
};
