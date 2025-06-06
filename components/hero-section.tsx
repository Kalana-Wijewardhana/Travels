"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Play,
  MapPin,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { QuoteModal } from "@/components/quote-modal";
import { SupportModal } from "@/components/support-modal";

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -100, scale: 0.8 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  },
};

const heroImages = [
  {
    src: "/images/banner/banner1.jpg",
    alt: "Galle Fort - Historic Dutch colonial architecture",
    // title: "Galle Fort",
  },
  {
    src: "/images/banner/banner2.jpg",
    alt: "Sigiriya Rock Fortress - Ancient wonder of Sri Lanka",
    // title: "Sigiriya Rock",
  },
  {
    src: "/images/banner/banner3.jpg",
    alt: "Temple of the Tooth - Sacred Buddhist temple in Kandy",
    // title: "Temple of Tooth",
  },
  {
    src: "/images/banner/banner4.jpg",
    alt: "Nine Arch Bridge - Iconic railway bridge in Ella",
    // title: "Nine Arch Bridge",
  },
];

export function HeroSection() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  // Add this state at the top of your component
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Add this useEffect for auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-6 md:space-y-8"
          >
            <div className="space-y-3 md:space-y-4">
              <motion.h1
                variants={slideInFromLeft}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight"
              >
                Start Your{" "}
                <motion.span
                  className="text-emerald-600 inline-block"
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0px 0px 8px rgba(16, 185, 129, 0.5)",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  style={{
                    background:
                      "linear-gradient(45deg, #10b981, #34d399, #10b981)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Holiday Planning
                </motion.span>{" "}
                Here!
              </motion.h1>

              <motion.p
                variants={slideInFromLeft}
                className="text-lg md:text-xl text-slate-600 leading-relaxed"
              >
                Connect with a Local{" "}
                <motion.span
                  className="font-semibold text-slate-800"
                  whileHover={{ scale: 1.05 }}
                >
                  Destination Expert
                </motion.span>{" "}
                Online
              </motion.p>

              <motion.p variants={slideInFromLeft} className="text-slate-600">
                Instantly connect with one of our destination experts from your
                preferred destinations! Our services are available 24/7
              </motion.p>
            </div>

            <motion.div
              variants={slideInFromLeft}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-base md:text-lg px-6 py-5 md:px-8 md:py-6 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                      "_blank"
                    )
                  }
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <Play className="w-5 h-5 mr-2" />
                  </motion.div>
                  Watch Intro
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base md:text-lg px-6 py-5 md:px-8 md:py-6 border-emerald-200 hover:bg-emerald-50 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                  onClick={() => {
                    const toursSection = document.getElementById("tours");
                    if (toursSection) {
                      toursSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Explore Tours
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={slideInFromLeft}
              className="flex flex-wrap items-center gap-4 md:gap-8 pt-4 md:pt-8"
            >
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div animate={floatingAnimation}>
                  <Users className="w-5 h-5 text-emerald-600" />
                </motion.div>
                <span className="text-sm text-slate-600">
                  1000+ Happy Travelers
                </span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                </motion.div>
                <span className="text-sm text-slate-600">4.9/5 Rating</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            className="relative mt-8 lg:mt-0"
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl group/hero-image"
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              animate={floatingAnimation}
            >
              {/* Image Carousel Container */}
              <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px]">
                {heroImages.map((image, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.1, rotateY: 10 }}
                    animate={{
                      opacity: currentImageIndex === index ? 1 : 0,
                      scale: currentImageIndex === index ? 1 : 1.1,
                      rotateY: currentImageIndex === index ? 0 : 10,
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      width={600}
                      height={700}
                      className="w-full h-full object-cover"
                    />

                    {/* Image Title Overlay */}
                    {/* <motion.div
                      className="absolute bottom-20 left-4 sm:left-8 bg-black/50 backdrop-blur-sm text-white rounded-lg px-3 py-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: currentImageIndex === index ? 1 : 0,
                        x: currentImageIndex === index ? 0 : -20,
                      }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <span className="text-sm sm:text-base font-medium">
                        {image.title}
                      </span>
                    </motion.div> */}
                  </motion.div>
                ))}
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {heroImages.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentImageIndex === index
                        ? "bg-white scale-125 shadow-lg"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <motion.button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 opacity-0 group-hover/hero-image:opacity-100 transition-all duration-300 z-20"
                onClick={() =>
                  setCurrentImageIndex(
                    (prev) => (prev - 1 + heroImages.length) % heroImages.length
                  )
                }
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <motion.button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 opacity-0 group-hover/hero-image:opacity-100 transition-all duration-300 z-20"
                onClick={() =>
                  setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
                }
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              {/* Image Counter */}
              <motion.div
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white rounded-lg px-3 py-1 z-20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                <span className="text-sm font-medium">
                  {currentImageIndex + 1}/{heroImages.length}
                </span>
              </motion.div>

              {/* Enhanced Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="absolute top-4 sm:top-8 left-4 sm:left-8 bg-white rounded-lg p-2 sm:p-4 shadow-lg backdrop-blur-sm bg-white/90 z-10"
              >
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  </motion.div>
                  <span className="text-xs sm:text-sm font-medium">
                    Sri Lanka
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8, type: "spring" }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 bg-emerald-600 text-white rounded-lg p-2 sm:p-4 shadow-lg z-10"
              >
                <div className="text-center">
                  <motion.div
                    className="text-lg sm:text-2xl font-bold"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    24/7
                  </motion.div>
                  <div className="text-xs sm:text-sm">Support</div>
                </div>
              </motion.div>

              {/* Enhanced floating particles */}
              <div className="hidden md:block">
                <motion.div
                  className="absolute top-1/4 right-4 w-3 h-3 bg-emerald-400 rounded-full z-10"
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.5,
                  }}
                />
                <motion.div
                  className="absolute top-1/2 left-4 w-2 h-2 bg-blue-400 rounded-full z-10"
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 1,
                  }}
                />
                <motion.div
                  className="absolute bottom-1/3 left-8 w-2 h-2 bg-yellow-400 rounded-full z-10"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.4, 0.9, 0.4],
                    scale: [1, 1.4, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 1.5,
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Modals */}
      <QuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
      />
      <SupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </section>
  );
}
