'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Car, Users, Fuel, MapPin, CheckCircle } from 'lucide-react';

// Vehicle data structure (same as vehicles page)
const vehicles = [
  {
    id: 1,
    name: "C4 Alfa Romeo",
    category: "Luxury Sedan",
    type: "sedan",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 8500,
    originalPrice: 12000,
    description: "Luxury Italian engineering meets modern comfort. Perfect for city drives and special occasions.",
    features: ["Air Conditioning", "Leather Seats", "Premium Sound", "GPS Navigation"],
    capacity: 4,
    fuel: "Petrol",
    transmission: "Automatic",
    available: true,
    badge: "HOT DEAL",
    badgeColor: "from-orange-500 to-red-500",
    fullDescription: "The C4 Alfa Romeo represents the perfect blend of Italian luxury and modern technology. With its sleek design and premium interior, this vehicle offers an unparalleled driving experience. Whether you're navigating through city streets or embarking on a special occasion, the C4 Alfa Romeo delivers comfort, style, and performance in equal measure.",
    specifications: {
      engine: "2.0L Turbo",
      horsepower: "280 HP",
      acceleration: "0-100 km/h in 6.2s",
      topSpeed: "250 km/h",
      fuelConsumption: "8.5L/100km",
      dimensions: "4.7m x 1.8m x 1.4m"
    },
    amenities: [
      "Premium Leather Seats",
      "Dual Zone Climate Control",
      "Premium Audio System",
      "GPS Navigation",
      "Bluetooth Connectivity",
      "USB Charging Ports",
      "Sunroof",
      "Parking Sensors",
      "Backup Camera",
      "Keyless Entry"
    ]
  },
  {
    id: 2,
    name: "GTR Nissan",
    category: "Sports Car",
    type: "sports",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 25000,
    originalPrice: 35000,
    description: "High-performance sports car with legendary speed and precision. For the ultimate driving experience.",
    features: ["Turbo Engine", "Sport Mode", "Premium Interior", "Advanced Safety"],
    capacity: 2,
    fuel: "Petrol",
    transmission: "Manual",
    available: true,
    badge: "PREMIUM",
    badgeColor: "from-red-500 to-pink-500",
    fullDescription: "The legendary Nissan GTR is a high-performance sports car that delivers an adrenaline-pumping driving experience. Known for its incredible speed, precision handling, and advanced technology, the GTR is the perfect choice for those seeking the ultimate driving thrill. With its powerful engine and race-inspired design, this vehicle promises an unforgettable journey.",
    specifications: {
      engine: "3.8L V6 Twin Turbo",
      horsepower: "565 HP",
      acceleration: "0-100 km/h in 2.9s",
      topSpeed: "315 km/h",
      fuelConsumption: "12.5L/100km",
      dimensions: "4.7m x 1.9m x 1.4m"
    },
    amenities: [
      "Recaro Sport Seats",
      "Advanced Sport Suspension",
      "Premium Audio System",
      "Racing Mode Selection",
      "Launch Control",
      "Carbon Fiber Interior",
      "LED Headlights",
      "Performance Brakes",
      "Sport Exhaust",
      "Digital Dashboard"
    ]
  },
  {
    id: 3,
    name: "Toyota V8",
    category: "SUV",
    type: "suv",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 18000,
    originalPrice: 22000,
    description: "Powerful V8 engine with luxury interior. Perfect for long journeys and off-road adventures.",
    features: ["4WD", "V8 Engine", "Luxury Interior", "Off-road Capable"],
    capacity: 7,
    fuel: "Petrol",
    transmission: "Automatic",
    available: true,
    badge: "BEST VALUE",
    badgeColor: "from-green-500 to-emerald-500",
    fullDescription: "The Toyota V8 is a powerful and luxurious SUV designed for both comfort and adventure. With its robust V8 engine and advanced 4WD system, this vehicle can handle any terrain while providing a premium driving experience. Perfect for family trips, safari adventures, or long-distance travel, the Toyota V8 combines reliability with luxury.",
    specifications: {
      engine: "5.7L V8",
      horsepower: "381 HP",
      acceleration: "0-100 km/h in 7.2s",
      topSpeed: "200 km/h",
      fuelConsumption: "14.5L/100km",
      dimensions: "5.1m x 1.9m x 1.9m"
    },
    amenities: [
      "Third Row Seating",
      "4WD System",
      "Luxury Leather Interior",
      "Premium Audio System",
      "Climate Control",
      "Power Windows",
      "Cruise Control",
      "Towing Package",
      "Roof Rails",
      "Advanced Safety Features"
    ]
  },
  {
    id: 4,
    name: "BMW X5",
    category: "Luxury SUV",
    type: "luxury",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 22000,
    originalPrice: 28000,
    description: "Premium SUV with cutting-edge technology and superior comfort for discerning clients.",
    features: ["iDrive System", "Panoramic Sunroof", "Premium Audio", "Driver Assistance"],
    capacity: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    available: true,
    badge: "LUXURY",
    badgeColor: "from-purple-500 to-indigo-500",
    fullDescription: "The BMW X5 represents the pinnacle of luxury SUV design and technology. With its sophisticated iDrive system, premium materials, and advanced driver assistance features, this vehicle offers an unparalleled driving experience. Perfect for business executives and luxury travelers who demand the very best in comfort, technology, and performance.",
    specifications: {
      engine: "3.0L Twin Turbo",
      horsepower: "335 HP",
      acceleration: "0-100 km/h in 5.5s",
      topSpeed: "250 km/h",
      fuelConsumption: "9.8L/100km",
      dimensions: "4.9m x 2.0m x 1.7m"
    },
    amenities: [
      "iDrive 7.0 System",
      "Panoramic Sunroof",
      "Harman Kardon Audio",
      "Wireless Charging",
      "Gesture Control",
      "Adaptive Cruise Control",
      "Lane Keep Assist",
      "Premium Leather",
      "Ambient Lighting",
      "Heated Seats"
    ]
  },
  {
    id: 5,
    name: "Mercedes E-Class",
    category: "Executive Sedan",
    type: "executive",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 20000,
    originalPrice: 25000,
    description: "Executive sedan with refined elegance and advanced safety features for business travel.",
    features: ["MBUX System", "Executive Seats", "Advanced Safety", "Business Ready"],
    capacity: 4,
    fuel: "Petrol",
    transmission: "Automatic",
    available: true,
    badge: "EXECUTIVE",
    badgeColor: "from-slate-500 to-gray-600",
    fullDescription: "The Mercedes E-Class is the epitome of executive luxury and sophistication. Designed for business professionals who require comfort, technology, and prestige, this sedan combines elegant design with cutting-edge features. With its advanced MBUX system and comprehensive safety features, the E-Class ensures a productive and secure journey for all business needs.",
    specifications: {
      engine: "2.0L Turbo",
      horsepower: "255 HP",
      acceleration: "0-100 km/h in 6.2s",
      topSpeed: "250 km/h",
      fuelConsumption: "7.8L/100km",
      dimensions: "4.9m x 1.9m x 1.4m"
    },
    amenities: [
      "MBUX Infotainment",
      "Executive Rear Seats",
      "Premium Audio",
      "Wireless Charging",
      "Active Safety Features",
      "Adaptive Suspension",
      "Keyless Go",
      "Ambient Lighting",
      "Heated Seats",
      "Business Package"
    ]
  },
  {
    id: 6,
    name: "Toyota Axio",
    category: "Economy Sedan",
    type: "economy",
    image: "https://images.unsplash.com/photo-1549317336-206569e8475c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 5000,
    originalPrice: 6000,
    description: "Reliable and fuel-efficient sedan perfect for daily commutes and city driving.",
    features: ["Fuel Efficient", "Reliable", "Comfortable", "Easy to Drive"],
    capacity: 4,
    fuel: "Petrol",
    transmission: "Automatic",
    available: true,
    badge: "POPULAR",
    badgeColor: "from-blue-500 to-blue-600",
    fullDescription: "The Toyota Axio is a reliable and fuel-efficient sedan that's perfect for daily commuting and city driving. Known for its dependability and low maintenance costs, the Axio offers excellent value for money. With its comfortable interior and easy-to-drive nature, it's an ideal choice for budget-conscious travelers who don't want to compromise on quality.",
    specifications: {
      engine: "1.5L 4-Cylinder",
      horsepower: "110 HP",
      acceleration: "0-100 km/h in 11.5s",
      topSpeed: "180 km/h",
      fuelConsumption: "6.2L/100km",
      dimensions: "4.4m x 1.7m x 1.5m"
    },
    amenities: [
      "Air Conditioning",
      "Power Steering",
      "CD Player",
      "Central Locking",
      "Power Windows",
      "Fabric Seats",
      "Cup Holders",
      "Storage Compartments",
      "Basic Audio",
      "Manual Mirrors"
    ]
  },
  {
    id: 7,
    name: "Nissan Note",
    category: "Compact Hatchback",
    type: "compact",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 4500,
    originalPrice: 5500,
    description: "Compact and versatile hatchback ideal for urban driving and tight parking spaces.",
    features: ["Compact Size", "Easy Parking", "Fuel Efficient", "Versatile"],
    capacity: 5,
    fuel: "Petrol",
    transmission: "Manual",
    available: true,
    badge: "ECONOMY",
    badgeColor: "from-green-500 to-green-600",
    fullDescription: "The Nissan Note is a compact and versatile hatchback designed for urban environments. With its small footprint and excellent maneuverability, it's perfect for navigating through city streets and fitting into tight parking spaces. Despite its compact size, the Note offers surprising interior space and fuel efficiency, making it an excellent choice for city driving.",
    specifications: {
      engine: "1.2L 3-Cylinder",
      horsepower: "80 HP",
      acceleration: "0-100 km/h in 13.2s",
      topSpeed: "165 km/h",
      fuelConsumption: "5.8L/100km",
      dimensions: "4.1m x 1.7m x 1.5m"
    },
    amenities: [
      "Air Conditioning",
      "Power Steering",
      "Radio/CD Player",
      "Central Locking",
      "Power Windows",
      "Fabric Seats",
      "Cup Holders",
      "Storage Compartments",
      "Basic Audio",
      "Manual Mirrors"
    ]
  },
  {
    id: 8,
    name: "X-Trail",
    category: "Compact SUV",
    type: "suv",
    image: "https://images.unsplash.com/photo-15493999019-d8ec4c70a6b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 7500,
    originalPrice: 9000,
    description: "Versatile compact SUV with excellent fuel economy and comfortable ride quality.",
    features: ["All-Wheel Drive", "Spacious Interior", "Advanced Safety", "Fuel Efficient"],
    capacity: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    available: true,
    badge: "FAMILY",
    badgeColor: "from-indigo-500 to-blue-500",
    fullDescription: "The Nissan X-Trail is a versatile compact SUV that combines the practicality of an SUV with the efficiency of a smaller vehicle. With its spacious interior, advanced safety features, and excellent fuel economy, the X-Trail is perfect for families and travelers who need extra space without sacrificing efficiency. Its all-wheel-drive capability makes it suitable for various road conditions.",
    specifications: {
      engine: "2.5L 4-Cylinder",
      horsepower: "170 HP",
      acceleration: "0-100 km/h in 9.8s",
      topSpeed: "190 km/h",
      fuelConsumption: "8.2L/100km",
      dimensions: "4.6m x 1.8m x 1.7m"
    },
    amenities: [
      "All-Wheel Drive",
      "Spacious Interior",
      "Advanced Safety",
      "Air Conditioning",
      "Power Windows",
      "Central Locking",
      "Audio System",
      "Cup Holders",
      "Storage Compartments",
      "Roof Rails"
    ]
  },
  {
    id: 9,
    name: "RAV4",
    category: "Compact SUV",
    type: "suv",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 8000,
    originalPrice: 9500,
    description: "Reliable and capable compact SUV perfect for both city and highway driving.",
    features: ["Toyota Safety Sense", "Hybrid Option", "Spacious Cargo", "Reliable"],
    capacity: 5,
    fuel: "Petrol/Hybrid",
    transmission: "Automatic",
    available: true,
    badge: "RELIABLE",
    badgeColor: "from-orange-500 to-orange-600",
    fullDescription: "The Toyota RAV4 is a reliable and capable compact SUV that excels in both city and highway driving. Known for its dependability and advanced safety features, the RAV4 offers a comfortable ride with plenty of cargo space. With optional hybrid technology, it provides excellent fuel efficiency while maintaining the versatility that makes it perfect for various driving needs.",
    specifications: {
      engine: "2.5L 4-Cylinder Hybrid",
      horsepower: "219 HP",
      acceleration: "0-100 km/h in 8.1s",
      topSpeed: "180 km/h",
      fuelConsumption: "5.8L/100km",
      dimensions: "4.6m x 1.8m x 1.7m"
    },
    amenities: [
      "Toyota Safety Sense",
      "Hybrid Technology",
      "Spacious Cargo",
      "Air Conditioning",
      "Power Windows",
      "Central Locking",
      "Audio System",
      "Cup Holders",
      "Storage Compartments",
      "Roof Rails"
    ]
  },
  {
    id: 10,
    name: "TX Land Cruiser J150",
    category: "4x4 SUV",
    type: "offroad",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 15000,
    originalPrice: 18000,
    description: "Legendary off-road capability with luxury features. Perfect for safari tours and adventure trips.",
    features: ["4WD System", "Safari Ready", "Luxury Interior", "Self-drive Available"],
    capacity: 7,
    fuel: "Petrol",
    transmission: "Automatic",
    available: true,
    badge: "SAFARI",
    badgeColor: "from-yellow-500 to-orange-500",
    fullDescription: "The Toyota Land Cruiser J150 is a legendary 4x4 SUV that combines off-road capability with luxury features. Perfect for safari tours and adventure trips, this vehicle can handle the most challenging terrains while providing comfort for all passengers. With its robust construction and advanced 4WD system, the Land Cruiser J150 is the ultimate choice for exploring Kenya's diverse landscapes.",
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
      "Safari Ready",
      "Luxury Interior",
      "Third Row Seating",
      "Air Conditioning",
      "Power Windows",
      "Central Locking",
      "Audio System",
      "Cup Holders",
      "Storage Compartments"
    ]
  },
  {
    id: 11,
    name: "14-Seater Bus",
    category: "Passenger Bus",
    type: "bus",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 12000,
    originalPrice: 15000,
    description: "Comfortable 14-seater bus perfect for group tours and corporate events.",
    features: ["Air Conditioning", "Comfortable Seats", "Luggage Space", "Professional Driver"],
    capacity: 14,
    fuel: "Diesel",
    transmission: "Manual",
    available: true,
    badge: "GROUP",
    badgeColor: "from-purple-500 to-purple-600",
    fullDescription: "Our 14-seater bus is designed for comfortable group transportation, perfect for corporate events, group tours, and family gatherings. With air conditioning, comfortable seating, and ample luggage space, this vehicle ensures a pleasant journey for all passengers. Professional drivers with extensive experience in group transportation guarantee a safe and reliable service.",
    specifications: {
      engine: "3.0L Diesel",
      horsepower: "150 HP",
      acceleration: "0-100 km/h in 15.2s",
      topSpeed: "140 km/h",
      fuelConsumption: "12.5L/100km",
      dimensions: "6.5m x 2.2m x 2.8m"
    },
    amenities: [
      "Air Conditioning",
      "Comfortable Seats",
      "Luggage Space",
      "Professional Driver",
      "Audio System",
      "Cup Holders",
      "Storage Compartments",
      "Emergency Exits",
      "First Aid Kit",
      "Fire Extinguisher"
    ]
  },
  {
    id: 12,
    name: "25-Seater Bus",
    category: "Large Bus",
    type: "bus",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price: 18000,
    originalPrice: 22000,
    description: "Spacious 25-seater bus ideal for large group transportation and events.",
    features: ["Large Capacity", "Air Conditioning", "Comfortable Seating", "Professional Service"],
    capacity: 25,
    fuel: "Diesel",
    transmission: "Manual",
    available: true,
    badge: "LARGE GROUP",
    badgeColor: "from-blue-500 to-indigo-500",
    fullDescription: "Our 25-seater bus is perfect for large group transportation, corporate events, and educational tours. With its spacious interior, air conditioning, and comfortable seating, this vehicle can accommodate large groups while ensuring everyone travels in comfort. Professional drivers and comprehensive safety features make this the ideal choice for group transportation needs.",
    specifications: {
      engine: "4.0L Diesel",
      horsepower: "200 HP",
      acceleration: "0-100 km/h in 18.5s",
      topSpeed: "120 km/h",
      fuelConsumption: "15.5L/100km",
      dimensions: "8.5m x 2.4m x 3.2m"
    },
    amenities: [
      "Large Capacity",
      "Air Conditioning",
      "Comfortable Seating",
      "Professional Service",
      "Audio System",
      "Cup Holders",
      "Storage Compartments",
      "Emergency Exits",
      "First Aid Kit",
      "Fire Extinguisher"
    ]
  }
];

export default function VehicleDetailPage() {
  const params = useParams();
  const vehicleId = parseInt(params.id as string);
  const vehicle = vehicles.find(v => v.id === vehicleId);

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
            {/* Vehicle Image */}
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  width={600}
                  height={500}
                  className="w-full h-full object-cover"
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
              </div>
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
                href="tel:+254721612348"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Call +254 721 612 348
              </motion.a>
              <motion.a
                href="https://wa.me/254700043620"
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
