
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useFavorites = (type: 'properties' | 'vehicles') => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites', type, user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('user_favorites')
        .select(`id, ${type === 'properties' ? 'property_id' : 'vehicle_id'}`)
        .eq('user_id', user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const toggleFavorite = useMutation({
    mutationFn: async (itemId: string) => {
      if (!user) throw new Error('Must be logged in');

      const existingFavorite = favorites.find(f => 
        f[type === 'properties' ? 'property_id' : 'vehicle_id'] === itemId
      );

      if (existingFavorite) {
        const { error } = await supabase
          .from('user_favorites')
          .delete()
          .eq('id', existingFavorite.id);
        if (error) throw error;
        return { added: false, itemId };
      } else {
        const { error } = await supabase
          .from('user_favorites')
          .insert({
            user_id: user.id,
            [type === 'properties' ? 'property_id' : 'vehicle_id']: itemId
          });
        if (error) throw error;
        return { added: true, itemId };
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['favorites', type, user?.id] });
      toast({
        title: result.added ? 'Added to favorites' : 'Removed from favorites',
        description: result.added ? 
          'Item has been added to your favorites' : 
          'Item has been removed from your favorites',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const isFavorite = (itemId: string) => {
    return favorites.some(f => 
      f[type === 'properties' ? 'property_id' : 'vehicle_id'] === itemId
    );
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};
