'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Search, Filter, Car, Truck, Crown, Users, Fuel, MapPin } from 'lucide-react';

// Vehicle data structure
const vehicles = [
  {
    id: 1,
    name: "Toyota Land Cruiser V8",
    category: "Premium SUV",
    type: "luxury",
    image: "/landcruiser_V8_WHITE/presentable.jpg",
    images: [
      "/landcruiser_V8_WHITE/presentable.jpg",
      "/landcruiser_V8_WHITE/landcruiser_V8_WHITE.jpeg",
      "/landcruiser_V8_WHITE/landcruiser_V8_WHITE_back.jpeg"
    ],
    price: 20000,
    originalPrice: 25000,
    description: "Powerful V8 engine with luxury interior. Perfect for long journeys and off-road adventures. Chauffeured only.",
    features: ["V8 Engine", "Luxury Interior", "4WD System", "Chauffeured Service", "Premium Comfort"],
    capacity: 7,
    fuel: "Petrol",
    transmission: "Automatic",
    available: true,
    badge: "PREMIUM",
    badgeColor: "from-orange-500 to-red-500",
    selfDrive: false,
    chauffeured: true
  },
  {
    id: 2,
    name: "Toyota Land Cruiser TX",
    category: "4x4 SUV",
    type: "suv",
    image: "/Toyota_Land_cruiser_TX/presentable.jpg",
    images: [
      "/Toyota_Land_cruiser_TX/presentable.jpg",
      "/Toyota_Land_cruiser_TX/WhatsApp Image 2025-09-29 at 21.11.36 (1).jpeg"
    ],
    price: 15000,
    originalPrice: 18000,
    description: "Reliable and capable SUV perfect for both city and highway driving. Self-drive or chauffeured available.",
    features: ["4WD System", "Self-drive Available", "Chauffeured Option", "Safari Ready", "Reliable"],
    capacity: 7,
    fuel: "Petrol",
    transmission: "Automatic",
    available: true,
    badge: "BEST VALUE",
    badgeColor: "from-green-500 to-emerald-500",
    selfDrive: true,
    chauffeured: true
  },
  {
    id: 3,
    name: "Toyota Ractis",
    category: "Compact Hatchback",
    type: "economy",
    image: "/Toyota_Ractis/presentable.png",
    images: [
      "/Toyota_Ractis/presentable.png",
      "/Toyota_Ractis/WhatsApp Image 2025-09-30 at 15.25.28.jpeg",
      "/Toyota_Ractis/WhatsApp Image 2025-09-30 at 15.25.29 (1).jpeg",
      "/Toyota_Ractis/WhatsApp Image 2025-09-30 at 15.25.29.jpeg",
      "/Toyota_Ractis/WhatsApp Image 2025-09-30 at 15.25.30.jpeg",
      "/Toyota_Ractis/WhatsApp Image 2025-09-30 at 15.25.31.jpeg",
      "/Toyota_Ractis/WhatsApp Image 2025-09-30 at 15.25.32.jpeg"
    ],
    price: 5000,
    originalPrice: 6000,
    description: "Compact and fuel-efficient vehicle perfect for city driving and daily commutes. Great value for money.",
    features: ["Fuel Efficient", "Compact Size", "Easy Parking", "Reliable", "Economical"],
    capacity: 5,
    fuel: "Petrol",
    transmission: "Manual",
    available: true,
    badge: "ECONOMY",
    badgeColor: "from-blue-500 to-indigo-500",
    selfDrive: true,
    chauffeured: false
  },
  {
    id: 4,
    name: "Toyota Fielder Hybrid",
    category: "Hybrid Sedan",
    type: "hybrid",
    image: "/Toyota Fielder_Daihatsu/Toyota-Fielder-WXB-Hybrid-1.8-2WD_presentable.jpg",
    images: [
      "/Toyota Fielder_Daihatsu/Toyota-Fielder-WXB-Hybrid-1.8-2WD_presentable.jpg",
      "/Toyota Fielder_Daihatsu/Toyota Fielder_Daihatsu.jpeg",
      "/Toyota Fielder_Daihatsu/Toyota Fielder_Daihatsu_front.jpeg",
      "/Toyota Fielder_Daihatsu/Toyota Fielder_Daihatsu_back.jpeg",
      "/Toyota Fielder_Daihatsu/Toyota Fielder_Daihatsu_back_inside.jpeg"
    ],
    price: 7000,
    originalPrice: 8500,
    description: "Hybrid technology meets reliability. Perfect for eco-conscious drivers who want fuel efficiency without compromising on comfort.",
    features: ["Hybrid Engine", "Fuel Efficient", "Eco-Friendly", "Comfortable", "Reliable"],
    capacity: 5,
    fuel: "Hybrid",
    transmission: "Automatic",
    available: true,
    badge: "HYBRID",
    badgeColor: "from-green-500 to-teal-500",
    selfDrive: true,
    chauffeured: true
  }
];

