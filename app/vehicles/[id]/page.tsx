'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Car, Users, Fuel, MapPin, CheckCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';

// Vehicle data structure (same as vehicles page)
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
    chauffeured: true,
    fullDescription: "The Toyota Land Cruiser V8 is the ultimate luxury SUV for discerning travelers. With its powerful V8 engine and premium interior, this vehicle delivers unmatched comfort and performance. Perfect for VIP transportation, safari tours, and long-distance travel. Our professional chauffeurs ensure a safe and luxurious journey through Kenya's diverse landscapes.",
    specifications: {
      engine: "5.7L V8",
      horsepower: "381 HP",
      acceleration: "0-100 km/h in 7.2s",
      topSpeed: "200 km/h",
      fuelConsumption: "14.5L/100km",
      dimensions: "5.1m x 1.9m x 1.9m"
    },
    amenities: [
      "V8 Engine Power",
      "Luxury Leather Interior",
      "4WD System",
      "Professional Chauffeur",
      "Premium Audio System",
      "Climate Control",
      "Power Windows",
      "Cruise Control",
      "Advanced Safety Features",
      "Third Row Seating"
    ]
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
    chauffeured: true,
    fullDescription: "The Toyota Land Cruiser TX offers the perfect balance of capability and versatility. Whether you prefer to drive yourself or be chauffeured, this reliable SUV is ready for any adventure. From city commutes to safari expeditions, the TX delivers consistent performance and comfort. Its 4WD system ensures you can explore Kenya's most challenging terrains with confidence.",
    specifications: {
      engine: "4.6L V8",
      horsepower: "304 HP",
      acceleration: "0-100 km/h in 8.2s",
      topSpeed: "190 km/h",
      fuelConsumption: "13.5L/100km",
      dimensions: "4.9m x 1.9m x 1.9m"
    },
    amenities: [
      "4WD System",
      "Self-drive Option",
      "Chauffeured Service",
      "Safari Ready",
      "Third Row Seating",
      "Air Conditioning",
      "Power Windows",
      "Central Locking",
      "Audio System",
      "Storage Compartments"
    ]
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
    chauffeured: false,
    fullDescription: "The Toyota Ractis is the perfect choice for budget-conscious travelers who need reliable transportation. This compact hatchback excels in city driving with its fuel-efficient engine and easy maneuverability. Perfect for daily commutes, short trips, and navigating through busy urban areas. Despite its compact size, the Ractis offers surprising interior space and comfort.",
    specifications: {
      engine: "1.3L 4-Cylinder",
      horsepower: "95 HP",
      acceleration: "0-100 km/h in 12.5s",
      topSpeed: "170 km/h",
      fuelConsumption: "6.5L/100km",
      dimensions: "4.0m x 1.7m x 1.5m"
    },
    amenities: [
      "Fuel Efficient Engine",
      "Compact Design",
      "Easy Parking",
      "Air Conditioning",
      "Power Steering",
      "Radio/CD Player",
      "Central Locking",
      "Power Windows",
      "Fabric Seats",
      "Cup Holders"
    ]
  },
  {
    id: 4,
    name: "Toyota Land Cruiser V8 Black",
    category: "Luxury SUV",
    type: "luxury",
    image: "/landcruiser_V8_Black/presentable_toyotav8.jpg",
    images: [
      "/landcruiser_V8_Black/presentable_toyotav8.jpg"
    ],
    price: 22000,
    originalPrice: 25000,
    description: "Sleek black luxury SUV with premium V8 engine. Perfect for business meetings and special occasions. Chauffeured only.",
    features: ["V8 Engine", "Luxury Interior", "Premium Black Finish", "Chauffeured Service", "Business Ready"],
    capacity: 7,
    fuel: "Petrol",
    transmission: "Automatic",
    available: true,
    badge: "LUXURY",
    badgeColor: "from-purple-600 to-purple-800",
    selfDrive: false,
    chauffeured: true,
    fullDescription: "The Toyota Land Cruiser V8 Black is the epitome of luxury and sophistication. With its sleek black exterior and powerful V8 engine, this vehicle makes a statement wherever it goes. Perfect for business meetings, special occasions, and VIP transportation. Our professional chauffeurs ensure a premium experience with unmatched comfort and style.",
    specifications: {
      engine: "5.7L V8",
      horsepower: "381 HP",
      acceleration: "0-100 km/h in 7.2s",
      topSpeed: "200 km/h",
      fuelConsumption: "14.5L/100km",
      dimensions: "5.1m x 1.9m x 1.9m"
    },
    amenities: [
      "V8 Engine Power",
      "Luxury Black Interior",
      "Premium Black Finish",
      "Professional Chauffeur",
      "Premium Audio System",
      "Climate Control",
      "Business Class Comfort",
      "VIP Transportation"
    ]
  },
  {
    id: 5,
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
    chauffeured: true,
    fullDescription: "The Toyota Fielder Hybrid represents the perfect fusion of eco-friendly technology and reliable performance. This hybrid sedan delivers exceptional fuel efficiency while maintaining the comfort and reliability that Toyota is known for. Perfect for environmentally conscious travelers who want to reduce their carbon footprint without sacrificing comfort or performance.",
    specifications: {
      engine: "1.8L Hybrid",
      horsepower: "122 HP",
      acceleration: "0-100 km/h in 10.8s",
      topSpeed: "180 km/h",
      fuelConsumption: "4.2L/100km",
      dimensions: "4.6m x 1.7m x 1.5m"
    },
    amenities: [
      "Hybrid Technology",
      "Fuel Efficient",
      "Eco-Friendly",
      "Air Conditioning",
      "Power Steering",
      "Audio System",
      "Central Locking",
      "Power Windows",
      "Fabric Seats",
      "Cup Holders"
    ]
  }
];

