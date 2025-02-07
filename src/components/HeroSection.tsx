
import SearchBar from './SearchBar';

const HeroSection = () => {
  return (
    <div className="relative h-[80vh] flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm" />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Find Your Perfect Place in Nouadhibou
        </h1>
        <p className="text-xl mb-8 text-gray-700 max-w-2xl mx-auto animate-slide-in">
          Discover premium properties and vehicles in Mauritania's economic capital
        </p>
        <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
