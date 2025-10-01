'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Plane, Crown, Building2, Heart, Mountain, Shield, Car, Truck, Bus, Users, Fuel } from 'lucide-react';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Set video properties for optimal loading
      video.preload = 'metadata';
      video.load();
      
      // Handle video loading events
      const handleCanPlay = () => {
        setIsVideoLoaded(true);
        video.play().then(() => {
          setIsVideoPlaying(true);
        }).catch((error) => {
          console.error('Video play failed:', error);
          // Fallback: try to play without autoplay
          video.muted = true;
          video.play().catch(console.error);
        });
      };

      const handleLoadStart = () => {
        console.log('Video loading started');
      };

      const handleLoadedData = () => {
        console.log('Video data loaded');
      };

      const handleError = (e: Event) => {
        console.error('Video error:', e);
        console.error('Video src:', video.src);
        setVideoError(true);
        setIsVideoLoaded(true); // Show fallback background
      };

      const handlePlaying = () => {
        setIsVideoPlaying(true);
      };

      const handlePause = () => {
        setIsVideoPlaying(false);
      };

      // Add event listeners
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);
      video.addEventListener('playing', handlePlaying);
      video.addEventListener('pause', handlePause);

      // Cleanup
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
        video.removeEventListener('playing', handlePlaying);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  // Auto-scroll functionality for mobile
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const isMobile = window.innerWidth < 768; // md breakpoint
    if (!isMobile) return;

    // Handle user scroll to pause auto-scroll
    const handleUserScroll = () => {
      setIsUserScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsUserScrolling(false);
      }, 3000); // Resume auto-scroll after 3 seconds of no user interaction
    };

    let scrollTimeout: NodeJS.Timeout;
    scrollContainer.addEventListener('scroll', handleUserScroll);

    const autoScrollInterval = setInterval(() => {
      if (isUserScrolling) return; // Don't auto-scroll if user is scrolling
      
      setCurrentScrollIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % 4; // We have 4 cars
        const cardWidth = 320; // w-80 = 320px
        const scrollPosition = nextIndex * (cardWidth + 24); // 24px gap
        
        scrollContainer.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
        
        return nextIndex;
      });
    }, 4000); // Auto-scroll every 4 seconds

    return () => {
      clearInterval(autoScrollInterval);
      clearTimeout(scrollTimeout);
      scrollContainer.removeEventListener('scroll', handleUserScroll);
    };
  }, [isUserScrolling]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b border-white/20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-orange-500/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden bg-white/20 backdrop-blur-sm border border-white/30">
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
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-8 flex items-baseline space-x-1">
                <a href="#about" className="text-white/90 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20">About</a>
                <a href="#services" className="text-white/90 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20">Services</a>
                <a href="#fleet" className="text-white/90 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20">Fleet</a>
                <a href="#pricing" className="text-white/90 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20">Pricing</a>
                <a href="#contact" className="bg-gradient-to-r from-blue-600/80 to-orange-500/80 backdrop-blur-sm text-white px-6 py-2 rounded-xl text-sm font-medium hover:from-blue-600 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 border border-white/20">
                  Contact
                </a>
              </div>
            </div>

            {/* Tablet Navigation */}
            <div className="hidden md:block lg:hidden">
              <div className="flex items-center space-x-2">
                <a href="#about" className="text-white/90 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">About</a>
                <a href="#services" className="text-white/90 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">Services</a>
                <a href="#fleet" className="text-white/90 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">Fleet</a>
                <a href="#contact" className="bg-gradient-to-r from-blue-600/80 to-orange-500/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-orange-500 transition-all duration-300 border border-white/20">
                  Contact
                </a>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white/90 hover:text-white p-3 rounded-xl hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-2xl mobile-menu-enter relative z-40">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-orange-500/20 to-blue-600/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col space-y-2">
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/90 hover:text-white px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
              >
                About
              </a>
              <a 
                href="#services" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/90 hover:text-white px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
              >
                Services
              </a>
              <a 
                href="#fleet" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/90 hover:text-white px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
              >
                Fleet
              </a>
              <a 
                href="#pricing" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/90 hover:text-white px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
              >
                Pricing
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-gradient-to-r from-blue-600/80 to-orange-500/80 backdrop-blur-sm text-white px-4 py-3 rounded-xl text-base font-medium hover:from-blue-600 hover:to-orange-500 transition-all duration-300 border border-white/20 mt-2"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-start overflow-hidden -mt-16 md:-mt-20">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 w-full h-full">
          {/* Loading State */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center z-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full loading-spinner mx-auto mb-4"></div>
                <p className="text-white/80 text-lg font-medium">Loading Experience...</p>
                <p className="text-white/60 text-sm mt-2">Preparing your journey</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {videoError && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center z-20">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚗</span>
                </div>
                <p className="text-white/80 text-lg font-medium">Experience Loading...</p>
                <p className="text-white/60 text-sm mt-2">Your journey awaits</p>
              </div>
            </div>
          )}
          
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 video-fade-in ${
              isVideoPlaying ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1
            }}
          >
            <source src="/Makonosi_Junior_Car_Hire.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Fallback background - this will show if video fails */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-900 to-blue-700 z-0"></div>
          
          {/* Modern gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/50 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/30 z-10"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 md:pt-28">
          <div className="animate-fade-in-up">
            <div className="max-w-4xl">
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 leading-tight text-left mt-4 md:mt-6">
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-2xl">
                  Makonosi
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl drop-shadow-xl">
                  Junior
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl drop-shadow-2xl">
                  Car Hire
                </span>
              </h1>
              
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 mb-4 md:mb-6">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/98 tracking-wide text-left drop-shadow-lg flex-1">
                  Travel in Style, Trust in Service
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 lg:gap-4 items-start sm:items-center lg:flex-shrink-0">
                <a 
                  href="#contact" 
                  className="group relative bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 rounded-full font-bold text-base md:text-lg lg:text-xl hover:from-orange-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-400/50 overflow-hidden w-full sm:w-auto min-w-[200px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2 md:gap-3">
                    Book Now
                    <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>
                
                <Link 
                  href="/vehicles" 
                  className="group relative border-2 border-white/90 text-white px-8 py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 rounded-full font-bold text-base md:text-lg lg:text-xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-lg bg-white/10 shadow-xl hover:shadow-white/25 w-full sm:w-auto min-w-[200px]"
                >
                  <span className="flex items-center justify-center gap-2 md:gap-3">
                    View Fleet
                    <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </Link>
                </div>
              </div>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-3xl text-white/90 leading-relaxed text-left drop-shadow-md">
                Experience Kenya with <span className="font-bold text-orange-300 bg-white/15 px-3 py-1 rounded-full text-xs sm:text-sm md:text-base shadow-lg backdrop-blur-sm">15+ years</span> of professional chauffeur expertise. 
                World-class standards, safety, and reliability guaranteed.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-white/5">
            <div className="w-1 h-2 md:h-3 bg-white/80 rounded-full mt-1 md:mt-2 animate-pulse shadow-lg"></div>
          </div>
        </div>
      </section>

      {/* Top Deals Section - Light UI */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 animated-deals-bg relative overflow-hidden">
        {/* Background Elements */}
        <div className="circuit-pattern"></div>
        <div className="floating-element w-20 h-20 top-10 left-10"></div>
        <div className="floating-element w-16 h-16 top-20 right-20"></div>
        <div className="floating-element w-12 h-12 bottom-20 left-1/4"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-white to-gray-50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 mb-4 md:mb-6 bg-orange-100 text-orange-800 rounded-full text-xs md:text-sm font-semibold border border-orange-200">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 md:mr-3 animate-pulse"></span>
                <span className="hidden sm:inline">Top Deals</span>
                <span className="sm:hidden">Deals</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -inset-x-2 -inset-y-4">
                  <div className="mx-auto h-full w-full rotate-180 bg-gradient-to-r from-blue-500/20 via-orange-500/20 to-blue-500/20 blur-3xl" />
                </div>
                <h2 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600">
                  Top Deals
                </h2>
              </div>
            </motion.div>
            
            <motion.p 
              className="mt-4 sm:mt-6 text-base sm:text-lg leading-6 sm:leading-8 text-gray-600 max-w-4xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Premium vehicles at unbeatable prices. Experience luxury and performance like never before.
            </motion.p>
          </motion.div>

          {/* Animated Car Cards */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 snap-x snap-mandatory snap-scroll-container" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Car Deal 1 - Toyota Land Cruiser V8 */}
              <motion.div 
                className="flex-shrink-0 w-80 md:w-96 snap-start"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Link href="/vehicles/1" className="block">
                  <div className="glowing-border bg-white backdrop-blur-lg rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl border border-gray-100">
                  <div className="relative">
                    <div className="w-full h-48 md:h-56 overflow-hidden">
                      <Image 
                        src="/landcruiser_V8_WHITE/presentable.jpg" 
                        alt="Toyota Land Cruiser V8" 
                        width={400}
                        height={224}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <motion.div 
                      className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold"
                      whileHover={{ scale: 1.1 }}
                    >
                      PREMIUM
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      Toyota Land Cruiser V8
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base mb-4 leading-relaxed">
                      Powerful V8 engine with luxury interior. Perfect for long journeys and off-road adventures. Chauffeured only.
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl md:text-3xl font-black text-orange-600">
                        KES 20,000
                      </div>
                      <div className="text-sm text-gray-500">
                        Within city
                      </div>
                    </div>
                    <div className="text-xs md:text-sm text-gray-500 mb-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full border border-green-200">Available Now</span>
                    </div>
                    <motion.button 
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book This Car
                    </motion.button>
                  </div>
                </div>
                </Link>
              </motion.div>

              {/* Car Deal 2 - Toyota Land Cruiser TX */}
              <motion.div 
                className="flex-shrink-0 w-80 md:w-96 snap-start"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Link href="/vehicles/2" className="block">
                  <div className="glowing-border bg-white backdrop-blur-lg rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl border border-gray-100">
                  <div className="relative">
                    <div className="w-full h-48 md:h-56 overflow-hidden">
                      <Image 
                        src="/Toyota_Land_cruiser_TX/presentable.jpg" 
                        alt="Toyota Land Cruiser TX" 
                        width={400}
                        height={224}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <motion.div 
                      className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold"
                      whileHover={{ scale: 1.1 }}
                    >
                      BEST VALUE
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      Toyota Land Cruiser TX
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base mb-4 leading-relaxed">
                      Reliable and capable SUV perfect for both city and highway driving. Self-drive or chauffeured available.
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl md:text-3xl font-black text-green-600">
                        KES 15,000
                      </div>
                      <div className="text-sm text-gray-500">
                        Within Nairobi/Mombasa
                      </div>
                    </div>
                    <div className="text-xs md:text-sm text-gray-500 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full border border-blue-200">Popular Choice</span>
                    </div>
                    <motion.button 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book This Car
                    </motion.button>
                  </div>
                </div>
                </Link>
              </motion.div>

              {/* Car Deal 3 - Toyota Land Cruiser V8 Black */}
              <motion.div 
                className="flex-shrink-0 w-80 md:w-96 snap-start"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Link href="/vehicles/4" className="block">
                  <div className="glowing-border bg-white backdrop-blur-lg rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl border border-gray-100">
                  <div className="relative">
                    <div className="w-full h-48 md:h-56 overflow-hidden">
                      <Image 
                        src="/landcruiser_V8_Black/presentable_toyotav8.jpg" 
                        alt="Toyota Land Cruiser V8 Black - Premium SUV" 
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 320px, 384px"
                      />
                    </div>
                    {/* Premium Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        LUXURY
                      </span>
                    </div>
                    {/* Price Tag */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">KES 22,000</div>
                        <div className="text-xs text-gray-600">Per day</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      Toyota Land Cruiser V8 Black
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      Sleek black luxury SUV with premium V8 engine. Perfect for business meetings and special occasions. Chauffeured only.
                    </p>
                    
                    {/* Features */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>7 Seater</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Fuel className="w-4 h-4" />
                        <span>Petrol</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Car className="w-4 h-4" />
                        <span>Auto</span>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <motion.button
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Book This Vehicle
                    </motion.button>
                  </div>
                </div>
                </Link>
              </motion.div>

              {/* Car Deal 4 - Toyota Ractis */}
              <motion.div 
                className="flex-shrink-0 w-80 md:w-96 snap-start"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Link href="/vehicles/3" className="block">
                  <div className="glowing-border bg-white backdrop-blur-lg rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl border border-gray-100">
                  <div className="relative">
                    <div className="w-full h-48 md:h-56 overflow-hidden">
                      <Image 
                        src="/Toyota_Ractis/presentable.png" 
                        alt="Toyota Ractis" 
                        width={400}
                        height={224}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <motion.div 
                      className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold"
                      whileHover={{ scale: 1.1 }}
                    >
                      ECONOMY
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      Toyota Ractis
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base mb-4 leading-relaxed">
                      Compact and fuel-efficient vehicle perfect for city driving and daily commutes. Great value for money.
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl md:text-3xl font-black text-blue-600">
                        KES 5,000
                      </div>
                      <div className="text-sm text-gray-500">
                        Per day
                      </div>
                    </div>
                    <div className="text-xs md:text-sm text-gray-500 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full border border-blue-200">Fuel Efficient</span>
                    </div>
                    <motion.button 
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book This Car
                    </motion.button>
                  </div>
                </div>
                </Link>
              </motion.div>

            </div>
            
            {/* Animated Scroll indicators */}
            <motion.div 
              className="flex justify-center mt-6 space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              {[0, 1, 2, 3].map((index) => (
                <motion.div 
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentScrollIndex ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                  animate={index === currentScrollIndex ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Animated View All Button */}
          <motion.div 
            className="text-center mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            <motion.a 
              href="/vehicles" 
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Vehicles
              <motion.svg 
                className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-blue-50/30 to-white low-poly-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 mb-4 md:mb-6 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm font-semibold">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 md:mr-3"></span>
              <span className="hidden sm:inline">About Our Company</span>
              <span className="sm:hidden">About Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
                About Us
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Your trusted partner for premium transportation services across Kenya
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="space-y-6 md:space-y-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">
                Our Foundation
              </h3>
              <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-2xl border border-blue-100 mb-6">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  At Makonosi Junior Car Hire, our capital is not money — it is <span className="text-blue-600 font-bold">faith, trust, and deliver</span>.
                </p>
                <p className="text-gray-700">
                  We believe time is precious and does not reverse, so every service is designed to be punctual, reliable, and professional.
                </p>
              </div>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg md:rounded-xl flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xs md:text-sm font-bold">✓</span>
                  </div>
                  <p className="ml-3 md:ml-4 text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                    <span className="font-bold text-gray-900">15+ years</span> of professional chauffeur experience serving VIPs and international clients
                  </p>
                </div>
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xs md:text-sm font-bold">✓</span>
                  </div>
                  <p className="ml-3 md:ml-4 text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                    <span className="font-bold text-gray-900">Time conscious</span> - we respect your time and deliver punctual service
                  </p>
                </div>
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg md:rounded-xl flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xs md:text-sm font-bold">✓</span>
                  </div>
                  <p className="ml-3 md:ml-4 text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                    <span className="font-bold text-gray-900">Motivated staff</span> - we invest in our team to serve you better, always with a smile
                  </p>
                </div>
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg md:rounded-xl flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xs md:text-sm font-bold">✓</span>
                  </div>
                  <p className="ml-3 md:ml-4 text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                    <span className="font-bold text-gray-900">Transparent pricing</span> - no hidden costs, what you see is what you pay
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-orange-600 p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl md:rounded-3xl"></div>
                <div className="relative z-10">
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Our Promise</h4>
                  <p className="text-blue-100 text-sm md:text-base lg:text-lg leading-relaxed">
                    We believe in valuing people — both our clients and our team. By paying our drivers, guides, and staff fairly, 
                    we keep them motivated to give you the very best service, always with a smile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white stripes-bg floating-shapes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 mb-4 md:mb-6 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm font-semibold">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 md:mr-3"></span>
              <span className="hidden sm:inline">Our Services</span>
              <span className="sm:hidden">Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Comprehensive transportation solutions for every need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Airport Transfers */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50 hover:border-blue-200/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Plane className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">Airport Transfers</h3>
                <p className="text-gray-600 leading-relaxed">Professional airport pick-up and drop-off services with real-time flight tracking</p>
              </div>
            </div>

            {/* VIP Chauffeur Service */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50 hover:border-purple-200/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">VIP Chauffeur Service</h3>
                <p className="text-gray-600 leading-relaxed">Executive rides with professional chauffeurs for VIPs and international clients</p>
              </div>
            </div>

            {/* Corporate Events */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50 hover:border-green-200/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">Corporate Events</h3>
                <p className="text-gray-600 leading-relaxed">Reliable transportation for corporate meetings, conferences, and business events</p>
              </div>
            </div>

            {/* Weddings & Events */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50 hover:border-pink-200/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">Weddings & Events</h3>
                <p className="text-gray-600 leading-relaxed">Elegant transportation for special occasions and celebrations</p>
              </div>
            </div>

            {/* Safari Tours */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50 hover:border-orange-200/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Mountain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">Safari Tours</h3>
                <p className="text-gray-600 leading-relaxed">Adventure tours to Maasai Mara, Amboseli, and other national parks</p>
              </div>
            </div>

            {/* Security Services */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50 hover:border-red-200/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">Security Services</h3>
                <p className="text-gray-600 leading-relaxed">Interior Ministry approved bodyguards and security personnel (on request)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="py-20 bg-white grid-bg floating-shapes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 mb-4 md:mb-6 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm font-semibold">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 md:mr-3"></span>
              <span className="hidden sm:inline">Our Fleet</span>
              <span className="sm:hidden">Fleet</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
                Our Fleet
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              TSV & PSV Licensed vehicles for every occasion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Saloon Cars / Taxis */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50 hover:border-blue-200/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">Saloon Cars / Taxis</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Toyota Axio
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Nissan Note
                  </li>
                </ul>
              </div>
            </div>

            {/* Compact SUVs */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50 hover:border-green-200/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">Compact SUVs</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    X-Trail
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    RAV4
                  </li>
                </ul>
              </div>
            </div>

            {/* 4x4 Vehicles */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50 hover:border-orange-200/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Mountain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">4x4 Vehicles</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    TX Land Cruiser J150
                    <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Self-drive or Chauffeured</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    V8
                    <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Chauffeured only</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Luxury & VIP Cars */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50 hover:border-purple-200/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <span className="text-2xl">👑</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">Luxury & VIP Cars</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Sedans with/without sunroof
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Executive vehicles
                  </li>
                </ul>
              </div>
            </div>

            {/* Vans, Shuttles & Buses */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50 hover:border-indigo-200/50 overflow-hidden relative md:col-span-2">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Bus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 group-hover:text-indigo-600 transition-colors duration-300">Vans, Shuttles & Buses</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl group-hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-black text-indigo-600 mb-2">4</div>
                    <div className="text-sm text-gray-600 font-medium">Passengers</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl group-hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-black text-indigo-600 mb-2">7</div>
                    <div className="text-sm text-gray-600 font-medium">Passengers</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl group-hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-black text-indigo-600 mb-2">9</div>
                    <div className="text-sm text-gray-600 font-medium">Passengers</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl group-hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-black text-indigo-600 mb-2">14</div>
                    <div className="text-sm text-gray-600 font-medium">Passengers</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl group-hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-black text-indigo-600 mb-2">16</div>
                    <div className="text-sm text-gray-600 font-medium">Passengers</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl group-hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-black text-indigo-600 mb-2">25</div>
                    <div className="text-sm text-gray-600 font-medium">Passengers</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl group-hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-black text-indigo-600 mb-2">33</div>
                    <div className="text-sm text-gray-600 font-medium">Passengers</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl group-hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-black text-indigo-600 mb-2">43</div>
                    <div className="text-sm text-gray-600 font-medium">Passengers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50 subtle-modern-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services & Prices</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent pricing with no hidden costs - what you see is what you pay
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Self-Drive Pricing */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🚘 Self-Drive Car Hire</h3>
              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800 font-medium">
                  <strong>All our self-drive packages include:</strong>
                </p>
                <ul className="text-sm text-green-700 mt-2 space-y-1">
                  <li>• Two-way fuel coverage (two and flow) depending on the car type</li>
                  <li>• No hidden costs – what you see is what you pay</li>
                  <li>• Free deep trips (long drives) – no extra charges for exploring Kenya</li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">Toyota Land Cruiser V8</span>
                    <div className="text-sm text-gray-600">Within city | Outside city</div>
                  </div>
                  <span className="font-bold text-blue-600">KES 20,000 | KES 30,000</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">Toyota Land Cruiser TX</span>
                    <div className="text-sm text-gray-600">Within Nairobi/Mombasa | Outside city</div>
                  </div>
                  <span className="font-bold text-blue-600">KES 15,000 | KES 25,000</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">Safari Vans (7–9 seater)</span>
                    <div className="text-sm text-gray-600">City | Outside</div>
                  </div>
                  <span className="font-bold text-blue-600">KES 12,000 | KES 18,000</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">Mini-Bus / 25–43 Seater</span>
                    <div className="text-sm text-gray-600">City | Outside</div>
                  </div>
                  <span className="font-bold text-blue-600">From KES 25,000 | From KES 35,000</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>🌍 For foreign clients:</strong> Payment can be made in USD/Euro equivalent
                </p>
              </div>
            </div>

            {/* Chauffeured Pricing */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🚖 Chauffeured Car Hire</h3>
              <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-800 font-medium mb-2">
                  <strong>All-inclusive payments:</strong> Booking fee + balance on pickup
                </p>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Rates depend on vehicle type and destination</li>
                  <li>• Overtime starts after 18:00hrs</li>
                  <li>• Allowances apply for long-distance trips</li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Nairobi CBD ↔ JKIA</span>
                  <span className="font-bold text-blue-600">KES 4,500 / USD 35</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Nairobi ↔ Mombasa</span>
                  <span className="font-bold text-blue-600">From KES 55,000 / USD 440</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Nairobi ↔ Maasai Mara (3 days)</span>
                  <span className="font-bold text-blue-600">KES 160,000 / USD 1,280</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Nairobi ↔ Amboseli</span>
                  <span className="font-bold text-blue-600">KES 35,000 / USD 280</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Mombasa SGR ↔ Diani</span>
                  <span className="font-bold text-blue-600">KES 8,500 / USD 65</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Mombasa ↔ Malindi</span>
                  <span className="font-bold text-blue-600">KES 14,000 / USD 110</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-800 font-medium mb-2">
                  <strong>Chauffeurs come with:</strong>
                </p>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Professional experience (15+ years)</li>
                  <li>• Local knowledge of Kenya&apos;s roads and culture</li>
                  <li>• Respect, confidentiality, and courtesy</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Airport Services */}
          <div className="mt-12 bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🛫 Airport Pickups & Drop-offs</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <h4 className="font-bold text-blue-900 mb-2">Nairobi JKIA / Wilson Airport</h4>
                <p className="text-blue-700">Professional transfers</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <h4 className="font-bold text-green-900 mb-2">Mombasa Moi International</h4>
                <p className="text-green-700">Coastal transfers</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <h4 className="font-bold text-purple-900 mb-2">Kisumu, Eldoret, Malindi</h4>
                <p className="text-purple-700">Regional airports</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-lg font-bold text-gray-800">
                From <span className="text-blue-600">KES 5,000 – 10,000</span> depending on vehicle
              </p>
            </div>
          </div>

          {/* Tours & Safaris */}
          <div className="mt-12 bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🏞️ Tours, Safaris & Long-Distance</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-4">Popular Routes</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Mombasa – Malaba</span>
                    <span className="font-bold text-blue-600">KES 35,000 (TX Land Cruiser)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Safari Tours</span>
                    <span className="font-bold text-green-600">Available</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-4">Destinations</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-blue-50 p-2 rounded text-center">Maasai Mara</div>
                  <div className="bg-green-50 p-2 rounded text-center">Tsavo</div>
                  <div className="bg-yellow-50 p-2 rounded text-center">Amboseli</div>
                  <div className="bg-purple-50 p-2 rounded text-center">Diani</div>
                  <div className="bg-orange-50 p-2 rounded text-center">Lamu</div>
                  <div className="bg-pink-50 p-2 rounded text-center">Naivasha</div>
                  <div className="bg-indigo-50 p-2 rounded text-center">Kisumu</div>
                  <div className="bg-red-50 p-2 rounded text-center">Eldoret</div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Available on request:</strong> Translators, security, and tour guides
              </p>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="mt-8 bg-blue-50 p-6 rounded-xl">
            <h4 className="text-lg font-bold text-blue-900 mb-4">Payment Terms</h4>
            <ul className="space-y-2 text-blue-800">
              <li>• Booking fee required to confirm</li>
              <li>• Full payment upon pickup (before trip)</li>
              <li>• No payments after drop-off</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">
                Why Clients Choose Us
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed px-4">
              International standards serving Africa, Europe, Asia & USA clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Faith, Trust & Deliver</h3>
              <p className="text-blue-100">Our core values that drive every interaction and service delivery</p>
            </div>

            <div className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Time Conscious</h3>
              <p className="text-blue-100">We respect your time and deliver punctual, reliable service</p>
            </div>

            <div className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Transparent Pricing</h3>
              <p className="text-blue-100">No hidden costs - what you see is what you pay</p>
            </div>

            <div className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⛽</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Two-Way Fuel Included</h3>
              <p className="text-blue-100">Self-drive packages include fuel coverage for your convenience</p>
            </div>

            <div className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">😊</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Motivated Staff</h3>
              <p className="text-blue-100">We invest in our team to serve you better, always with a smile</p>
            </div>

            <div className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Nationwide Coverage</h3>
              <p className="text-blue-100">Cars across all major cities in Kenya with international standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white sophisticated-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 mb-4 md:mb-6 bg-white/10 backdrop-blur-sm text-white rounded-full text-xs md:text-sm font-semibold border border-white/20">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 md:mr-3 animate-pulse"></span>
              <span className="hidden sm:inline">Contact Us</span>
              <span className="sm:hidden">Contact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Contact Us
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed px-4">
              Ready to experience Kenya in style? Get in touch with us today
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Phone */}
            <a 
              href="tel:+254700004362" 
              className="group bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 hover:border-blue-400/50 transition-all duration-500 transform hover:-translate-y-2 hover:bg-white/10 cursor-pointer block"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 border border-blue-400/30">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center group-hover:text-blue-300 transition-colors">Calls</h3>
              <p className="text-blue-100 text-center font-medium">+254 700 004 362</p>
              <p className="text-blue-200/70 text-sm text-center mt-2 group-hover:text-blue-200 transition-colors">Tap to call</p>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/254721612348?text=Hello%20Makonosi%20Junior%20Car%20Hire,%20I%20would%20like%20to%20inquire%20about%20your%20services." 
            target="_blank"
            rel="noopener noreferrer"
              className="group bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 hover:border-green-400/50 transition-all duration-500 transform hover:-translate-y-2 hover:bg-white/10 cursor-pointer block"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 border border-green-400/30">
                <Image 
                  src="https://i.pinimg.com/474x/f7/1f/fb/f71ffb7ad7db43ccc7b1466de418f254.jpg" 
                  alt="WhatsApp" 
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-lg object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center group-hover:text-green-300 transition-colors">WhatsApp</h3>
              <p className="text-blue-100 text-center font-medium">+254 721 612 348</p>
              <p className="text-green-200/70 text-sm text-center mt-2 group-hover:text-green-200 transition-colors">Tap to chat</p>
            </a>

            {/* Payment Methods */}
            <div className="group bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 hover:border-orange-400/50 transition-all duration-500 transform hover:-translate-y-2 hover:bg-white/10 md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 border border-orange-400/30">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center group-hover:text-orange-300 transition-colors">Payment Methods</h3>
              <p className="text-blue-100 text-center font-medium">Equity Bank, M-Pesa, Wire Transfer</p>
            </div>
          </div>

          {/* Payment Details Card */}
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500">
            <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Payment Details</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h4 className="text-lg font-bold mb-4 text-blue-200">💳 Paybill</h4>
                <div className="space-y-3 text-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Paybill:</span>
                    <span className="font-mono bg-white/10 px-3 py-1 rounded-lg">247247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Account:</span>
                    <span className="font-mono bg-white/10 px-3 py-1 rounded-lg">0700043620</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h4 className="text-lg font-bold mb-4 text-blue-200">🏢 Account Name</h4>
                <div className="space-y-3 text-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Account Name:</span>
                    <span className="font-mono bg-white/10 px-3 py-1 rounded-lg">Makonosi Junior Car Hire</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Bank:</span>
                    <span className="text-orange-300">Available on request</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
              <p className="text-lg text-blue-100 leading-relaxed">
                ✨ With Makonosi Junior Car Hire, you don&apos;t just travel — you experience Kenya in comfort, safety, and dignity, guided by 15+ years of professional chauffeur expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 mr-3">
                  <Image src="/MAKONOSIBLUEORANGE.png" alt="Makonosi Logo" width={40} height={40} className="w-full h-full object-contain p-1"/>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  Makonosi Junior
                </h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Professional car hire services in Kenya with 15+ years of chauffeur expertise. 
                Travel in style, trust in service.
              </p>
              <div className="flex space-x-4">
                {/* Social Media Links */}
                <a 
                  href="https://facebook.com/makonosijunior" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600/20 hover:bg-blue-600/40 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-blue-600/30"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com/makonosijunior" 
          target="_blank"
          rel="noopener noreferrer"
                  className="w-10 h-10 bg-pink-600/20 hover:bg-pink-600/40 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-pink-600/30"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.98-.49-.98-.98s.49-.98.98-.98.98.49.98.98-.49.98-.98.98zm-1.297 9.781c-1.297 0-2.448-.49-3.323-1.297-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
                  </svg>
        </a>
        <a
                  href="https://twitter.com/makonosijunior" 
          target="_blank"
          rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-400/20 hover:bg-blue-400/40 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-blue-400/30"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
        </a>
        <a
                  href="https://linkedin.com/company/makonosijunior" 
          target="_blank"
          rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-700/20 hover:bg-blue-700/40 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-blue-700/30"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#home" className="text-gray-300 hover:text-white transition-colors duration-300">Home</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300">About Us</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300">Our Services</a></li>
                <li><a href="#fleet" className="text-gray-300 hover:text-white transition-colors duration-300">Our Fleet</a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-300">Pricing</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Our Services</h4>
              <ul className="space-y-3">
                <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300">Airport Transfers</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300">VIP Rides</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300">Corporate Events</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300">Safari Tours</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300">Wedding Services</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300">Adventure Tours</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-5 h-5 mt-1 mr-3 text-blue-400">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300">info@makonosi.co.ke</p>
                    <p className="text-gray-300">bookings@makonosi.co.ke</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 mt-1 mr-3 text-blue-400">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                  <div>
                    <a href="tel:+254700004362" className="text-gray-300 hover:text-white transition-colors duration-300">+254 700 004 362</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 mt-1 mr-3 text-green-400">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <div>
                    <a href="https://wa.me/254721612348" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">+254 721 612 348</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 mt-1 mr-3 text-blue-400">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300">Nairobi, Kenya</p>
                    <p className="text-gray-300">Nationwide Service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; 2024 Makonosi Junior Car Hire. All rights reserved.
              </div>
              <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
                <a href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-300">Cookie Policy</a>
                <a href="/sitemap" className="text-gray-400 hover:text-white transition-colors duration-300">Sitemap</a>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-500 text-xs">
                Licensed by NTSA • TSV & PSV Certified • 15+ Years Professional Experience
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