export default function VehicleDetailPage() {
  const params = useParams();
  const vehicleId = parseInt(params.id as string);
  const vehicle = vehicles.find(v => v.id === vehicleId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Vehicle Not Found</h1>
          <p className="text-gray-600 mb-8">The vehicle you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/vehicles"
            className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-orange-600 transition-all duration-300"
          >
            Back to Vehicles
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % vehicle.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

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
                href="/vehicles"
                className="flex items-center space-x-2 text-white/90 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Vehicles</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Vehicle Hero Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Vehicle Image Gallery */}
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                   onClick={() => setIsGalleryOpen(true)}>
                <Image
                  src={vehicle.images[selectedImageIndex]}
                  alt={vehicle.name}
                  width={600}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                {/* Badge */}
                <motion.div 
                  className={`absolute top-6 left-6 bg-gradient-to-r ${vehicle.badgeColor} text-white px-4 py-2 rounded-full text-sm font-bold`}
                  whileHover={{ scale: 1.1 }}
                >
                  {vehicle.badge}
                </motion.div>

                {/* Availability Status */}
                <div className="absolute top-6 right-6">
                  <div className={`flex items-center space-x-2 px-3 py-2 rounded-full bg-white/90 backdrop-blur-sm ${vehicle.available ? 'text-green-600' : 'text-red-600'}`}>
                    <div className={`w-2 h-2 rounded-full ${vehicle.available ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <span className="text-sm font-medium">{vehicle.available ? 'Available' : 'Unavailable'}</span>
                  </div>
                </div>

                {/* Image Navigation */}
                {vehicle.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {vehicle.images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {vehicle.images.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                  {vehicle.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        index === selectedImageIndex 
                          ? 'border-blue-500 shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${vehicle.name} ${index + 1}`}
                        width={80}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Vehicle Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                  {vehicle.name}
                </h1>
                <p className="text-xl text-gray-600 font-medium mb-6">{vehicle.category}</p>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {vehicle.fullDescription}
                </p>
              </div>

              {/* Service Options */}
              <div className="flex flex-wrap gap-3 mb-6">
                {vehicle.selfDrive && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Self-Drive Available
                  </span>
                )}
                {vehicle.chauffeured && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Chauffeured Service
                  </span>
                )}
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100">
                  <Users className="w-6 h-6 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-600">Capacity</div>
                    <div className="font-bold text-gray-900">{vehicle.capacity} seats</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100">
                  <Fuel className="w-6 h-6 text-green-500" />
                  <div>
                    <div className="text-sm text-gray-600">Fuel Type</div>
                    <div className="font-bold text-gray-900">{vehicle.fuel}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100">
                  <Car className="w-6 h-6 text-purple-500" />
                  <div>
                    <div className="text-sm text-gray-600">Transmission</div>
                    <div className="font-bold text-gray-900">{vehicle.transmission}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100">
                  <MapPin className="w-6 h-6 text-orange-500" />
                  <div>
                    <div className="text-sm text-gray-600">Location</div>
                    <div className="font-bold text-gray-900">Nairobi</div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-2xl border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-4xl font-black text-blue-600">
                      KES {vehicle.price.toLocaleString()}
                    </div>
                    <div className="text-lg text-gray-500 line-through">
                      KES {vehicle.originalPrice.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">per day</div>
                    <div className="text-lg text-green-600 font-bold">
                      Save KES {(vehicle.originalPrice - vehicle.price).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <motion.button 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-orange-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-orange-600 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book This Vehicle
                  </motion.button>
                  <motion.button 
                    className="px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Call Now
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Specifications */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Technical Specifications */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Specifications</h2>
              <div className="space-y-4">
                {Object.entries(vehicle.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-gray-900 font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Amenities & Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Amenities & Features</h2>
              <div className="grid grid-cols-1 gap-3">
                {vehicle.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
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
              Ready to Book the {vehicle.name}?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Contact us now to reserve this vehicle and experience Kenya in style with our professional chauffeur service.
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

      {/* Image Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative">
              <Image
                src={vehicle.images[selectedImageIndex]}
                alt={vehicle.name}
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {vehicle.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}
            </div>
            
            <div className="text-center mt-4 text-white">
              <p className="text-lg font-medium">{vehicle.name}</p>
              <p className="text-sm opacity-75">{selectedImageIndex + 1} of {vehicle.images.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}