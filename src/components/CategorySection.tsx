
import { Home, Car } from 'lucide-react';

const CategorySection = () => {
  const categories = [
    {
      title: 'Properties',
      icon: Home,
      description: 'Find apartments, villas, and commercial spaces',
      link: '/properties',
    },
    {
      title: 'Vehicles',
      icon: Car,
      description: 'Discover cars, trucks, and motorcycles',
      link: '/vehicles',
    },
  ];

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <a
              key={category.title}
              href={category.link}
              className="glass-card p-8 rounded-xl hover-effect"
            >
              <category.icon className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-2">{category.title}</h3>
              <p className="text-gray-600">{category.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
