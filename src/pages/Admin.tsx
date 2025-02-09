
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '@/hooks/useRole';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PropertyTable from '@/components/admin/PropertyTable';
import VehicleTable from '@/components/admin/VehicleTable';

export default function Admin() {
  const { isAdmin, isLoading: roleLoading } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roleLoading && !isAdmin) {
      navigate('/');
    }
  }, [isAdmin, roleLoading, navigate]);

  if (roleLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs defaultValue="properties">
        <TabsList>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          <PropertyTable />
        </TabsContent>

        <TabsContent value="vehicles">
          <VehicleTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
