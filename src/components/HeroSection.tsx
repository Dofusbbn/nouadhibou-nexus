
import SearchBar from './SearchBar';

const HeroSection = () => {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 backdrop-blur-sm" />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fade-in">
            Welcome to Nouadhibou's Premier Property & Vehicle Marketplace
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Find Your Perfect Place in Nouadhibou
          </h1>
          <p className="text-xl mb-8 text-gray-700 max-w-2xl mx-auto animate-slide-in leading-relaxed">
            Your trusted partner in discovering premium properties and vehicles in Mauritania's economic capital
          </p>
          <div className="animate-slide-in custom-transition" style={{ animationDelay: '0.2s' }}>
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