const categories = [
  { id: 'all', name: 'All Vehicles', icon: Car },
  { id: 'luxury', name: 'Luxury', icon: Crown },
  { id: 'suv', name: 'SUVs', icon: Truck },
  { id: 'economy', name: 'Economy', icon: Car },
  { id: 'hybrid', name: 'Hybrid', icon: Car }
];

export default function VehiclesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Filter and sort vehicles
  const filteredVehicles = vehicles
    .filter(vehicle => {
      const matchesCategory = selectedCategory === 'all' || vehicle.type === selectedCategory;
      const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vehicle.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vehicle.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'capacity':
          return b.capacity - a.capacity;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Header */}
      <nav className="bg-white/10 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b border-white/20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-orange-500/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden bg-white/20 backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform duration-300">
                  <Image 
                    src="/MAKONOSIBLUEORANGE.png" 
                    alt="Makonosi Logo" 
                    width={48}
                    height={48}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                  <span className="hidden sm:inline">Makonosi Junior Car Hire</span>
                  <span className="sm:hidden">Makonosi</span>
                </h1>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center space-x-2 text-white/90 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>


      {/* Filters and Search */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg'
                        : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-blue-50 border border-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 pr-8 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="capacity">Capacity</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gray-600 text-center">
              Showing {filteredVehicles.length} of {vehicles.length} vehicles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group bg-white/90 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 cursor-pointer"
                onClick={() => window.location.href = `/vehicles/${vehicle.id}`}
              >
                {/* Vehicle Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    width={400}
                    height={256}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Badge */}
                  <motion.div 
                    className={`absolute top-4 left-4 bg-gradient-to-r ${vehicle.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {vehicle.badge}
                  </motion.div>

                  {/* Availability Status */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-3 h-3 rounded-full ${vehicle.available ? 'bg-green-400' : 'bg-red-400'} shadow-lg`}></div>
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {vehicle.name}
                    </h3>
                    <p className="text-gray-600 text-sm font-medium mb-3">{vehicle.category}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{vehicle.description}</p>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {vehicle.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                      {vehicle.features.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                          +{vehicle.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Vehicle Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span>{vehicle.capacity} seats</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Fuel className="w-4 h-4 text-green-500" />
                      <span>{vehicle.fuel}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Car className="w-4 h-4 text-purple-500" />
                      <span>{vehicle.transmission}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span>Available</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-3xl font-black text-blue-600">
                        KES {vehicle.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 line-through">
                        KES {vehicle.originalPrice.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">per day</div>
                      <div className="text-xs text-green-600 font-medium">
                        Save KES {(vehicle.originalPrice - vehicle.price).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <motion.button 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-orange-500 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 hover:from-blue-700 hover:to-orange-600"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Book Now
                    </motion.button>
                    <motion.button 
                      className="px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/vehicles/${vehicle.id}`;
                      }}
                    >
                      Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredVehicles.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No vehicles found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all vehicles</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-orange-600 transition-all duration-300"
              >
                View All Vehicles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
              Ready to Book Your Perfect Ride?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Contact us now to reserve your vehicle and experience Kenya in style with our professional chauffeur service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:+254700004362"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Call +254 700 004 362
              </motion.a>
              <motion.a
                href="https://wa.me/254721612348"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                WhatsApp Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
