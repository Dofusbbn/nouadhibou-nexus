
import { Home, Car } from 'lucide-react';

const CategorySection = () => {
  const categories = [
    {
      title: 'Properties',
      icon: Home,
      description: 'Browse luxurious apartments, modern villas, and prime commercial spaces in Nouadhibou',
      link: '/properties',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Vehicles',
      icon: Car,
      description: 'Discover premium cars, reliable trucks, and efficient motorcycles for your needs',
      link: '/vehicles',
      gradient: 'from-blue-500 to-indigo-600',
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-background to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Explore Our Categories
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {categories.map((category) => (
            <a
              key={category.title}
              href={category.link}
              className="group relative overflow-hidden rounded-2xl hover-effect"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-90`} />
              <div className="relative glass-card p-8 rounded-2xl border border-white/10 backdrop-blur-sm z-10 h-full flex flex-col items-center text-white">
                <div className="rounded-full bg-white/10 p-4 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <category.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  {category.title}
                </h3>
                <p className="text-white/90 text-center leading-relaxed text-sm md:text-base">
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
