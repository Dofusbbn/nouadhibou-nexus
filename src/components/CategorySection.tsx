
import { Home, Car } from 'lucide-react';

const CategorySection = () => {
  const categories = [
    {
      title: 'Properties',
      icon: Home,
      description: 'Browse luxurious apartments, modern villas, and prime commercial spaces in Nouadhibou',
      link: '/properties',
    },
    {
      title: 'Vehicles',
      icon: Car,
      description: 'Discover premium cars, reliable trucks, and efficient motorcycles for your needs',
      link: '/vehicles',
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-background to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-secondary">Explore Our Categories</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <a
              key={category.title}
              href={category.link}
              className="group relative overflow-hidden rounded-2xl hover-effect"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm group-hover:backdrop-blur-md transition-all duration-300" />
              <div className="glass-card p-8 rounded-2xl border border-white/10 backdrop-blur-sm relative z-10">
                <div className="bg-white/10 p-4 rounded-xl w-fit mx-auto mb-6">
                  <category.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-center group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {category.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
