
import { Building, Users, Clock, Trophy, Mail } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Nouadhibou</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted platform for finding the perfect property or vehicle in Mauritania's economic capital.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="glass-card p-6 text-center hover-effect">
            <Building className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Properties</h3>
            <p className="text-gray-600">Exclusive selection of properties in prime locations</p>
          </div>

          <div className="glass-card p-6 text-center hover-effect">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
            <p className="text-gray-600">Professional agents to guide your journey</p>
          </div>

          <div className="glass-card p-6 text-center hover-effect">
            <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Always here to help with your needs</p>
          </div>

          <div className="glass-card p-6 text-center hover-effect">
            <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quality Vehicles</h3>
            <p className="text-gray-600">Curated selection of premium vehicles</p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="glass-card p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center">
            To provide a seamless and transparent platform connecting buyers and sellers in Nouadhibou's
            property and vehicle markets. We strive to make the process of finding your perfect property
            or vehicle as efficient and enjoyable as possible.
          </p>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-8">
            Have questions? Our team is here to help you with your journey.
          </p>
          <a
            href="mailto:contact@nouadhibou.com"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Mail className="h-5 w-5" />
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
